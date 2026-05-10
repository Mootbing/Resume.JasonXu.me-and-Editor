import {
  ParsedResume,
  EducationEntry,
  ExperienceEntry,
  ProjectEntry,
  SkillsData,
  LinkedTitle,
  ResumeHeader,
  HeaderContact,
} from './resumeTypes'

function readBracedArg(src: string, startIdx: number): { value: string; endIdx: number } {
  if (src[startIdx] !== '{') {
    throw new Error(`Expected '{' at position ${startIdx}, got '${src[startIdx]}'`)
  }
  let depth = 0
  for (let i = startIdx; i < src.length; i++) {
    const ch = src[i]
    if (ch === '\\' && i + 1 < src.length) {
      i++
      continue
    }
    if (ch === '{') depth++
    else if (ch === '}') {
      depth--
      if (depth === 0) return { value: src.slice(startIdx + 1, i), endIdx: i + 1 }
    }
  }
  throw new Error(`Unmatched '{' starting at position ${startIdx}`)
}

function skipWs(src: string, idx: number): number {
  while (idx < src.length && /\s/.test(src[idx])) idx++
  return idx
}

function readNArgs(src: string, idx: number, n: number): { args: string[]; endIdx: number } {
  const args: string[] = []
  let cur = idx
  for (let i = 0; i < n; i++) {
    cur = skipWs(src, cur)
    if (src[cur] !== '{') {
      throw new Error(`Expected '{' for arg ${i + 1} at ${cur}`)
    }
    const { value, endIdx } = readBracedArg(src, cur)
    args.push(value)
    cur = endIdx
  }
  return { args, endIdx: cur }
}

interface MacroMatch {
  args: string[]
  startIdx: number
  endIdx: number
}

function findAllMacros(src: string, macroName: string, nArgs: number): MacroMatch[] {
  const results: MacroMatch[] = []
  const re = new RegExp(`\\\\${macroName}(?![a-zA-Z])`, 'g')
  let m: RegExpExecArray | null
  while ((m = re.exec(src)) !== null) {
    const startIdx = m.index
    const afterName = startIdx + m[0].length
    try {
      const { args, endIdx } = readNArgs(src, afterName, nArgs)
      results.push({ args, startIdx, endIdx })
      re.lastIndex = endIdx
    } catch {
      // malformed — skip and continue scanning
    }
  }
  return results
}

function stripLineComments(src: string): string {
  const out: string[] = []
  for (const line of src.split('\n')) {
    let stripFrom = -1
    let i = 0
    while (i < line.length) {
      if (line[i] === '\\' && i + 1 < line.length) {
        i += 2
        continue
      }
      if (line[i] === '%') {
        stripFrom = i
        break
      }
      i++
    }
    out.push(stripFrom >= 0 ? line.slice(0, stripFrom) : line)
  }
  return out.join('\n')
}

function stripWrapper(s: string, cmd: string): string {
  const re = new RegExp(`\\\\${cmd}(?![a-zA-Z])\\s*\\{`, 'g')
  let result = s
  while (true) {
    re.lastIndex = 0
    const m = re.exec(result)
    if (!m) break
    const start = m.index
    const braceStart = m.index + m[0].length - 1
    try {
      const { value, endIdx } = readBracedArg(result, braceStart)
      result = result.slice(0, start) + value + result.slice(endIdx)
    } catch {
      break
    }
  }
  return result
}

function cleanTex(s: string): string {
  let out = s
  for (let pass = 0; pass < 5; pass++) {
    const before = out
    out = stripWrapper(out, 'underline')
    out = stripWrapper(out, 'textbf')
    out = stripWrapper(out, 'emph')
    out = stripWrapper(out, 'textit')
    out = stripWrapper(out, 'small')
    if (out === before) break
  }
  out = out
    .replace(/\\\$/g, '$')
    .replace(/\\&/g, '&')
    .replace(/\\#/g, '#')
    .replace(/\\%/g, '%')
    .replace(/\\_/g, '_')
    .replace(/~/g, ' ')
    .replace(/---/g, '—')
    .replace(/--/g, '–')
  out = out.replace(/\s+/g, ' ').trim()
  return out
}

function extractLinkedTitle(raw: string): LinkedTitle {
  const re = /\\href(?![a-zA-Z])\s*\{/
  const m = re.exec(raw)
  if (m) {
    const urlBraceStart = m.index + m[0].length - 1
    try {
      const { value: url, endIdx: afterUrl } = readBracedArg(raw, urlBraceStart)
      const innerStart = skipWs(raw, afterUrl)
      if (raw[innerStart] === '{') {
        const { value: inner } = readBracedArg(raw, innerStart)
        return { text: cleanTex(inner), url: url.trim() }
      }
    } catch {
      // fall through to plain text
    }
  }
  return { text: cleanTex(raw) }
}

function parseHeaderIcon(rawSrc: string): string | undefined {
  const m = rawSrc.match(/^[ \t]*%[ \t]*icon[ \t]*:[ \t]*(\S+)[ \t]*$/m)
  return m?.[1]
}

function parseHeader(src: string, rawSrc: string): ResumeHeader {
  const blockMatch = src.match(/\\begin\{center\}([\s\S]*?)\\end\{center\}/)
  if (!blockMatch) return { name: '', contacts: [], icon: parseHeaderIcon(rawSrc) }
  const block = blockMatch[1]

  let name = ''
  const nameRe = /\\textbf(?![a-zA-Z])\s*\{/
  const nameM = nameRe.exec(block)
  if (nameM) {
    const braceStart = nameM.index + nameM[0].length - 1
    try {
      const { value } = readBracedArg(block, braceStart)
      // Inner usually contains \Huge \scshape Name — strip those size/case macros
      let inner = value
      inner = inner.replace(/\\(Huge|huge|LARGE|Large|large|scshape|sc)\b/g, '')
      name = cleanTex(inner)
    } catch {
      // ignore
    }
  }

  const contacts: HeaderContact[] = []
  const hrefRe = /\\href(?![a-zA-Z])\s*\{/g
  let m: RegExpExecArray | null
  while ((m = hrefRe.exec(block)) !== null) {
    const urlBraceStart = m.index + m[0].length - 1
    try {
      const { value: url, endIdx: afterUrl } = readBracedArg(block, urlBraceStart)
      const innerStart = skipWs(block, afterUrl)
      if (block[innerStart] === '{') {
        const { value: inner, endIdx } = readBracedArg(block, innerStart)
        contacts.push({ url: url.trim(), label: cleanTex(inner) })
        hrefRe.lastIndex = endIdx
      }
    } catch {
      break
    }
  }
  return { name, contacts, icon: parseHeaderIcon(rawSrc) }
}

function splitSections(src: string): { title: string; body: string }[] {
  const sectionRe = /\\section\s*\{([^}]+)\}/g
  const matches: { title: string; idx: number; nameEnd: number }[] = []
  let m: RegExpExecArray | null
  while ((m = sectionRe.exec(src)) !== null) {
    matches.push({ title: m[1].trim(), idx: m.index, nameEnd: m.index + m[0].length })
  }
  const sections: { title: string; body: string }[] = []
  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].nameEnd
    const end = i + 1 < matches.length ? matches[i + 1].idx : src.length
    sections.push({ title: matches[i].title, body: src.slice(start, end) })
  }
  return sections
}

function parseEducation(body: string): EducationEntry[] {
  return findAllMacros(body, 'resumeSubheading', 4).map(({ args }) => ({
    school: cleanTex(args[0]),
    location: cleanTex(args[1]),
    degree: cleanTex(args[2]),
    date: cleanTex(args[3]),
  }))
}

function parseExperience(body: string): ExperienceEntry[] {
  const headings = findAllMacros(body, 'resumeSubheading', 4)
  return headings.map((h, i) => {
    const role = cleanTex(h.args[0])
    const location = cleanTex(h.args[1])
    const title = extractLinkedTitle(h.args[2])
    const date = cleanTex(h.args[3])
    const sliceEnd = i + 1 < headings.length ? headings[i + 1].startIdx : body.length
    const between = body.slice(h.endIdx, sliceEnd)
    const bullets = findAllMacros(between, 'resumeItem', 1).map(({ args }) => cleanTex(args[0]))
    return { title, date, role, location, bullets }
  })
}

function parseProjects(body: string): ProjectEntry[] {
  const headings = findAllMacros(body, 'resumeProjectHeading', 2)
  return headings.map((h, i) => {
    const headerArg = h.args[0]
    const dateArg = h.args[1]
    const splitIdx = headerArg.indexOf('$|$')
    const titleRaw = splitIdx >= 0 ? headerArg.slice(0, splitIdx) : headerArg
    const techRaw = splitIdx >= 0 ? headerArg.slice(splitIdx + 3) : ''
    const title = extractLinkedTitle(titleRaw)
    const techStack = cleanTex(techRaw)
    const date = cleanTex(dateArg)
    const sliceEnd = i + 1 < headings.length ? headings[i + 1].startIdx : body.length
    const between = body.slice(h.endIdx, sliceEnd)
    const bullets = findAllMacros(between, 'resumeItem', 1).map(({ args }) => cleanTex(args[0]))
    return {
      title,
      techStack,
      date,
      bullets,
      displayAsParagraph: bullets.length === 1,
    }
  })
}

function parseSkills(body: string): SkillsData {
  function findLabeled(label: string): string[] {
    const re = new RegExp(`\\\\textbf(?![a-zA-Z])\\s*\\{${label}\\}\\s*\\{`, 'g')
    const m = re.exec(body)
    if (!m) return []
    const valBraceStart = m.index + m[0].length - 1
    try {
      const { value } = readBracedArg(body, valBraceStart)
      const stripped = value.replace(/^\s*:\s*/, '')
      return stripped
        .split(',')
        .map((s) => cleanTex(s))
        .filter(Boolean)
    } catch {
      return []
    }
  }
  const languages = findLabeled('Languages')
  const tools = findLabeled('Tools')
  return { languages, tools, flat: [...languages, ...tools] }
}

export function parseResume(tex: string): ParsedResume {
  const endIdx = tex.indexOf('\\end{document}')
  const truncated = endIdx >= 0 ? tex.slice(0, endIdx) : tex
  const cleaned = stripLineComments(truncated)
  const sections = splitSections(cleaned)
  const result: ParsedResume = {
    header: parseHeader(cleaned, truncated),
    education: [],
    skills: { languages: [], tools: [], flat: [] },
    experience: [],
    projects: [],
  }
  for (const { title, body } of sections) {
    const t = title.toLowerCase()
    if (t === 'education') result.education = parseEducation(body)
    else if (t === 'experience') result.experience = parseExperience(body)
    else if (t === 'projects') result.projects = parseProjects(body)
    else if (t === 'technical skills' || t === 'programming skills' || t === 'skills') {
      result.skills = parseSkills(body)
    }
  }
  return result
}

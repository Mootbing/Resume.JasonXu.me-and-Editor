type TokenType = 'comment' | 'command' | 'brace' | 'math' | 'escape' | 'text'

interface Token {
  type: TokenType
  value: string
}

export function tokenize(src: string): Token[] {
  const tokens: Token[] = []
  let buf = ''
  const flush = () => {
    if (buf) {
      tokens.push({ type: 'text', value: buf })
      buf = ''
    }
  }
  let i = 0
  while (i < src.length) {
    const c = src[i]
    if (c === '%') {
      flush()
      let j = i
      while (j < src.length && src[j] !== '\n') j++
      tokens.push({ type: 'comment', value: src.slice(i, j) })
      i = j
    } else if (c === '\\') {
      flush()
      const next = src[i + 1]
      if (next && /[a-zA-Z]/.test(next)) {
        let j = i + 1
        while (j < src.length && /[a-zA-Z]/.test(src[j])) j++
        tokens.push({ type: 'command', value: src.slice(i, j) })
        i = j
      } else if (next !== undefined) {
        tokens.push({ type: 'escape', value: src.slice(i, i + 2) })
        i += 2
      } else {
        buf += c
        i++
      }
    } else if (c === '{' || c === '}') {
      flush()
      tokens.push({ type: 'brace', value: c })
      i++
    } else if (c === '$') {
      flush()
      tokens.push({ type: 'math', value: '$' })
      i++
    } else {
      buf += c
      i++
    }
  }
  flush()
  return tokens
}

export function renderHighlighted(src: string): JSX.Element {
  const tokens = tokenize(src)
  return (
    <>
      {tokens.map((t, i) => (
        <span key={i} className={`tex-${t.type}`}>
          {t.value}
        </span>
      ))}
      {'\n'}
    </>
  )
}

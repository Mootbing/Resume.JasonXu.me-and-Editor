#!/usr/bin/env node
/*
 * Mirrors root-level assets referenced by REPLACE_ME_resume.tex into public/
 * so Next.js can serve them as static files. Runs on `predev` and `prebuild`.
 *
 * Currently mirrors only the file named in the `% icon:` directive.
 */
const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const TEX = path.join(ROOT, 'REPLACE_ME_resume.tex')

if (!fs.existsSync(TEX)) {
  console.warn(`[sync-public-assets] ${TEX} not found, skipping`)
  process.exit(0)
}

const tex = fs.readFileSync(TEX, 'utf-8')
const m = tex.match(/^[ \t]*%[ \t]*icon[ \t]*:[ \t]*(\S+)[ \t\r]*$/m)
if (!m) {
  console.warn('[sync-public-assets] no `% icon:` directive')
  process.exit(0)
}

const declaredPath = m[1].trim()
const fileName = declaredPath.startsWith('/') ? declaredPath.slice(1) : declaredPath
const src = path.join(ROOT, fileName)
const dst = path.join(ROOT, 'public', fileName)

if (!fs.existsSync(src)) {
  if (fs.existsSync(dst)) {
    console.log(`[sync-public-assets] icon already in public/${fileName}`)
    process.exit(0)
  }
  console.warn(`[sync-public-assets] icon ${src} not found at root and not in public/`)
  process.exit(0)
}

fs.mkdirSync(path.dirname(dst), { recursive: true })
fs.copyFileSync(src, dst)
console.log(`[sync-public-assets] ${fileName} -> public/${fileName}`)

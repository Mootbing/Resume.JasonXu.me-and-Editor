import { readFileSync } from 'fs'
import { join } from 'path'
import EditClient from './EditClient'

export default function EditPage() {
  const initialTex = readFileSync(join(process.cwd(), 'REPLACE_ME_resume.tex'), 'utf-8')
  return <EditClient initialTex={initialTex} />
}

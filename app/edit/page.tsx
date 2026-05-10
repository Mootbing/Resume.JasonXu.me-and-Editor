import { readFileSync } from 'fs'
import { join } from 'path'
import EditClient from './EditClient'

export default function EditPage() {
  const initialTex = readFileSync(join(process.cwd(), 'resume.tex'), 'utf-8')
  return <EditClient initialTex={initialTex} />
}

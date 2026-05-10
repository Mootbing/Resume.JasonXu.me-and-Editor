'use client'

import { useMemo, useRef, useState, UIEvent } from 'react'
import Header from '../components/Header'
import EducationSection from '../components/EducationSection'
import SkillsSection from '../components/SkillsSection'
import ExperienceSection from '../components/ExperienceSection'
import ProjectsSection from '../components/ProjectsSection'
import { parseResume } from '../utils/parseResume'
import { ParsedResume } from '../utils/resumeTypes'
import { renderHighlighted } from './highlight'
import LatexPreview from './LatexPreview'

interface EditClientProps {
  initialTex: string
}

type ViewMode = 'website' | 'pdf'

export default function EditClient({ initialTex }: EditClientProps): JSX.Element {
  const [tex, setTex] = useState(initialTex)
  const [view, setView] = useState<ViewMode>('website')
  const lastGood = useRef<ParsedResume | null>(null)
  const highlightRef = useRef<HTMLPreElement>(null)

  const { data, error } = useMemo(() => {
    try {
      const parsed = parseResume(tex)
      lastGood.current = parsed
      return { data: parsed, error: null as string | null }
    } catch (e) {
      return {
        data: lastGood.current,
        error: e instanceof Error ? e.message : 'Parse error',
      }
    }
  }, [tex])

  const highlighted = useMemo(() => renderHighlighted(tex), [tex])

  const syncScroll = (e: UIEvent<HTMLTextAreaElement>) => {
    const ta = e.currentTarget
    if (highlightRef.current) {
      highlightRef.current.scrollTop = ta.scrollTop
      highlightRef.current.scrollLeft = ta.scrollLeft
    }
  }

  return (
    <div className="edit-layout">
      <div className="edit-textarea-wrap">
        <pre className="edit-textarea-highlight" ref={highlightRef} aria-hidden="true">
          {highlighted}
        </pre>
        <textarea
          className="edit-textarea"
          value={tex}
          onChange={(e) => setTex(e.target.value)}
          onScroll={syncScroll}
          spellCheck={false}
        />
      </div>
      <div className="edit-preview">
        <div className="edit-toggle-bar">
          <button
            className="edit-save-btn"
            onClick={() => {
              const blob = new Blob([tex], { type: 'application/x-tex' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = 'resume.tex'
              document.body.appendChild(a)
              a.click()
              a.remove()
              URL.revokeObjectURL(url)
              window.open(
                'https://github.com/Mootbing/Resume.JasonXu.me',
                '_blank',
                'noopener,noreferrer'
              )
            }}
            aria-label="Download resume.tex and open the GitHub repo"
          >
            Save
          </button>
          <button
            className="edit-view-toggle"
            onClick={() => setView((v) => (v === 'website' ? 'pdf' : 'website'))}
            aria-label={`Switch to ${view === 'website' ? 'PDF' : 'website'} preview`}
          >
            {view === 'website' ? 'PDF' : 'Website'}
          </button>
        </div>
        {error && <div className="edit-error-banner">Parse error: {error}</div>}
        {data && (
          view === 'website' ? (
            <>
              <Header header={data.header} />
              <EducationSection items={data.education} />
              <SkillsSection skills={data.skills.flat} />
              <ExperienceSection items={data.experience} />
              <ProjectsSection items={data.projects} />
            </>
          ) : (
            <LatexPreview key="pdf" data={data} />
          )
        )}
      </div>
    </div>
  )
}

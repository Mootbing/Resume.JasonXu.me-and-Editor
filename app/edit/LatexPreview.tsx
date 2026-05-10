import { ReactNode } from 'react'
import { ParsedResume, LinkedTitle } from '../utils/resumeTypes'
import PaginatedPaper from './PaginatedPaper'

interface LatexPreviewProps {
  data: ParsedResume
}

function Linked({
  title,
  bold,
  underline,
}: {
  title: LinkedTitle
  bold?: boolean
  underline?: boolean
}): JSX.Element {
  const inner = bold ? <strong>{title.text}</strong> : <>{title.text}</>
  const decorated = underline ? <span className="lx-underline">{inner}</span> : inner
  if (title.url) {
    return (
      <a href={title.url} target="_blank" rel="noopener noreferrer" className="lx-link">
        {decorated}
      </a>
    )
  }
  return decorated as JSX.Element
}

export default function LatexPreview({ data }: LatexPreviewProps): JSX.Element {
  const { header, education, skills, experience, projects } = data
  const blocks: ReactNode[] = []

  blocks.push(
    <header className="lx-head" key="hdr">
      <h1 className="lx-name">{header.name || 'Jason Xu'}</h1>
      <div className="lx-contact">
        {header.contacts.map((c, i) => (
          <span key={i}>
            {i > 0 && <span className="lx-sep">{'  |  '}</span>}
            <a href={c.url} target="_blank" rel="noopener noreferrer" className="lx-link">
              <span className="lx-underline">{c.label}</span>
            </a>
          </span>
        ))}
      </div>
    </header>
  )

  education.forEach((e, i) => {
    blocks.push(
      <div className="lx-section-block" key={`edu-${i}`}>
        {i === 0 && <h2 className="lx-sec-title">Education</h2>}
        <div className="lx-sub">
          <div className="lx-row lx-top">
            <span>
              <strong>{e.school}</strong>
            </span>
            <span className="lx-right">{e.location}</span>
          </div>
          <div className="lx-row lx-bot">
            <span>
              <em>{e.degree}</em>
            </span>
            <span className="lx-right">
              <em>{e.date}</em>
            </span>
          </div>
        </div>
      </div>
    )
  })

  if (skills.languages.length > 0 || skills.tools.length > 0) {
    blocks.push(
      <div className="lx-section-block" key="skills">
        <h2 className="lx-sec-title">Technical Skills</h2>
        <div className="lx-skills">
          {skills.languages.length > 0 && (
            <div>
              <strong>Languages</strong>: {skills.languages.join(', ')}
            </div>
          )}
          {skills.tools.length > 0 && (
            <div>
              <strong>Tools</strong>: {skills.tools.join(', ')}
            </div>
          )}
        </div>
      </div>
    )
  }

  experience.forEach((e, i) => {
    blocks.push(
      <div className="lx-section-block" key={`exp-${i}`}>
        {i === 0 && <h2 className="lx-sec-title">Experience</h2>}
        <div className="lx-sub">
          <div className="lx-row lx-top">
            <span>
              <strong>{e.role}</strong>
            </span>
            <span className="lx-right">{e.location}</span>
          </div>
          <div className="lx-row lx-bot">
            <span>
              <em>
                <Linked title={e.title} underline />
              </em>
            </span>
            <span className="lx-right">
              <em>{e.date}</em>
            </span>
          </div>
          {e.bullets.length > 0 && (
            <ul className="lx-bullets">
              {e.bullets.map((b, bi) => (
                <li key={bi}>{b}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  })

  projects.forEach((p, i) => {
    blocks.push(
      <div className="lx-section-block" key={`proj-${i}`}>
        {i === 0 && <h2 className="lx-sec-title">Projects</h2>}
        <div className="lx-sub">
          <div className="lx-row lx-proj">
            <span>
              <Linked title={p.title} bold underline />
              {p.techStack && (
                <>
                  {' '}
                  <span className="lx-pipe">|</span>{' '}
                  <em>{p.techStack}</em>
                </>
              )}
            </span>
            <span className="lx-right">{p.date}</span>
          </div>
          {p.bullets.length > 0 && (
            <ul className="lx-bullets">
              {p.bullets.map((b, bi) => (
                <li key={bi}>{b}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  })

  return <PaginatedPaper blocks={blocks} />
}

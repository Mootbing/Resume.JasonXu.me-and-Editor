'use client'

import CollapsibleSection from './CollapsibleSection'
import TitleLink from './TitleLink'
import { ProjectEntry } from '../utils/resumeTypes'

interface ProjectsSectionProps {
  items: ProjectEntry[]
}

export default function ProjectsSection({ items }: ProjectsSectionProps): JSX.Element {
  return (
    <CollapsibleSection
      id="projectsSection"
      title="Projects"
      toggleClassName="projects-toggle"
      contentClassName="projects-content"
    >
      {items.map((item, idx) => (
        <div key={idx} className="experience-item">
          <div className="experience-header">
            <TitleLink title={item.title} />
            <span className="experience-date">{item.date}</span>
          </div>
          <div className="experience-company">{item.techStack}</div>
          <div className="experience-desc">
            {item.displayAsParagraph && item.bullets.length === 1 ? (
              item.bullets[0]
            ) : (
              <ul>
                {item.bullets.map((bullet, bidx) => (
                  <li key={bidx}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </CollapsibleSection>
  )
}

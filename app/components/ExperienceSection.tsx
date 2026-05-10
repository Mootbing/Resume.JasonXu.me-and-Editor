'use client'

import CollapsibleSection from './CollapsibleSection'
import TitleLink from './TitleLink'
import { ExperienceEntry } from '../utils/resumeTypes'

interface ExperienceSectionProps {
  items: ExperienceEntry[]
}

export default function ExperienceSection({ items }: ExperienceSectionProps): JSX.Element {
  return (
    <CollapsibleSection
      id="experienceSection"
      title="Experience"
      toggleClassName="experience-toggle"
      contentClassName="experience-content"
    >
      {items.map((item, idx) => (
        <div key={idx} className="experience-item">
          <div className="experience-header">
            <TitleLink title={item.title} />
            <span className="experience-date">{item.date}</span>
          </div>
          <div className="experience-company">{item.role}</div>
          <div className="experience-desc">
            <ul>
              {item.bullets.map((bullet, bidx) => (
                <li key={bidx}>{bullet}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </CollapsibleSection>
  )
}

'use client'

import CollapsibleSection from './CollapsibleSection'
import { EducationEntry } from '../utils/resumeTypes'

interface EducationSectionProps {
  items: EducationEntry[]
}

export default function EducationSection({ items }: EducationSectionProps): JSX.Element {
  return (
    <CollapsibleSection
      id="educationSection"
      title="Education"
      toggleClassName="education-toggle"
      contentClassName="education-content"
    >
      {items.map((item, idx) => (
        <div key={idx} className="education-item">
          <div className="education-header">
            <span className="education-title">{item.degree}</span>
            <span className="education-date">{item.date}</span>
          </div>
          <div className="education-school">
            {item.school}
            {item.location ? `, ${item.location}` : ''}
          </div>
        </div>
      ))}
    </CollapsibleSection>
  )
}

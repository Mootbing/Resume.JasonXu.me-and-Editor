'use client'

import { useState, useRef } from 'react'
import { wrapTextInChars, animateChars } from '../utils/animation'

export default function EducationSection(): JSX.Element {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLSpanElement>(null)
  const dateRef = useRef<HTMLSpanElement>(null)
  const schoolRef = useRef<HTMLDivElement>(null)

  const toggleEducation = () => {
    if (isCollapsed) {
      setIsCollapsed(false)
      if (contentRef.current) {
        contentRef.current.classList.remove('collapsed')
        if (titleRef.current) wrapTextInChars(titleRef.current)
        if (dateRef.current) wrapTextInChars(dateRef.current)
        if (schoolRef.current) wrapTextInChars(schoolRef.current)
        contentRef.current.classList.add('animating')
        animateChars(contentRef.current)
      }
    } else {
      setIsCollapsed(true)
      if (contentRef.current) {
        contentRef.current.classList.add('collapsed')
        contentRef.current.classList.remove('animating')
        contentRef.current
          .querySelectorAll('.char')
          .forEach((char) => char.classList.remove('fade-in'))
        if (titleRef.current && titleRef.current.dataset.text)
          titleRef.current.textContent = titleRef.current.dataset.text
        if (dateRef.current && dateRef.current.dataset.text)
          dateRef.current.textContent = dateRef.current.dataset.text
        if (schoolRef.current && schoolRef.current.dataset.text)
          schoolRef.current.textContent = schoolRef.current.dataset.text
      }
    }
  }

  return (
    <section
      id="educationSection"
      className={isCollapsed ? 'collapsed' : ''}
    >
      <h2
        className={`education-toggle ${isCollapsed ? 'collapsed' : ''}`}
        onClick={toggleEducation}
      >
        Education
      </h2>
      <div
        ref={contentRef}
        className={`education-content ${isCollapsed ? 'collapsed' : ''}`}
      >
        <div className="education-item">
          <div className="education-header">
            <span
              ref={titleRef}
              className="education-title"
              data-text="Candidate for Bachelor of Science in Computer Science"
            >
              Candidate for Bachelor of Science in Computer Science
            </span>
            <span
              ref={dateRef}
              className="education-date"
              data-text="2024 - 2028"
            >
              2024 - 2028
            </span>
          </div>
          <div
            ref={schoolRef}
            className="education-school"
            data-text="University of Pennsylvania, School of Engineering and Applied Science, Philadelphia, PA"
          >
            University of Pennsylvania, School of Engineering and Applied Science, Philadelphia, PA
          </div>
        </div>
      </div>
    </section>
  )
}

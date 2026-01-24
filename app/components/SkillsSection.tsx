'use client'

import { useState } from 'react'
import { ANIMATION_DELAY_STANDARD, ANIMATION_DELAY_COMPLETE } from '../constants/animation'

const skills = [
  // Languages
  'Python',
  'JavaScript',
  'Java',
  'C++',
  'TypeScript',
  'Flutter',
  'Tailwind',
  'HTML',
  'CSS',
  'OCaml',
  // Tools
  'Expo',
  'React Native',
  'React',
  'Next.js',
  'Vercel',
  'Supabase',
  'Firebase',
  'Figma',
  'CI/CD',
  'REST',
  'Git',
  'GCP',
  'AWS',
  'Azure',
]

export default function SkillsSection(): JSX.Element {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const toggleSkills = () => {
    if (isCollapsed) {
      setIsCollapsed(false)
      setIsAnimating(true)
      const listEl = document.getElementById('skillsList')
      if (listEl) {
        const tags = listEl.querySelectorAll('.skill-bubble')
        let index = 0
        const animateNext = () => {
          if (index < tags.length) {
            const tag = tags[index] as HTMLElement
            tag.classList.add('fade-in')
            index++
            setTimeout(animateNext, ANIMATION_DELAY_STANDARD)
          } else {
            setTimeout(() => setIsAnimating(false), ANIMATION_DELAY_COMPLETE)
          }
        }
        setTimeout(animateNext, ANIMATION_DELAY_STANDARD)
      }
    } else {
      setIsCollapsed(true)
      setIsAnimating(false)
      const listEl = document.getElementById('skillsList')
      if (listEl) {
        listEl
          .querySelectorAll('.skill-bubble')
          .forEach((tag) => tag.classList.remove('fade-in'))
      }
    }
  }

  return (
    <section
      id="skillsSection"
      className={isCollapsed ? 'collapsed' : ''}
    >
      <h2
        className={`skills-toggle ${isCollapsed ? 'collapsed' : ''}`}
        onClick={toggleSkills}
      >
        Technical Skills
      </h2>
      <div
        id="skillsList"
        className={`skills-list ${isCollapsed ? 'collapsed' : ''} ${isAnimating ? 'animating' : ''}`}
      >
        {skills.map((skill, index) => (
          <span key={index} className="skill-bubble">
            {skill}
          </span>
        ))}
      </div>
    </section>
  )
}

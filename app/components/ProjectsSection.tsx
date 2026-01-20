'use client'

import { useState, useRef } from 'react'
import { wrapAllTextInChars, restoreTextContent, animateChars } from '../utils/animation'

export default function ProjectsSection() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const toggleProjects = () => {
    if (isCollapsed) {
      setIsCollapsed(false)
      if (contentRef.current) {
        contentRef.current.classList.remove('collapsed')
        if (!contentRef.current.dataset.originalHtml) {
          contentRef.current.dataset.originalHtml =
            contentRef.current.innerHTML
        }
        wrapAllTextInChars(contentRef.current)
        contentRef.current.classList.add('animating')
        animateChars(contentRef.current)
      }
    } else {
      setIsCollapsed(true)
      if (contentRef.current) {
        contentRef.current.classList.add('collapsed')
        contentRef.current.classList.remove('animating')
        restoreTextContent(contentRef.current)
      }
    }
  }

  return (
    <section
      id="projectsSection"
      className={isCollapsed ? 'collapsed' : ''}
    >
      <h2
        className={`projects-toggle ${isCollapsed ? 'collapsed' : ''}`}
        onClick={toggleProjects}
      >
        Projects
      </h2>
      <div
        ref={contentRef}
        className={`projects-content ${isCollapsed ? 'collapsed' : ''}`}
      >
        <div className="experience-item">
          <div className="experience-header">
            <a href="https://yc-ai-sus-search-engine.vercel.app/" target="_blank" rel="noopener noreferrer" className="experience-title-link experience-link">
              <span className="experience-title">
                YCombinator Startup School Network
              </span>
            </a>
            <span className="experience-date">June - August 2025</span>
          </div>
          <div className="experience-company">Next.js, Vercel, Pinecone</div>
          <div className="experience-desc">
            <ul>
              <li>
                Developed text-embedded database of 1240 users and conversation
                logs for semantic search by YC students
              </li>
              <li>
                Created front-end search portal in Next.js, implementing
                Firebase Auth to prevent botting and abuse
              </li>
              <li>
                Launched on LinkedIn with 270k+ views, 700+ new followers, and
                452 registered, active users
              </li>
            </ul>
          </div>
        </div>
        <div className="experience-item">
          <div className="experience-header">
            <a href="https://instagram.com/bing.mov" target="_blank" rel="noopener noreferrer" className="experience-title-link experience-link">
              <span className="experience-title">Content Strategist</span>
            </a>
            <span className="experience-date">May - August 2025</span>
          </div>
          <div className="experience-company">Vibes</div>
          <div className="experience-desc">
            255k+ views on IG (@x.json1), 250k+ views on YT
            (@cowland-game-studios), 300k+ views LinkedIn (@xj1)
          </div>
        </div>
        <div className="experience-item">
          <div className="experience-header">
            <a href="https://17.jasonxu.me" target="_blank" rel="noopener noreferrer" className="experience-title-link experience-link">
              <span className="experience-title">17.JasonXu.me</span>
            </a>
            <span className="experience-date">August 2023 – Present</span>
          </div>
          <div className="experience-company">Next.js, Vercel</div>
          <div className="experience-desc">
            10k+ hits, awarded design accolades (site of the day) from
            CSSDesign Awards, CSSFox, AWWWards
          </div>
        </div>
      </div>
    </section>
  )
}

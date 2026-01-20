'use client'

import { useState, useRef } from 'react'
import { wrapAllTextInChars, restoreTextContent, animateChars } from '../utils/animation'

export default function ExperienceSection() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const toggleExperience = () => {
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
      id="experienceSection"
      className={isCollapsed ? 'collapsed' : ''}
    >
      <h2
        className={`experience-toggle ${isCollapsed ? 'collapsed' : ''}`}
        onClick={toggleExperience}
      >
        Experience
      </h2>
      <div
        ref={contentRef}
        className={`experience-content ${isCollapsed ? 'collapsed' : ''}`}
      >
        <div className="experience-item">
          <div className="experience-header">
            <a href="https://icon.com" target="_blank" rel="noopener noreferrer" className="experience-title-link experience-link">
              <span className="experience-title">Icon.com</span>
            </a>
            <span className="experience-date">October 2025 - Present</span>
          </div>
          <div className="experience-company">Founding Eng #2</div>
          <div className="experience-desc">
            <ul>
              <li>
                Reduced onboarding times 25% by building brand ingestion
                engine with BrowserBase, PostgreSQL, Supermemory
              </li>
              <li>
                Reduced ad generation mistakes 75% by building strategist review
                pipeline with Next, SQL, and Slack Webhooks
              </li>
              <li>
                Prevented 20+ possible client churns, saving $50k+ MRR
                implementing client-product feedback with sales team
              </li>
            </ul>
          </div>
        </div>
        <div className="experience-item">
          <div className="experience-header">
            <span className="experience-title">Moonbeam</span>
            <span className="experience-date">June 2025 - October 2025</span>
          </div>
          <div className="experience-company">Co-founder</div>
          <div className="experience-desc">
            <ul>
              <li>
                Built full-stack career planning app 50% more relevant than
                LinkedIn search using NLP to analyze resumes for a given role,
                generating a custom timeline by modeling the career paths of
                professionals with similar backgrounds
              </li>
              <li>
                Queried 150M+ LinkedIn profiles with Clado, storage in Supabase
                and front-end built with Next.js and Vercel
              </li>
              <li>
                Created Flutter mobile app Linge (Tinder x LinkedIn x Hinge) to
                match users with coffee chats using NLP
              </li>
            </ul>
          </div>
        </div>
        <div className="experience-item">
          <div className="experience-header">
            <span className="experience-title">DINO</span>
            <span className="experience-date">May 2023 – October 2023</span>
          </div>
          <div className="experience-company">Founding Engineer</div>
          <div className="experience-desc">
            <ul>
              <li>
                Designed and built front-end dashboard for Web3 event management
                system with NFT tokens as event passes
              </li>
              <li>
                Raised 300k from MiraclePlus (YCombinator China), hosted event
                at Stanford with leading blockchain professors
              </li>
              <li>
                Designed and deployed interactive landing page on EC2 instances
                with scrolling animations like my website
              </li>
              <li>
                Reduced content paint times 15% by writing Yaemage, npm library
                for dual lazy-loading .SVG and .PNG files
              </li>
              <li>
                Designed SQL table schema for events, catalog, and user profile
                tables used in final production server
              </li>
            </ul>
          </div>
        </div>
        <div className="experience-item">
          <div className="experience-header">
            <a href="https://gnec.ngo/hackathon" target="_blank" rel="noopener noreferrer" className="experience-title-link experience-link">
              <span className="experience-title">GNEC Hackathon</span>
            </a>
            <span className="experience-date">January 2023 – Present</span>
          </div>
          <div className="experience-company">Founder</div>
          <div className="experience-desc">
            <ul>
              <li>
                Founded 5,000+ participant hackathon spanning 85+ countries in
                5 seasons with $200,000 in prizes
              </li>
              <li>
                Built AWS EC2-hosted sponsor agent with BeautifulSoup4 and STMP,
                reaching 5,400+ potential partners
              </li>
              <li>
                Wrote LLM-integrated scripts to aide judging, pairing projects
                with internships at 1,600 UN-affiliated NGOs
              </li>
              <li>
                Invited speaker at the United Nations&apos; 69th Civil Society
                Conference in Nairobi, Kenya
              </li>
            </ul>
          </div>
        </div>
        <div className="experience-item">
          <div className="experience-header">
            <a href="https://un.org" target="_blank" rel="noopener noreferrer" className="experience-title-link experience-link">
              <span className="experience-title">United Nations</span>
            </a>
            <span className="experience-date">July 2022 – August 2024</span>
          </div>
          <div className="experience-company">Software Engineer</div>
          <div className="experience-desc">
            <ul>
              <li>
                Used Google Analytics and Google Maps API to develop
                refugee-aide tracking resource map
              </li>
              <li>
                Hybridized Firestore for location storage and RTDB as proxies,
                optimizing query speed 23% overall
              </li>
              <li>
                Developed whitelist system with Firebase Authentication and React
                admin dashboard for UN personnel
              </li>
              <li>
                Monitored security and inaccuracies with Cloud Logging,
                bulk-correcting locations with Python admin scripts
              </li>
              <li>
                Implemented geo-hashing algorithm with regional pre-indexing,
                reducing 66% of database query costs
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
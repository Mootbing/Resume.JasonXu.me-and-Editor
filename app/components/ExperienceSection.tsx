'use client'

import CollapsibleSection from './CollapsibleSection'

export default function ExperienceSection(): JSX.Element {
  return (
    <CollapsibleSection
      id="experienceSection"
      title="Experience"
      toggleClassName="experience-toggle"
      contentClassName="experience-content"
    >
      <div className="experience-item">
        <div className="experience-header">
          <a href="https://photon.codes" target="_blank" rel="noopener noreferrer" className="experience-title-link experience-link">
            <span className="experience-title">Photon.codes</span>
          </a>
          <span className="experience-date">December 2025 - January 2026</span>
        </div>
        <div className="experience-company">Founder in Residence</div>
        <div className="experience-desc">
          <ul>
            <li>Designed and built tryFlux.ai, agentic-coding IDE for iMessage agents with Next.js, LangChain, and iMessage-kit</li>
            <li>Introduced nested Docker container design for resource sharing between agents, reducing 75% compute costs</li>
            <li>Hit #1 on Product Hunt (350+ upvotes) in 24-hours of launch. Generated 1.5M+ views across social media.</li>
          </ul>
        </div>
      </div>
      <div className="experience-item">
        <div className="experience-header">
          <a href="https://icon.com" target="_blank" rel="noopener noreferrer" className="experience-title-link experience-link">
            <span className="experience-title">Icon.com</span>
          </a>
          <span className="experience-date">October 2025 - November 2025</span>
        </div>
        <div className="experience-company">#2 Founding Engineer</div>
        <div className="experience-desc">
          <ul>
            <li>Reduced onboarding times 25% by building brand ingestion engine with BrowserBase, PostgreSQL, Supermemory</li>
            <li>Reduced ad generation mistakes 75% by building strategist review pipeline with Next, SQL, and Slack Webhooks</li>
            <li>Prevented 20+ possible client churns, saving $50k+ MRR implementing client-product feedback with sales team</li>
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
            <li>Built full-stack career planning app 50% more relevant than LinkedIn search using NLP to analyze resumes for a given role, generating a custom timeline by modeling the career paths of professionals with similar backgrounds</li>
            <li>Queried 150M+ LinkedIn profiles with Clado, storage in Supabase and front-end built with Next.js and Vercel</li>
            <li>Created Flutter mobile app Linge (Tinder x LinkedIn x Hinge) to match users with coffee chats using NLP</li>
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
            <li>Founded 5,000+ participant hackathon spanning 85+ countries in 5 seasons with $250,000 in prizes</li>
            <li>Built AWS EC2-hosted sponsor agent with BeautifulSoup4 and STMP, reaching 5,400+ potential partners</li>
            <li>Wrote LLM-integrated scripts to aide judging, paired winning projects with internships at 1,600 UN NGOs</li>
            <li>Invited speaker at the United Nations' 69th Civil Society Conference in Nairobi, Kenya United Nations</li>
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
            <li>Used Google Analytics and Google Maps API to develop refugee-aide tracking resource map</li>
            <li>Hybridized Firestore for location storage and RTDB as proxies, optimizing query speed 23% overall</li>
            <li>Developed whitelist system with Firebase Authentication and React admin dashboard for UN personnel</li>
            <li>Monitored security and inaccuracies with Cloud Logging, bulk-correcting locations with Python admin scripts</li>
            <li>Implemented geo-hashing algorithm with regional pre-indexing, reducing 66% of database query costs</li>
          </ul>
        </div>
      </div>
    </CollapsibleSection>
  )
}

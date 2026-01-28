import Header from './components/Header'
import EducationSection from './components/EducationSection'
import SkillsSection from './components/SkillsSection'
import ExperienceSection from './components/ExperienceSection'
import ProjectsSection from './components/ProjectsSection'
import ContactButton from './components/ContactButton'
import BackgroundResume from './components/BackgroundResume'

export default function Home() {
  return (
    <div className="wrapper">
      <BackgroundResume />
      
      <div id="resume" className="container">
        <Header />

        <EducationSection />

        <SkillsSection />

        <ExperienceSection />

        <ProjectsSection />

        <a 
          href="/Jason_Xu.pdf" 
          download="resume.pdf" 
          className="download-btn download-btn-fixed"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
        </a>
        <ContactButton />
      </div>
    </div>
  )
}

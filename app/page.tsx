import { readFileSync } from 'fs'
import { join } from 'path'
import Header from './components/Header'
import EducationSection from './components/EducationSection'
import SkillsSection from './components/SkillsSection'
import ExperienceSection from './components/ExperienceSection'
import ProjectsSection from './components/ProjectsSection'
import Footer from './components/Footer'
import BackgroundResume from './components/BackgroundResume'
import ResumeContainer from './components/ResumeContainer'
import DownloadButton from './components/DownloadButton'
import EditLink from './components/EditLink'
import { parseResume } from './utils/parseResume'

export default function Home() {
  const tex = readFileSync(join(process.cwd(), 'resume.tex'), 'utf-8')
  const data = parseResume(tex)

  return (
    <div className="wrapper">
      <EditLink />
      <BackgroundResume />
      <div style={{ height: '100vh' }} />
      <ResumeContainer>
        <Header header={data.header} />

        <EducationSection items={data.education} />

        <SkillsSection skills={data.skills.flat} />

        <ExperienceSection items={data.experience} />

        <ProjectsSection items={data.projects} />

        <DownloadButton />
        <Footer />
      </ResumeContainer>
    </div>
  )
}

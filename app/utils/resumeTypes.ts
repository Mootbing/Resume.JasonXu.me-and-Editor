export interface LinkedTitle {
  text: string
  url?: string
}

export interface HeaderContact {
  url: string
  label: string
}

export interface ResumeHeader {
  name: string
  contacts: HeaderContact[]
  icon?: string
}

export interface EducationEntry {
  school: string
  location: string
  degree: string
  date: string
}

export interface ExperienceEntry {
  title: LinkedTitle
  date: string
  role: string
  location: string
  bullets: string[]
}

export interface ProjectEntry {
  title: LinkedTitle
  techStack: string
  date: string
  bullets: string[]
  displayAsParagraph: boolean
}

export interface SkillsData {
  languages: string[]
  tools: string[]
  flat: string[]
}

export interface ParsedResume {
  header: ResumeHeader
  education: EducationEntry[]
  skills: SkillsData
  experience: ExperienceEntry[]
  projects: ProjectEntry[]
}

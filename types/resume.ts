export interface ResumeContactLink {
  label: string;
  url: string;
}

export interface ResumePersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  links: ResumeContactLink[];
}

export interface ResumeSkillCategory {
  label: string;
  items: string;
}

export interface ResumeProject {
  title: string;
  type: string;
  bullets: string[];
  technologies: string;
  liveUrl?: string;
}

export interface ResumeEducation {
  degree: string;
  school: string;
  date?: string;
  coursework: string;
}

export interface ResumeData {
  personalInfo: ResumePersonalInfo;
  summary: string;
  skills: ResumeSkillCategory[];
  projects: ResumeProject[];
  education: ResumeEducation[];
}

export interface ResumeSkillGroup {
  label: string;
  items: string;
}

export interface ResumeProject {
  title: string;
  desc: string;
  tags: string[];
  stack: string;
  githubUrl?: string;
  liveUrl?: string;
  documentationUrl?: string;
  caseStudyUrl?: string;
  demoVideoUrl?: string;
}

export interface ResumeEducation {
  title: string;
  institute: string;
}

export interface ResumeData {
  name: string;
  headline: string;
  subline: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  portfolio: string;
  linkedin: string;
  summary: string[];
  skills: ResumeSkillGroup[];
  projects: ResumeProject[];
  education: ResumeEducation[];
  competencies: string[];
  languages: string[];
}

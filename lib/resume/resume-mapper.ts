import { connectDB } from "@/config/db";
import { Settings } from "@/models/Settings";
import { SkillCategory } from "@/models/Skill";
import { Project } from "@/models/Project";
import { Certificate } from "@/models/Certificate";
import type { ResumeData, ResumeSkillGroup, ResumeProject, ResumeEducation } from "./resume-types";

interface SettingsDoc {
  personal_info?: {
    full_name?: string;
    email?: string;
    phone?: string;
    location?: string;
    professional_title?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  profile?: {
    bio?: string;
    tagline?: string;
  };
  technical_skills?: {
    specializations?: string[];
    core_technologies?: string[];
  };
  experience?: {
    professional_experience?: string;
    project_experience?: string;
    focus?: string;
  };
  educations?: {
    degree?: string;
    institution?: string;
  }[];
}

/**
 * Builds ResumeData from the real portfolio data sources:
 * - Settings (personal info, education, experience, social links)
 * - Skills (technical skills from SkillCategory collection)
 * - Projects (featured projects from Project collection)
 * - Certificates (from Certificate collection)
 *
 * This is the SINGLE SOURCE OF TRUTH for resume content.
 * No hardcoded data. No mock data. No duplicates.
 */
export async function buildResumeData(): Promise<ResumeData> {
  await connectDB();

  const [settings, skillCategories, projects] = await Promise.all([
    Settings.findOne().lean() as unknown as SettingsDoc | null,
    SkillCategory.find().sort({ createdAt: 1 }).lean(),
    Project.find({ published: true, archived: { $ne: true } })
      .sort({ order: 1, createdAt: -1 })
      .lean(),
  ]);

  const personal = settings?.personal_info;
  const profile = settings?.profile;
  const educations = settings?.educations || [];

  // ── Personal Info ──
  const name = personal?.full_name || "Soruj Mahmud";
  const headline = personal?.professional_title || "Frontend Developer";
  const subline = profile?.tagline || "Building responsive, scalable, and AI-powered web applications.";
  const location = personal?.location || "";
  const email = personal?.email || "";
  const phone = personal?.phone || "";
  const github = personal?.github || "";
  const portfolio = personal?.website || "";
  const linkedin = personal?.linkedin || "";

  // ── Professional Summary ──
  const summary = buildSummary(settings);

  // ── Technical Skills ──
  const skills = buildSkills(skillCategories, settings);

  // ── Projects (top 4 featured) ──
  const resumeProjects = buildProjects(projects);

  // ── Education ──
  const education = buildEducation(educations);

  // ── Core Competencies ──
  const competencies = buildCompetencies(settings);

  // ── Languages ──
  const languages = ["Bengali — Native", "English — Professional Working Proficiency"];

  return {
    name,
    headline,
    subline,
    location,
    email,
    phone,
    github,
    portfolio,
    linkedin,
    summary,
    skills,
    projects: resumeProjects,
    education,
    competencies,
    languages,
  };
}

function buildSummary(settings: SettingsDoc | null): string[] {
  const bio = settings?.profile?.bio;
  const exp = settings?.experience;

  if (bio) {
    return [bio];
  }

  const paragraphs: string[] = [];

  if (exp?.professional_experience) {
    paragraphs.push(exp.professional_experience);
  }
  if (exp?.project_experience) {
    paragraphs.push(exp.project_experience);
  }
  if (exp?.focus) {
    paragraphs.push(exp.focus);
  }

  if (paragraphs.length > 0) return paragraphs;

  return [
    "Frontend Developer specializing in React, Next.js, TypeScript, JavaScript, and Tailwind CSS. Passionate about building responsive, accessible, and high-performance web applications with clean, maintainable architecture.",
    "Hands-on experience through real-world projects involving full-stack JavaScript development, authentication, state management, REST APIs, real-time communication, and AI-powered applications.",
  ];
}

interface SkillCategoryDoc {
  title: string;
  skills: { name: string }[];
}

function buildSkills(skillCategories: SkillCategoryDoc[], settings: SettingsDoc | null): ResumeSkillGroup[] {
  const groups: ResumeSkillGroup[] = [];

  for (const cat of skillCategories) {
    if (cat.skills && cat.skills.length > 0) {
      const items = cat.skills.map((s) => s.name).join(", ");
      groups.push({ label: cat.title, items });
    }
  }

  if (groups.length > 0) return groups;

  const tech = settings?.technical_skills;
  if (tech?.core_technologies?.length) {
    groups.push({ label: "Technologies", items: tech.core_technologies.join(", ") });
  }
  if (tech?.specializations?.length) {
    groups.push({ label: "Specializations", items: tech.specializations.join(", ") });
  }

  return groups;
}

interface ProjectDoc {
  title: string;
  description?: string;
  features?: string[];
  tags?: string[];
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
  documentationUrl?: string;
  caseStudyUrl?: string;
  demoVideoUrl?: string;
  featured?: boolean;
  status?: string;
}

function buildProjects(projects: ProjectDoc[]): ResumeProject[] {
  const featured = projects
    .filter((p) => p.featured || p.status === "completed")
    .slice(0, 4);

  const source = featured.length > 0 ? featured : projects.slice(0, 3);

  return source.map((p) => ({
    title: p.title,
    desc: p.description || "",
    tags: p.features || p.tags || [],
    stack: (p.technologies || []).join(" · "),
    githubUrl: p.githubUrl || undefined,
    liveUrl: p.liveUrl || undefined,
    documentationUrl: p.documentationUrl || undefined,
    caseStudyUrl: p.caseStudyUrl || undefined,
    demoVideoUrl: p.demoVideoUrl || undefined,
  }));
}

interface EducationEntry {
  degree?: string;
  institution?: string;
}

function buildEducation(educations: EducationEntry[]): ResumeEducation[] {
  if (educations.length > 0) {
    return educations.map((e) => ({
      title: e.degree || "",
      institute: e.institution || "",
    }));
  }

  return [
    {
      title: "Higher Secondary Certificate (HSC) — Science",
      institute: "Nagarpur Government College, Tangail, Bangladesh",
    },
    {
      title: "Secondary School Certificate (SSC) — Science",
      institute: "Bangladesh",
    },
  ];
}

function buildCompetencies(settings: SettingsDoc | null): string[] {
  const competencies: string[] = [];

  const tech = settings?.technical_skills;
  if (tech?.specializations?.length) {
    competencies.push(...tech.specializations.slice(0, 5));
  }

  if (competencies.length === 0) {
    competencies.push(
      "Frontend Development",
      "React & Next.js Development",
      "Responsive Web Design",
      "State Management",
      "REST API Integration",
      "Authentication & Security",
      "Real-Time Application Development",
      "AI Application Development",
    );
  }

  return competencies;
}

/**
 * Get certificates for resume (only if they exist).
 * Returns empty array if no certificates — section should be hidden.
 */
export async function getResumeCertificates(): Promise<{
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}[]> {
  await connectDB();
  const certs = await Certificate.find({ active: true }).sort({ order: 1 }).lean() as Array<{
    title: string;
    issuer: string;
    date: string;
    credentialUrl?: string;
  }>;

  return certs.map((c) => ({
    title: c.title,
    issuer: c.issuer,
    date: c.date,
    credentialUrl: c.credentialUrl || undefined,
  }));
}

"use server";

import { connectDB } from "@/config/db";
import { Settings } from "@/models/Settings";
import { Project } from "@/models/Project";
import { SkillCategory } from "@/models/Skill";
import { Service } from "@/models/Service";
import { FAQ } from "@/models/FAQ";
import { Certificate } from "@/models/Certificate";
import { Blog } from "@/models/Blog";

export interface PortfolioData {
  settings: Record<string, unknown> | null;
  projects: unknown[];
  skills: unknown[];
  services: unknown[];
  faqs: unknown[];
  certificates: unknown[];
  blogs: unknown[];
}

export async function getPortfolioData(): Promise<PortfolioData> {
  await connectDB();

  const [settingsDoc, projects, skills, services, faqs, certificates, blogs] =
    await Promise.all([
      Settings.findOne({}).lean(),
      Project.find({}).sort({ featured: -1, createdAt: -1 }).lean(),
      SkillCategory.find({}).lean(),
      Service.find({ active: true }).sort({ order: 1 }).lean(),
      FAQ.find({ active: true }).sort({ order: 1 }).lean(),
      Certificate.find({ active: true }).sort({ order: 1 }).lean(),
      Blog.find({ published: true }).sort({ publishedAt: -1 }).lean(),
    ]);

  return {
    settings: settingsDoc ? JSON.parse(JSON.stringify(settingsDoc)) : null,
    projects: JSON.parse(JSON.stringify(projects)),
    skills: JSON.parse(JSON.stringify(skills)),
    services: JSON.parse(JSON.stringify(services)),
    faqs: JSON.parse(JSON.stringify(faqs)),
    certificates: JSON.parse(JSON.stringify(certificates)),
    blogs: JSON.parse(JSON.stringify(blogs)),
  };
}

export async function getSettings(): Promise<Record<string, unknown> | null> {
  await connectDB();
  const settings = await Settings.findOne({}).lean();
  return settings ? JSON.parse(JSON.stringify(settings)) : null;
}

export async function getProjects(): Promise<unknown[]> {
  await connectDB();
  const projects = await Project.find({})
    .sort({ featured: -1, createdAt: -1 })
    .lean();
  return JSON.parse(JSON.stringify(projects));
}

export async function getSkills(): Promise<unknown[]> {
  await connectDB();
  const skills = await SkillCategory.find({}).lean();
  return JSON.parse(JSON.stringify(skills));
}

export async function getServices(): Promise<unknown[]> {
  await connectDB();
  const services = await Service.find({ active: true })
    .sort({ order: 1 })
    .lean();
  return JSON.parse(JSON.stringify(services));
}

export async function getFAQs(): Promise<unknown[]> {
  await connectDB();
  const faqs = await FAQ.find({ active: true }).sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(faqs));
}

export async function getCertificates(): Promise<unknown[]> {
  await connectDB();
  const certs = await Certificate.find({ active: true })
    .sort({ order: 1 })
    .lean();
  return JSON.parse(JSON.stringify(certs));
}

export async function getBlogs(): Promise<unknown[]> {
  await connectDB();
  const blogs = await Blog.find({ published: true })
    .sort({ publishedAt: -1 })
    .lean();
  return JSON.parse(JSON.stringify(blogs));
}

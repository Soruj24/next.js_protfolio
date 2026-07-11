import { connectDB } from "@/config/db";
import { Project } from "@/models/Project";
import { SkillCategory } from "@/models/Skill";
import { Contact } from "@/models/Contact";
import { Settings, type ISettings } from "@/models/Settings";

export interface PortfolioData {
  settings: ISettings | null;
  projects: any[];
  skills: any[];
  contactCount: number;
}

export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    await connectDB();
    const [settings, projects, skills, contactCount] = await Promise.all([
      Settings.findOne().lean(),
      Project.find({ published: true, archived: false }).sort({ order: 1, createdAt: -1 }).lean(),
      SkillCategory.find().lean(),
      Contact.countDocuments(),
    ]);
    return { settings, projects, skills, contactCount };
  } catch {
    return { settings: null, projects: [], skills: [], contactCount: 0 };
  }
}

export async function getSettings(): Promise<ISettings | null> {
  try {
    await connectDB();
    return await Settings.findOne().lean();
  } catch {
    return null;
  }
}

export async function getProjects() {
  try {
    await connectDB();
    return await Project.find({}).sort({ order: 1, createdAt: -1 }).lean();
  } catch {
    return [];
  }
}

export async function getSkills() {
  try {
    await connectDB();
    return await SkillCategory.find().lean();
  } catch {
    return [];
  }
}

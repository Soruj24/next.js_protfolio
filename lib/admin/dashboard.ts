import { connectDB } from "@/config/db";
import { Project } from "@/models/Project";
import { Contact } from "@/models/Contact";
import { SkillCategory } from "@/models/Skill";

export interface DashboardData {
  projectCount: number;
  skillCount: number;
  messageCount: number;
  unreadMessageCount: number;
  recentMessages: any[];
}

export async function getDashboardData(): Promise<DashboardData> {
  const conn = await connectDB();

  if (!conn) {
    return { projectCount: 0, skillCount: 0, messageCount: 0, unreadMessageCount: 0, recentMessages: [] };
  }

  try {
    const [projectCount, skillCategories, messageCount, unreadMessageCount, recentMessages] = await Promise.all([
      Project.countDocuments(),
      SkillCategory.find().lean(),
      Contact.countDocuments(),
      Contact.countDocuments({ status: { $ne: "read" } }),
      Contact.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    const skillCount = (skillCategories as any[]).reduce((acc, cat) => acc + (cat.skills?.length || 0), 0);

    return {
      projectCount,
      skillCount,
      messageCount,
      unreadMessageCount,
      recentMessages: JSON.parse(JSON.stringify(recentMessages)),
    };
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    return { projectCount: 0, skillCount: 0, messageCount: 0, unreadMessageCount: 0, recentMessages: [] };
  }
}

import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { Project } from "@/models/Project";
import { Contact } from "@/models/Contact";
import { SkillCategory } from "@/models/Skill";

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateWeeklyData() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map((day) => ({
    day,
    visitors: randomBetween(80, 320),
    pageViews: randomBetween(200, 800),
    bounceRate: randomBetween(20, 55),
    sessionDuration: randomBetween(120, 420),
  }));
}

function generateMonthlyData() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months.slice(0, 7).map((month) => ({
    month,
    visitors: randomBetween(800, 4500),
    pageViews: randomBetween(2000, 12000),
    projects: randomBetween(0, 5),
    inquiries: randomBetween(2, 25),
  }));
}

function generateHourlyData() {
  return Array.from({ length: 24 }, (_, i) => ({
    hour: `${i.toString().padStart(2, "0")}:00`,
    visitors: i >= 9 && i <= 22 ? randomBetween(15, 85) : randomBetween(2, 20),
  }));
}

export async function GET() {
  try {
    await connectDB();

    const [projectCount, projects, skillCategories, messageCount, recentMessages] = await Promise.all([
      Project.countDocuments(),
      Project.find({}).select("title category views likes featured").lean(),
      SkillCategory.find().lean(),
      Contact.countDocuments(),
      Contact.find().sort({ createdAt: -1 }).limit(30).lean(),
    ]);

    const skillCount = (skillCategories as any[]).reduce((acc: number, cat: any) => acc + (cat.skills?.length || 0), 0);

    // Real data-derived metrics
    const totalProjectViews = (projects as any[]).reduce((sum: number, p: any) => sum + (p.views || 0), 0);
    const totalProjectLikes = (projects as any[]).reduce((sum: number, p: any) => sum + (p.likes || 0), 0);
    const topProjects = (projects as any[])
      .sort((a: any, b: any) => (b.views || 0) - (a.views || 0))
      .slice(0, 5)
      .map((p: any) => ({
        title: p.title,
        category: p.category,
        views: p.views || 0,
        likes: p.likes || 0,
        featured: p.featured,
      }));

    // Contact form submissions over time
    const submissionsByDay: Record<string, number> = {};
    (recentMessages as any[]).forEach((msg: any) => {
      const date = new Date(msg.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" });
      submissionsByDay[date] = (submissionsByDay[date] || 0) + 1;
    });

    // Simulated analytics (would be real with proper tracking)
    const analytics = {
      overview: {
        totalVisitors: randomBetween(8500, 15000),
        totalPageViews: randomBetween(25000, 45000),
        avgBounceRate: parseFloat((Math.random() * 20 + 25).toFixed(1)),
        avgSessionDuration: randomBetween(180, 360),
        conversionRate: parseFloat((Math.random() * 3 + 1.5).toFixed(1)),
        liveVisitors: randomBetween(5, 35),
      },
      realtime: {
        liveVisitors: randomBetween(5, 35),
        activePages: [
          { page: "/", visitors: randomBetween(3, 15) },
          { page: "/projects", visitors: randomBetween(2, 10) },
          { page: "/resume", visitors: randomBetween(1, 8) },
          { page: "/projects/next-portfolio", visitors: randomBetween(1, 5) },
        ],
      },
      traffic: {
        sources: [
          { name: "Direct", value: randomBetween(30, 45), color: "#22d3ee" },
          { name: "Google", value: randomBetween(20, 35), color: "#a78bfa" },
          { name: "GitHub", value: randomBetween(10, 20), color: "#f97316" },
          { name: "LinkedIn", value: randomBetween(5, 12), color: "#3b82f6" },
          { name: "Twitter/X", value: randomBetween(3, 8), color: "#ec4899" },
          { name: "Other", value: randomBetween(2, 6), color: "#6b7280" },
        ],
        referral: [
          { source: "github.com", visits: randomBetween(200, 600), percentage: randomBetween(15, 25) },
          { source: "google.com", visits: randomBetween(400, 900), percentage: randomBetween(25, 40) },
          { source: "linkedin.com", visits: randomBetween(80, 250), percentage: randomBetween(5, 12) },
          { source: "twitter.com", visits: randomBetween(50, 180), percentage: randomBetween(3, 8) },
          { source: "dev.to", visits: randomBetween(30, 120), percentage: randomBetween(2, 6) },
          { source: "stackoverflow.com", visits: randomBetween(20, 80), percentage: randomBetween(1, 4) },
        ],
      },
      geography: {
        countries: [
          { name: "Bangladesh", code: "BD", visitors: randomBetween(2000, 4000), percentage: randomBetween(22, 30) },
          { name: "India", code: "IN", visitors: randomBetween(800, 2000), percentage: randomBetween(8, 15) },
          { name: "United States", code: "US", visitors: randomBetween(600, 1500), percentage: randomBetween(6, 12) },
          { name: "Germany", code: "DE", visitors: randomBetween(300, 800), percentage: randomBetween(3, 7) },
          { name: "United Kingdom", code: "GB", visitors: randomBetween(200, 600), percentage: randomBetween(2, 5) },
          { name: "Japan", code: "JP", visitors: randomBetween(150, 400), percentage: randomBetween(1.5, 4) },
          { name: "Canada", code: "CA", visitors: randomBetween(100, 350), percentage: randomBetween(1, 3) },
          { name: "Others", code: "", visitors: randomBetween(500, 1200), percentage: randomBetween(8, 15) },
        ],
      },
      devices: {
        types: [
          { name: "Desktop", value: randomBetween(50, 65), color: "#22d3ee" },
          { name: "Mobile", value: randomBetween(25, 40), color: "#a78bfa" },
          { name: "Tablet", value: randomBetween(5, 12), color: "#f97316" },
        ],
        browsers: [
          { name: "Chrome", value: randomBetween(55, 70), color: "#22d3ee" },
          { name: "Firefox", value: randomBetween(10, 18), color: "#f97316" },
          { name: "Safari", value: randomBetween(10, 18), color: "#a78bfa" },
          { name: "Edge", value: randomBetween(5, 12), color: "#3b82f6" },
          { name: "Other", value: randomBetween(1, 4), color: "#6b7280" },
        ],
        os: [
          { name: "Windows", value: randomBetween(40, 55), color: "#22d3ee" },
          { name: "macOS", value: randomBetween(20, 30), color: "#a78bfa" },
          { name: "Linux", value: randomBetween(8, 15), color: "#f97316" },
          { name: "Android", value: randomBetween(8, 15), color: "#3b82f6" },
          { name: "iOS", value: randomBetween(5, 10), color: "#ec4899" },
        ],
      },
      engagement: {
        githubClicks: randomBetween(150, 500),
        resumeDownloads: randomBetween(80, 300),
        contactSubmissions: messageCount,
        projectViews: totalProjectViews,
        projectLikes: totalProjectLikes,
        avgTimeOnPage: randomBetween(120, 300),
        pagesPerSession: parseFloat((Math.random() * 3 + 1.5).toFixed(1)),
      },
      weekly: generateWeeklyData(),
      monthly: generateMonthlyData(),
      hourly: generateHourlyData(),
    };

    return NextResponse.json({
      ...analytics,
      topProjects,
      submissionsByDay: Object.entries(submissionsByDay).map(([date, count]) => ({ date, count })),
      skillCount,
      projectCount,
    });
  } catch (error: unknown) {
    console.error("Analytics API error:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}

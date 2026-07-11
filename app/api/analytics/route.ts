import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { Project } from "@/models/Project";
import { Contact } from "@/models/Contact";
import { SkillCategory } from "@/models/Skill";
import { AnalyticsEvent } from "@/models/AnalyticsEvent";
import { Activity } from "@/models/Activity";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();

    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [projectCount, projects, skillCategories, messageCount, recentMessages, recentEvents, activities] =
      await Promise.all([
        Project.countDocuments(),
        Project.find({}).select("title category views likes featured").lean(),
        SkillCategory.find().lean(),
        Contact.countDocuments(),
        Contact.find().sort({ createdAt: -1 }).limit(30).lean(),
        AnalyticsEvent.find({ createdAt: { $gte: thirtyDaysAgo } }).lean(),
        Activity.find().sort({ createdAt: -1 }).limit(50).lean(),
      ]);

    const skillCount = (skillCategories as any[]).reduce(
      (acc: number, cat: any) => acc + (cat.skills?.length || 0),
      0
    );

    const totalProjectViews = (projects as any[]).reduce(
      (sum: number, p: any) => sum + (p.views || 0),
      0
    );
    const totalProjectLikes = (projects as any[]).reduce(
      (sum: number, p: any) => sum + (p.likes || 0),
      0
    );
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

    const submissionsByDay: Record<string, number> = {};
    (recentMessages as any[]).forEach((msg: any) => {
      const date = new Date(msg.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      submissionsByDay[date] = (submissionsByDay[date] || 0) + 1;
    });

    // Derive real analytics from events
    const totalPageViews = recentEvents.filter((e: any) => e.event === "page_view").length;
    const totalProjectViewsFromEvents = recentEvents.filter((e: any) => e.event === "project_view").length;
    const totalLikes = recentEvents.filter((e: any) => e.event === "like").length;
    const totalContactSubmissions = recentEvents.filter((e: any) => e.event === "contact_submit").length;

    // Device breakdown from real events
    const deviceCounts: Record<string, number> = {};
    const browserCounts: Record<string, number> = {};
    const osCounts: Record<string, number> = {};
    const pageViewsByDay: Record<string, number> = {};

    recentEvents.forEach((e: any) => {
      if (e.device) deviceCounts[e.device] = (deviceCounts[e.device] || 0) + 1;
      if (e.browser) browserCounts[e.browser] = (browserCounts[e.browser] || 0) + 1;
      if (e.os) osCounts[e.os] = (osCounts[e.os] || 0) + 1;
      if (e.event === "page_view" && e.createdAt) {
        const day = new Date(e.createdAt).toLocaleDateString("en-US", { weekday: "short" });
        pageViewsByDay[day] = (pageViewsByDay[day] || 0) + 1;
      }
    });

    const toPercentArray = (counts: Record<string, number>) => {
      const total = Object.values(counts).reduce((a, b) => a + b, 0);
      if (total === 0) return [];
      return Object.entries(counts)
        .map(([name, value]) => ({ name, value: Math.round((value / total) * 100) }))
        .sort((a, b) => b.value - a.value);
    };

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const weeklyData = days.map((day) => ({
      day,
      visitors: pageViewsByDay[day] || 0,
      pageViews: pageViewsByDay[day] || 0,
    }));

    const analytics = {
      overview: {
        totalVisitors: totalPageViews,
        totalPageViews,
        totalProjectViews,
        totalProjectLikes,
        avgBounceRate: 0,
        avgSessionDuration: 0,
        conversionRate: totalPageViews > 0 ? parseFloat(((totalContactSubmissions / totalPageViews) * 100).toFixed(1)) : 0,
      },
      traffic: {
        sources: [] as { name: string; value: number; color: string }[],
      },
      devices: {
        types: toPercentArray(deviceCounts),
        browsers: toPercentArray(browserCounts),
        os: toPercentArray(osCounts),
      },
      engagement: {
        totalContactSubmissions: messageCount,
        totalProjectViews,
        totalProjectLikes,
      },
      weekly: weeklyData,
      topProjects,
      submissionsByDay: Object.entries(submissionsByDay).map(([date, count]) => ({ date, count })),
      recentActivities: activities.slice(0, 10),
      skillCount,
      projectCount,
    };

    return NextResponse.json(analytics);
  } catch (error: unknown) {
    console.error("Analytics API error:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}

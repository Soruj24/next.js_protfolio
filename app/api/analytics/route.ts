import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { Project } from "@/models/Project";
import { AnalyticsEvent } from "@/models/AnalyticsEvent";

export const dynamic = "force-dynamic";

const PERIOD_MS: Record<string, number> = {
  "7d": 7 * 24 * 60 * 60 * 1000,
  "30d": 30 * 24 * 60 * 60 * 1000,
  "90d": 90 * 24 * 60 * 60 * 1000,
};

function extractDomain(referrer: string): string {
  if (!referrer) return "";
  try {
    const url = new URL(referrer.startsWith("http") ? referrer : `https://${referrer}`);
    return url.hostname.replace(/^www\./, "");
  } catch {
    return referrer;
  }
}

function computeSessions(events: any[]): number {
  if (events.length === 0) return 0;
  const byAgent: Record<string, number[]> = {};
  events.forEach((e: any) => {
    const agent = e.userAgent || "unknown";
    if (!byAgent[agent]) byAgent[agent] = [];
    byAgent[agent].push(new Date(e.createdAt).getTime());
  });
  let sessions = 0;
  const GAP = 30 * 60 * 1000;
  Object.values(byAgent).forEach((timestamps) => {
    timestamps.sort((a, b) => a - b);
    sessions += 1;
    for (let i = 1; i < timestamps.length; i++) {
      if (timestamps[i] - timestamps[i - 1] > GAP) sessions++;
    }
  });
  return sessions;
}

function toBreakdown(counts: Record<string, number>): Array<{ name: string; count: number; percentage: number }> {
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  if (total === 0) return [];
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count, percentage: Math.round((count / total) * 100) }))
    .sort((a, b) => b.count - a.count);
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const period = request.nextUrl.searchParams.get("period") || "30d";
    const periodMs = PERIOD_MS[period] || PERIOD_MS["30d"];
    const now = new Date();
    const startDate = new Date(now.getTime() - periodMs);
    const fiveMinAgo = new Date(now.getTime() - 5 * 60 * 1000);

    const [events, projects, realtimeEvents] = await Promise.all([
      AnalyticsEvent.find({ createdAt: { $gte: startDate } }).lean(),
      Project.find({}).select("title category views likes featured").lean(),
      AnalyticsEvent.find({ createdAt: { $gte: fiveMinAgo } }).lean(),
    ]);

    const evts = events as any[];

    const uniqueAgents = new Set(evts.map((e) => e.userAgent).filter(Boolean));
    const visitors = uniqueAgents.size;
    const sessions = computeSessions(evts);
    const pageViews = evts.filter((e) => e.event === "page_view").length;
    const projectViews = evts.filter((e) => e.event === "project_view").length;
    const resumeDownloads = evts.filter((e) => e.event === "resume_download").length;
    const contactSubmissions = evts.filter((e) => e.event === "contact_submit").length;
    const githubClicks = evts.filter((e) => e.event === "github_click").length;

    const rtAgents = new Set((realtimeEvents as any[]).map((e) => e.userAgent).filter(Boolean));
    const liveVisitors = rtAgents.size;
    const activePageCounts: Record<string, number> = {};
    (realtimeEvents as any[]).forEach((e: any) => {
      if (e.page) activePageCounts[e.page] = (activePageCounts[e.page] || 0) + 1;
    });

    const deviceCounts: Record<string, number> = {};
    const browserCounts: Record<string, number> = {};
    const countryCounts: Record<string, number> = {};
    const referralCounts: Record<string, number> = {};

    evts.forEach((e) => {
      if (e.device) deviceCounts[e.device] = (deviceCounts[e.device] || 0) + 1;
      if (e.browser) browserCounts[e.browser] = (browserCounts[e.browser] || 0) + 1;
      if (e.country) countryCounts[e.country] = (countryCounts[e.country] || 0) + 1;
      const domain = extractDomain(e.referrer);
      if (domain) referralCounts[domain] = (referralCounts[domain] || 0) + 1;
    });

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const pageViewsByDay: Record<string, number> = {};
    evts.filter((e) => e.event === "page_view").forEach((e) => {
      const day = new Date(e.createdAt).toLocaleDateString("en-US", { weekday: "short" });
      pageViewsByDay[day] = (pageViewsByDay[day] || 0) + 1;
    });
    const weekly = days.map((day) => ({ day, visitors: pageViewsByDay[day] || 0 }));

    const eventsByHour: Record<string, number> = {};
    evts.forEach((e) => {
      const hour = new Date(e.createdAt).getHours().toString().padStart(2, "0") + ":00";
      eventsByHour[hour] = (eventsByHour[hour] || 0) + 1;
    });
    const hourly = Array.from({ length: 24 }, (_, i) => {
      const hour = i.toString().padStart(2, "0") + ":00";
      return { hour, visitors: eventsByHour[hour] || 0 };
    });

    const topProjects = (projects as any[])
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 5)
      .map((p) => ({
        title: p.title,
        category: p.category,
        views: p.views || 0,
        likes: p.likes || 0,
      }));

    return NextResponse.json({
      period,
      overview: {
        visitors,
        sessions,
        pageViews,
        projectViews,
        resumeDownloads,
        contactSubmissions,
        githubClicks,
        conversionRate: pageViews > 0 ? parseFloat(((contactSubmissions / pageViews) * 100).toFixed(1)) : 0,
      },
      realtime: {
        liveVisitors,
        activePages: Object.entries(activePageCounts)
          .map(([page, visitors]) => ({ page, visitors }))
          .sort((a, b) => b.visitors - a.visitors)
          .slice(0, 10),
      },
      devices: toBreakdown(deviceCounts),
      browsers: toBreakdown(browserCounts),
      countries: toBreakdown(countryCounts).map((c) => ({
        name: c.name,
        code: c.name.length === 2 ? c.name.toUpperCase() : "",
        count: c.count,
        percentage: c.percentage,
      })),
      referralSources: toBreakdown(referralCounts).map((r) => ({
        source: r.name,
        count: r.count,
        percentage: r.percentage,
      })),
      topProjects,
      weekly,
      hourly,
    });
  } catch (error: unknown) {
    console.error("Analytics API error:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}

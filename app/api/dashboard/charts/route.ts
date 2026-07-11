import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { Project } from "@/models/Project";
import { Contact } from "@/models/Contact";
import { SkillCategory } from "@/models/Skill";
import { AnalyticsEvent } from "@/models/AnalyticsEvent";
import { fetchAllGitHubData } from "@/lib/github/service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();

    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

    const [
      visitorsOverTime,
      messagesOverTime,
      contactSources,
      projectCategories,
      techUsage,
      deviceBreakdown,
      browserBreakdown,
      countryBreakdown,
      hourlyActivity,
    ] = await Promise.all([
      // 1. Visitors over time (last 30 days, grouped by day)
      AnalyticsEvent.aggregate([
        { $match: { createdAt: { $gte: thirtyDaysAgo } } },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            },
            visitors: { $addToSet: { $cond: [{ $ne: ["$userAgent", null] }, "$userAgent", "$$REMOVE"] } },
            pageViews: { $sum: { $cond: [{ $eq: ["$event", "page_view"] }, 1, 0] } },
            projectViews: { $sum: { $cond: [{ $eq: ["$event", "project_view"] }, 1, 0] } },
          },
        },
        {
          $project: {
            _id: 0,
            date: "$_id",
            visitors: { $size: "$visitors" },
            pageViews: 1,
            projectViews: 1,
          },
        },
        { $sort: { date: 1 } },
      ]),

      // 2. Messages over time (last 90 days, grouped by day)
      Contact.aggregate([
        { $match: { createdAt: { $gte: ninetyDaysAgo } } },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            date: "$_id",
            count: 1,
          },
        },
        { $sort: { date: 1 } },
      ]),

      // 3. Contact sources (from referrer in analytics, grouped by domain)
      AnalyticsEvent.aggregate([
        { $match: { $and: [{ referrer: { $ne: null } }, { referrer: { $ne: "" } }] } },
        {
          $project: {
            referrer: 1,
          },
        },
        {
          $addFields: {
            domain: {
              $let: {
                vars: {
                  parts: { $split: ["$referrer", "/"] },
                },
                in: { $arrayElemAt: ["$$parts", 2] },
              },
            },
          },
        },
        {
          $addFields: {
            cleanDomain: {
              $replaceAll: { input: "$domain", find: "www.", replacement: "" },
            },
          },
        },
        {
          $group: {
            _id: "$cleanDomain",
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 10 },
        {
          $project: {
            _id: 0,
            source: "$_id",
            count: 1,
          },
        },
      ]),

      // 4. Project categories (aggregation)
      Project.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        {
          $project: {
            _id: 0,
            name: "$_id",
            count: 1,
          },
        },
      ]),

      // 5. Tech usage (flatten all technologies from projects)
      Project.aggregate([
        { $unwind: "$technologies" },
        {
          $group: {
            _id: { $toLower: "$technologies" },
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 15 },
        {
          $project: {
            _id: 0,
            name: "$_id",
            count: 1,
          },
        },
      ]),

      // 6. Device breakdown (all-time)
      AnalyticsEvent.aggregate([
        { $match: { $and: [{ device: { $ne: null } }, { device: { $ne: "" } }] } },
        { $group: { _id: "$device", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
        {
          $project: {
            _id: 0,
            name: "$_id",
            count: 1,
          },
        },
      ]),

      // 7. Browser breakdown (all-time)
      AnalyticsEvent.aggregate([
        { $match: { $and: [{ browser: { $ne: null } }, { browser: { $ne: "" } }] } },
        { $group: { _id: "$browser", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
        {
          $project: {
            _id: 0,
            name: "$_id",
            count: 1,
          },
        },
      ]),

      // 8. Country breakdown (all-time)
      AnalyticsEvent.aggregate([
        { $match: { $and: [{ country: { $ne: null } }, { country: { $ne: "" } }] } },
        { $group: { _id: "$country", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
        {
          $project: {
            _id: 0,
            name: "$_id",
            count: 1,
          },
        },
      ]),

      // 9. Hourly activity (last 30 days)
      AnalyticsEvent.aggregate([
        { $match: { createdAt: { $gte: thirtyDaysAgo } } },
        {
          $group: {
            _id: { $hour: "$createdAt" },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
        {
          $project: {
            _id: 0,
            hour: "$_id",
            count: 1,
          },
        },
      ]),
    ]);

    // GitHub data (with fallback)
    let commitsPerWeek: { week: string; count: number }[] = [];
    let repositories: { name: string; stars: number; forks: number; language: string | null; url: string }[] = [];
    let deployments: { id: string; message: string; repo: string; timestamp: string; url: string }[] = [];

    try {
      const gh = await fetchAllGitHubData();

      // Commits per week (last 12 weeks)
      const weekMap: Record<string, number> = {};
      gh.recentCommits.forEach((c) => {
        const d = new Date(c.timestamp);
        const weekStart = new Date(d);
        weekStart.setDate(d.getDate() - d.getDay());
        const key = weekStart.toISOString().split("T")[0];
        weekMap[key] = (weekMap[key] || 0) + 1;
      });
      commitsPerWeek = Object.entries(weekMap)
        .map(([week, count]) => ({ week, count }))
        .sort((a, b) => a.week.localeCompare(b.week))
        .slice(-12);

      // Repositories
      repositories = gh.repos.slice(0, 20).map((r) => ({
        name: r.name,
        stars: r.stars,
        forks: r.forks,
        language: r.language,
        url: r.url,
      }));

      // Deployments (recent commits as deployment proxy)
      deployments = gh.recentCommits.slice(0, 10).map((c) => ({
        id: c.hash,
        message: c.message.length > 80 ? c.message.slice(0, 80) + "..." : c.message,
        repo: c.repo,
        timestamp: c.timestamp,
        url: c.url,
      }));
    } catch {
      // GitHub unavailable
    }

    // Fill missing dates for visitorsOverTime (last 30 days)
    const filledVisitors: { date: string; visitors: number; pageViews: number; projectViews: number }[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = d.toISOString().split("T")[0];
      const existing = visitorsOverTime.find((v: any) => v.date === dateStr);
      filledVisitors.push({
        date: dateStr,
        visitors: existing?.visitors || 0,
        pageViews: existing?.pageViews || 0,
        projectViews: existing?.projectViews || 0,
      });
    }

    // Fill missing dates for messagesOverTime (last 30 days)
    const filledMessages: { date: string; count: number }[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = d.toISOString().split("T")[0];
      const existing = messagesOverTime.find((m: any) => m.date === dateStr);
      filledMessages.push({
        date: dateStr,
        count: existing?.count || 0,
      });
    }

    // Fill hourly activity (24 hours)
    const filledHourly: { hour: number; count: number }[] = [];
    for (let h = 0; h < 24; h++) {
      const existing = hourlyActivity.find((a: any) => a.hour === h);
      filledHourly.push({ hour: h, count: existing?.count || 0 });
    }

    // Calculate percentages for breakdowns
    const totalDeviceEvents = deviceBreakdown.reduce((s: number, d: any) => s + d.count, 0);
    const totalBrowserEvents = browserBreakdown.reduce((s: number, d: any) => s + d.count, 0);
    const totalCountryEvents = countryBreakdown.reduce((s: number, d: any) => s + d.count, 0);
    const totalReferralEvents = contactSources.reduce((s: number, d: any) => s + d.count, 0);

    return NextResponse.json({
      visitorsOverTime: filledVisitors,
      messagesOverTime: filledMessages,
      commitsPerWeek,
      deployments,
      repositories,
      projectCategories,
      techUsage,
      contactSources: contactSources.map((s: any) => ({
        source: s.source || "Direct",
        count: s.count,
        percentage: totalReferralEvents > 0 ? Math.round((s.count / totalReferralEvents) * 100) : 0,
      })),
      deviceBreakdown: deviceBreakdown.map((d: any) => ({
        name: d.name,
        count: d.count,
        percentage: totalDeviceEvents > 0 ? Math.round((d.count / totalDeviceEvents) * 100) : 0,
      })),
      browserBreakdown: browserBreakdown.map((b: any) => ({
        name: b.name,
        count: b.count,
        percentage: totalBrowserEvents > 0 ? Math.round((b.count / totalBrowserEvents) * 100) : 0,
      })),
      countryBreakdown: countryBreakdown.map((c: any) => ({
        name: c.name,
        count: c.count,
        percentage: totalCountryEvents > 0 ? Math.round((c.count / totalCountryEvents) * 100) : 0,
      })),
      hourlyActivity: filledHourly,
    });
  } catch (error) {
    console.error("Charts API error:", error);
    return NextResponse.json({ error: "Failed to fetch chart data" }, { status: 500 });
  }
}

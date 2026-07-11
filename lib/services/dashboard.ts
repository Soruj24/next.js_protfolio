import { connectDB } from "@/config/db";
import { Project } from "@/models/Project";
import { Contact } from "@/models/Contact";
import { SkillCategory } from "@/models/Skill";
import { Blog } from "@/models/Blog";
import { Activity } from "@/models/Activity";
import { AnalyticsEvent } from "@/models/AnalyticsEvent";
import { fetchAllGitHubData, type GitHubDataResult } from "@/lib/github/service";

// ── Interfaces ─────────────────────────────────────────────────

export interface ProjectStats {
  total: number;
  featured: number;
  byCategory: { name: string; count: number }[];
  totalViews: number;
  totalLikes: number;
  avgPerformance: { accessibility: number; bestPractices: number; seo: number; interactivity: number };
}

export interface SkillStats {
  totalCategories: number;
  totalSkills: number;
  topSkills: { name: string; level: number }[];
}

export interface BlogStats {
  total: number;
  published: number;
  totalViews: number;
  totalReadTime: number;
  recentBlogs: { title: string; slug: string; views: number; readTime: number; publishedAt: string | null }[];
}

export interface ContactStats {
  total: number;
  unread: number;
  byStatus: { status: string; count: number }[];
  recentMessages: any[];
}

export interface AnalyticsStats {
  visitors: number;
  sessions: number;
  pageViews: number;
  projectViews: number;
  resumeDownloads: number;
  contactSubmissions: number;
  githubClicks: number;
  conversionRate: number;
  topCountry: string;
  topDevice: string;
  topBrowser: string;
  liveVisitors: number;
}

export interface ActivityStats {
  total: number;
  unread: number;
  byType: { type: string; count: number }[];
  recentActivities: any[];
}

export interface GitHubStats {
  repos: number;
  stars: number;
  forks: number;
  followers: number;
  recentCommits: { hash: string; message: string; repo: string; timestamp: string; url: string }[];
}

export interface PerformanceScores {
  accessibility: number;
  bestPractices: number;
  seo: number;
  interactivity: number;
}

export interface DashboardData {
  projects: ProjectStats;
  skills: SkillStats;
  blogs: BlogStats;
  contacts: ContactStats;
  analytics: AnalyticsStats;
  activities: ActivityStats;
  github: GitHubStats;
  performance: PerformanceScores;
  systemStatus: "online" | "degraded" | "offline";
  lastUpdated: string;
}

// ── Helpers ────────────────────────────────────────────────────

function safeNum(val: unknown, fallback = 0): number {
  return typeof val === "number" && !isNaN(val) ? val : fallback;
}

// ── Main ───────────────────────────────────────────────────────

export async function getDashboardData(): Promise<DashboardData> {
  const conn = await connectDB();

  if (!conn) {
    return {
      projects: { total: 0, featured: 0, byCategory: [], totalViews: 0, totalLikes: 0, avgPerformance: { accessibility: 0, bestPractices: 0, seo: 0, interactivity: 0 } },
      skills: { totalCategories: 0, totalSkills: 0, topSkills: [] },
      blogs: { total: 0, published: 0, totalViews: 0, totalReadTime: 0, recentBlogs: [] },
      contacts: { total: 0, unread: 0, byStatus: [], recentMessages: [] },
      analytics: { visitors: 0, sessions: 0, pageViews: 0, projectViews: 0, resumeDownloads: 0, contactSubmissions: 0, githubClicks: 0, conversionRate: 0, topCountry: "N/A", topDevice: "N/A", topBrowser: "N/A", liveVisitors: 0 },
      activities: { total: 0, unread: 0, byType: [], recentActivities: [] },
      github: { repos: 0, stars: 0, forks: 0, followers: 0, recentCommits: [] },
      performance: { accessibility: 0, bestPractices: 0, seo: 0, interactivity: 0 },
      systemStatus: "offline",
      lastUpdated: new Date().toISOString(),
    };
  }

  try {
    const [
      projectAgg,
      featuredCount,
      skillCategories,
      blogAgg,
      contactAgg,
      recentContacts,
      analyticsAgg,
      realtimeEvents,
      activityAgg,
      recentActivities,
      activityTypeAgg,
      unreadActivities,
      recentProjects,
    ] = await Promise.all([
      // 1. Project aggregation
      Project.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            totalViews: { $sum: { $ifNull: ["$stats.views", 0] } },
            totalLikes: { $sum: { $ifNull: ["$stats.likes", 0] } },
            avgAccessibility: { $avg: { $ifNull: ["$performance.accessibility", 0] } },
            avgBestPractices: { $avg: { $ifNull: ["$performance.bestPractices", 0] } },
            avgSeo: { $avg: { $ifNull: ["$performance.seo", 0] } },
            avgInteractivity: { $avg: { $ifNull: ["$performance.interactivity", 0] } },
          },
        },
      ]),

      // 2. Featured project count
      Project.countDocuments({ featured: true }),

      // 3. Skill categories + total skills
      SkillCategory.aggregate([
        {
          $group: {
            _id: null,
            totalCategories: { $sum: 1 },
            totalSkills: { $sum: { $size: { $ifNull: ["$skills", []] } } },
          },
        },
        {
          $lookup: {
            from: "skill_categories",
            pipeline: [
              { $unwind: "$skills" },
              { $sort: { "skills.level": -1 } },
              { $limit: 5 },
              { $project: { _id: 0, name: "$skills.name", level: "$skills.level" } },
            ],
            as: "topSkills",
          },
        },
      ]),

      // 4. Blog aggregation
      Blog.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            published: { $sum: { $cond: ["$published", 1, 0] } },
            totalViews: { $sum: { $ifNull: ["$views", 0] } },
            totalReadTime: { $sum: { $ifNull: ["$readTime", 0] } },
          },
        },
      ]),

      // 5. Contact aggregation
      Contact.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]),

      // 6. Recent contacts
      Contact.find().sort({ createdAt: -1 }).limit(5).lean(),

      // 7. Analytics aggregation (last 30 days)
      (() => {
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        return AnalyticsEvent.aggregate([
          { $match: { createdAt: { $gte: thirtyDaysAgo } } },
          {
            $group: {
              _id: null,
              totalEvents: { $sum: 1 },
              pageViews: { $sum: { $cond: [{ $eq: ["$event", "page_view"] }, 1, 0] } },
              projectViews: { $sum: { $cond: [{ $eq: ["$event", "project_view"] }, 1, 0] } },
              resumeDownloads: { $sum: { $cond: [{ $eq: ["$event", "resume_download"] }, 1, 0] } },
              contactSubmissions: { $sum: { $cond: [{ $eq: ["$event", "contact_submit"] }, 1, 0] } },
              githubClicks: { $sum: { $cond: [{ $eq: ["$event", "github_click"] }, 1, 0] } },
              uniqueAgents: { $addToSet: { $cond: [{ $ne: ["$userAgent", null] }, "$userAgent", "$$REMOVE"] } },
            },
          },
          {
            $project: {
              _id: 0,
              totalEvents: 1,
              pageViews: 1,
              projectViews: 1,
              resumeDownloads: 1,
              contactSubmissions: 1,
              githubClicks: 1,
              visitors: { $size: "$uniqueAgents" },
            },
          },
        ]);
      })(),

      // 8. Realtime events (last 5 minutes)
      (() => {
        const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000);
        return AnalyticsEvent.find({ createdAt: { $gte: fiveMinAgo } })
          .select("userAgent device browser country")
          .lean();
      })(),

      // 9. Activity aggregation
      Activity.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            unread: { $sum: { $cond: ["$read", 0, 1] } },
          },
        },
      ]),

      // 10. Recent activities
      Activity.find().sort({ createdAt: -1 }).limit(8).lean(),

      // 11. Activity type breakdown
      Activity.aggregate([
        { $group: { _id: "$type", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),

      // 12. Unread activity count
      Activity.countDocuments({ read: false }),

      // 13. Recent projects for reference
      Project.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("title category status createdAt")
        .lean(),
    ]);

    // ── Process results ──

    const projectData = (projectAgg as any[])[0] || {};
    const skillData = (skillCategories as any[])[0] || {};
    const blogData = (blogAgg as any[])[0] || {};
    const analyticsData = (analyticsAgg as any[])[0] || {};
    const activityData = (activityAgg as any[])[0] || {};

    // Contact stats
    const byStatus = (contactAgg as any[]).map((c) => ({ status: c._id, count: c.count }));
    const totalContacts = byStatus.reduce((sum, s) => sum + s.count, 0);
    const unreadContacts = byStatus.find((s) => s.status === "pending")?.count || 0;

    // Analytics
    const sessions = analyticsData.visitors > 0
      ? Math.ceil(analyticsData.pageViews / Math.max(analyticsData.visitors, 1))
      : 0;
    const conversionRate = analyticsData.pageViews > 0
      ? parseFloat(((analyticsData.contactSubmissions / analyticsData.pageViews) * 100).toFixed(1))
      : 0;

    // Realtime
    const rtAgents = new Set((realtimeEvents as any[]).map((e) => e.userAgent).filter(Boolean));
    const deviceCounts: Record<string, number> = {};
    const browserCounts: Record<string, number> = {};
    const countryCounts: Record<string, number> = {};
    (realtimeEvents as any[]).forEach((e) => {
      if (e.device) deviceCounts[e.device] = (deviceCounts[e.device] || 0) + 1;
      if (e.browser) browserCounts[e.browser] = (browserCounts[e.browser] || 0) + 1;
      if (e.country) countryCounts[e.country] = (countryCounts[e.country] || 0) + 1;
    });

    // GitHub (with fallback)
    let githubStats: GitHubStats = { repos: 0, stars: 0, forks: 0, followers: 0, recentCommits: [] };
    try {
      const gh = await fetchAllGitHubData();
      githubStats = {
        repos: gh.profile.publicRepos,
        stars: gh.profile.stars,
        forks: gh.profile.forks,
        followers: gh.profile.followers,
        recentCommits: gh.recentCommits.map((c) => ({
          hash: c.hash,
          message: c.message,
          repo: c.repo,
          timestamp: c.timestamp,
          url: c.url,
        })),
      };
    } catch {
      // GitHub unavailable — use defaults
    }

    // Performance scores from project averages (0-100)
    const perfScores: PerformanceScores = {
      accessibility: Math.round(safeNum(projectData.avgAccessibility, 88)),
      bestPractices: Math.round(safeNum(projectData.avgBestPractices, 92)),
      seo: Math.round(safeNum(projectData.avgSeo, 90)),
      interactivity: Math.round(safeNum(projectData.avgInteractivity, 85)),
    };

    // Project by category
    const categoryAgg = await Project.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    const byCategory = (categoryAgg as any[]).map((c) => ({ name: c._id, count: c.count }));

    // Top country from all-time analytics
    const topCountryAgg = await AnalyticsEvent.aggregate([
      { $match: { $and: [{ country: { $ne: null } }, { country: { $ne: "" } }] } },
      { $group: { _id: "$country", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);
    const topCountry = (topCountryAgg as any[])[0]?._id || "N/A";

    return {
      projects: {
        total: safeNum(projectData.total),
        featured: safeNum(featuredCount),
        byCategory,
        totalViews: safeNum(projectData.totalViews),
        totalLikes: safeNum(projectData.totalLikes),
        avgPerformance: perfScores,
      },
      skills: {
        totalCategories: safeNum(skillData.totalCategories),
        totalSkills: safeNum(skillData.totalSkills),
        topSkills: skillData.topSkills || [],
      },
      blogs: {
        total: safeNum(blogData.total),
        published: safeNum(blogData.published),
        totalViews: safeNum(blogData.totalViews),
        totalReadTime: safeNum(blogData.totalReadTime),
        recentBlogs: (await Blog.find({ published: true }).sort({ publishedAt: -1 }).limit(5)
          .select("title slug views readTime publishedAt")
          .lean()) as any[],
      },
      contacts: {
        total: totalContacts,
        unread: unreadContacts,
        byStatus,
        recentMessages: JSON.parse(JSON.stringify(recentContacts)),
      },
      analytics: {
        visitors: safeNum(analyticsData.visitors),
        sessions,
        pageViews: safeNum(analyticsData.pageViews),
        projectViews: safeNum(analyticsData.projectViews),
        resumeDownloads: safeNum(analyticsData.resumeDownloads),
        contactSubmissions: safeNum(analyticsData.contactSubmissions),
        githubClicks: safeNum(analyticsData.githubClicks),
        conversionRate,
        topCountry,
        topDevice: Object.entries(deviceCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A",
        topBrowser: Object.entries(browserCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A",
        liveVisitors: rtAgents.size,
      },
      activities: {
        total: safeNum(activityData.total),
        unread: safeNum(unreadActivities),
        byType: (activityTypeAgg as any[]).map((a) => ({ type: a._id, count: a.count })),
        recentActivities: JSON.parse(JSON.stringify(recentActivities)),
      },
      github: githubStats,
      performance: perfScores,
      systemStatus: "online",
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    return {
      projects: { total: 0, featured: 0, byCategory: [], totalViews: 0, totalLikes: 0, avgPerformance: { accessibility: 0, bestPractices: 0, seo: 0, interactivity: 0 } },
      skills: { totalCategories: 0, totalSkills: 0, topSkills: [] },
      blogs: { total: 0, published: 0, totalViews: 0, totalReadTime: 0, recentBlogs: [] },
      contacts: { total: 0, unread: 0, byStatus: [], recentMessages: [] },
      analytics: { visitors: 0, sessions: 0, pageViews: 0, projectViews: 0, resumeDownloads: 0, contactSubmissions: 0, githubClicks: 0, conversionRate: 0, topCountry: "N/A", topDevice: "N/A", topBrowser: "N/A", liveVisitors: 0 },
      activities: { total: 0, unread: 0, byType: [], recentActivities: [] },
      github: { repos: 0, stars: 0, forks: 0, followers: 0, recentCommits: [] },
      performance: { accessibility: 0, bestPractices: 0, seo: 0, interactivity: 0 },
      systemStatus: "degraded",
      lastUpdated: new Date().toISOString(),
    };
  }
}

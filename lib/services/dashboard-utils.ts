import { fetchAllGitHubData } from "@/lib/github/service";
import type { GitHubStats, PerformanceScores, DashboardData } from "@/types/dashboard";

export function safeNum(val: unknown, fallback = 0): number {
  return typeof val === "number" && !isNaN(val) ? val : fallback;
}

export function createEmptyDashboardData(systemStatus: "offline" | "degraded" = "offline"): DashboardData {
  return {
    projects: { total: 0, featured: 0, byCategory: [], totalViews: 0, totalLikes: 0, avgPerformance: { accessibility: 0, bestPractices: 0, seo: 0, interactivity: 0 } },
    skills: { totalCategories: 0, totalSkills: 0, topSkills: [] },
    blogs: { total: 0, published: 0, totalViews: 0, totalReadTime: 0, recentBlogs: [] },
    contacts: { total: 0, unread: 0, byStatus: [], recentMessages: [] },
    analytics: { visitors: 0, sessions: 0, pageViews: 0, projectViews: 0, resumeDownloads: 0, contactSubmissions: 0, githubClicks: 0, conversionRate: 0, topCountry: "N/A", topDevice: "N/A", topBrowser: "N/A", liveVisitors: 0 },
    activities: { total: 0, unread: 0, byType: [], recentActivities: [] },
    github: { repos: 0, stars: 0, forks: 0, followers: 0, recentCommits: [] },
    performance: { accessibility: 0, bestPractices: 0, seo: 0, interactivity: 0 },
    systemStatus,
    lastUpdated: new Date().toISOString(),
  };
}

interface ProjectAggResult {
  total?: number;
  totalViews?: number;
  totalLikes?: number;
  avgAccessibility?: number;
  avgBestPractices?: number;
  avgSeo?: number;
  avgInteractivity?: number;
}

export function processProjectData(projectAgg: ProjectAggResult[], featuredCount: number) {
  const data = projectAgg[0] || {};
  const perfScores: PerformanceScores = {
    accessibility: Math.round(safeNum(data.avgAccessibility, 88)),
    bestPractices: Math.round(safeNum(data.avgBestPractices, 92)),
    seo: Math.round(safeNum(data.avgSeo, 90)),
    interactivity: Math.round(safeNum(data.avgInteractivity, 85)),
  };
  return { perfScores, total: safeNum(data.total), featured: safeNum(featuredCount), totalViews: safeNum(data.totalViews), totalLikes: safeNum(data.totalLikes) };
}

interface ContactAggItem { _id: string; count: number }

export function processContactStats(contactAgg: ContactAggItem[]) {
  const byStatus = contactAgg.map((c) => ({ status: c._id, count: c.count }));
  const total = byStatus.reduce((sum, s) => sum + s.count, 0);
  const unread = byStatus.find((s) => s.status === "pending")?.count || 0;
  return { byStatus, total, unread };
}

interface SkillAggResult { totalCategories?: number; totalSkills?: number; topSkills?: { name: string; level: number }[] }

export function processSkillData(skillAgg: SkillAggResult[]) {
  const data = skillAgg[0] || {};
  return { totalCategories: safeNum(data.totalCategories), totalSkills: safeNum(data.totalSkills), topSkills: data.topSkills || [] };
}

interface BlogAggResult { total?: number; published?: number; totalViews?: number; totalReadTime?: number }

export function processBlogData(blogAgg: BlogAggResult[]) {
  const data = blogAgg[0] || {};
  return { total: safeNum(data.total), published: safeNum(data.published), totalViews: safeNum(data.totalViews), totalReadTime: safeNum(data.totalReadTime) };
}

interface AnalyticsAggResult { visitors?: number; pageViews?: number; projectViews?: number; resumeDownloads?: number; contactSubmissions?: number; githubClicks?: number }

export function processAnalyticsData(analyticsAgg: AnalyticsAggResult[]) {
  const data = analyticsAgg[0] || {};
  const visitors = safeNum(data.visitors);
  const pageViews = safeNum(data.pageViews);
  const sessions = visitors > 0 ? Math.ceil(pageViews / Math.max(visitors, 1)) : 0;
  const conversionRate = pageViews > 0 ? parseFloat(((safeNum(data.contactSubmissions) / pageViews) * 100).toFixed(1)) : 0;
  return { visitors, sessions, pageViews, projectViews: safeNum(data.projectViews), resumeDownloads: safeNum(data.resumeDownloads), contactSubmissions: safeNum(data.contactSubmissions), githubClicks: safeNum(data.githubClicks), conversionRate };
}

interface RealtimeEvent { userAgent?: string; device?: string; browser?: string; country?: string }

export function processRealtimeData(realtimeEvents: RealtimeEvent[]) {
  const rtAgents = new Set(realtimeEvents.map((e) => e.userAgent).filter(Boolean));
  const deviceCounts: Record<string, number> = {};
  const browserCounts: Record<string, number> = {};
  const countryCounts: Record<string, number> = {};
  realtimeEvents.forEach((e) => {
    if (e.device) deviceCounts[e.device] = (deviceCounts[e.device] || 0) + 1;
    if (e.browser) browserCounts[e.browser] = (browserCounts[e.browser] || 0) + 1;
    if (e.country) countryCounts[e.country] = (countryCounts[e.country] || 0) + 1;
  });
  return { rtAgents, deviceCounts, browserCounts, countryCounts };
}

export function getTopFromCounts(counts: Record<string, number>): string {
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";
}

export async function fetchGitHubStats(): Promise<GitHubStats> {
  try {
    const gh = await fetchAllGitHubData();
    return {
      repos: gh.profile.publicRepos,
      stars: gh.profile.stars,
      forks: gh.profile.forks,
      followers: gh.profile.followers,
      recentCommits: gh.recentCommits.map((c) => ({
        hash: c.hash, message: c.message, repo: c.repo, timestamp: c.timestamp, url: c.url,
      })),
    };
  } catch {
    return { repos: 0, stars: 0, forks: 0, followers: 0, recentCommits: [] };
  }
}

interface ActivityAggResult { total?: number; unread?: number }

export function processActivityData(activityAgg: ActivityAggResult[]) {
  const data = activityAgg[0] || {};
  return { total: safeNum(data.total), unread: safeNum(data.unread) };
}

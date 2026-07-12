import { connectDB } from "@/config/db";
import {
  getProjectAggregation, getFeaturedCount, getSkillAggregation,
  getBlogAggregation, getContactAggregation, getRecentContacts,
  getAnalyticsAggregation, getRealtimeEvents, getActivityAggregation,
  getRecentActivities, getActivityTypeBreakdown, getUnreadActivityCount,
  getRecentProjects, getCategoryBreakdown, getTopCountry, getRecentBlogs,
} from "@/lib/services/dashboard-queries";
import {
  safeNum, createEmptyDashboardData, processProjectData,
  processContactStats, processSkillData, processBlogData,
  processAnalyticsData, processRealtimeData, getTopFromCounts,
  fetchGitHubStats, processActivityData,
} from "@/lib/services/dashboard-utils";
import type { ByCategoryItem, DashboardData } from "@/types/dashboard";
export type {
  ProjectStats, SkillStats, BlogStats, ContactStats,
  AnalyticsStats, ActivityStats, GitHubStats, PerformanceScores,
  DashboardData,
} from "@/types/dashboard";

export async function getDashboardData(): Promise<DashboardData> {
  const conn = await connectDB();

  if (!conn) {
    return createEmptyDashboardData("offline");
  }

  try {
    const [
      projectAgg, featuredCount, skillCategories, blogAgg,
      contactAgg, recentContacts, analyticsAgg, realtimeEvents,
      activityAgg, recentActivities, activityTypeAgg, unreadActivities,
      recentProjects,
    ] = await Promise.all([
      getProjectAggregation(),
      getFeaturedCount(),
      getSkillAggregation(),
      getBlogAggregation(),
      getContactAggregation(),
      getRecentContacts(),
      getAnalyticsAggregation(),
      getRealtimeEvents(),
      getActivityAggregation(),
      getRecentActivities(),
      getActivityTypeBreakdown(),
      getUnreadActivityCount(),
      getRecentProjects(),
    ]);

    const categoryAgg = await getCategoryBreakdown();
    const topCountryResult = await getTopCountry();

    const { perfScores, total, featured, totalViews, totalLikes } = processProjectData(projectAgg as any, featuredCount);
    const contactStats = processContactStats(contactAgg as any);
    const skillData = processSkillData(skillCategories as any);
    const blogData = processBlogData(blogAgg as any);
    const analyticsData = processAnalyticsData(analyticsAgg as any);
    const { rtAgents, deviceCounts, browserCounts, countryCounts } = processRealtimeData(realtimeEvents as any);
    const { total: activityTotal, unread: activityUnread } = processActivityData(activityAgg as any);
    const githubStats = await fetchGitHubStats();
    const topCountry = (topCountryResult as any[])[0]?._id || "N/A";

    const byCategory: ByCategoryItem[] = (categoryAgg as any[]).map((c: any) => ({ name: c._id, count: c.count }));
    const recentBlogs = await getRecentBlogs();

    return {
      projects: {
        total, featured, byCategory,
        totalViews, totalLikes, avgPerformance: perfScores,
      },
      skills: skillData,
      blogs: {
        ...blogData,
        recentBlogs: JSON.parse(JSON.stringify(recentBlogs)),
      },
      contacts: {
        ...contactStats,
        recentMessages: JSON.parse(JSON.stringify(recentContacts)),
      },
      analytics: {
        ...analyticsData,
        topCountry,
        topDevice: getTopFromCounts(deviceCounts),
        topBrowser: getTopFromCounts(browserCounts),
        liveVisitors: rtAgents.size,
      },
      activities: {
        total: activityTotal,
        unread: activityUnread,
        byType: (activityTypeAgg as any[]).map((a: any) => ({ type: a._id, count: a.count })),
        recentActivities: JSON.parse(JSON.stringify(recentActivities)),
      },
      github: githubStats,
      performance: perfScores,
      systemStatus: "online",
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    return createEmptyDashboardData("degraded");
  }
}

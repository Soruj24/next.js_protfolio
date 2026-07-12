import { Project } from "@/models/Project";
import { Contact } from "@/models/Contact";
import { SkillCategory } from "@/models/Skill";
import { Blog } from "@/models/Blog";
import { Activity } from "@/models/Activity";
import { AnalyticsEvent } from "@/models/AnalyticsEvent";

export function getProjectAggregation() {
  return Project.aggregate([
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
  ]);
}

export function getFeaturedCount() {
  return Project.countDocuments({ featured: true });
}

export function getSkillAggregation() {
  return SkillCategory.aggregate([
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
  ]);
}

export function getBlogAggregation() {
  return Blog.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        published: { $sum: { $cond: ["$published", 1, 0] } },
        totalViews: { $sum: { $ifNull: ["$views", 0] } },
        totalReadTime: { $sum: { $ifNull: ["$readTime", 0] } },
      },
    },
  ]);
}

export function getContactAggregation() {
  return Contact.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
}

export function getRecentContacts() {
  return Contact.find().sort({ createdAt: -1 }).limit(5).lean();
}

export function getAnalyticsAggregation() {
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
}

export function getRealtimeEvents() {
  const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000);
  return AnalyticsEvent.find({ createdAt: { $gte: fiveMinAgo } })
    .select("userAgent device browser country")
    .lean();
}

export function getActivityAggregation() {
  return Activity.aggregate([
    { $group: { _id: null, total: { $sum: 1 }, unread: { $sum: { $cond: ["$read", 0, 1] } } } },
  ]);
}

export function getRecentActivities() {
  return Activity.find().sort({ createdAt: -1 }).limit(8).lean();
}

export function getActivityTypeBreakdown() {
  return Activity.aggregate([
    { $group: { _id: "$type", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);
}

export function getUnreadActivityCount() {
  return Activity.countDocuments({ read: false });
}

export function getRecentProjects() {
  return Project.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select("title category status createdAt")
    .lean();
}

export function getCategoryBreakdown() {
  return Project.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);
}

export function getTopCountry() {
  return AnalyticsEvent.aggregate([
    { $match: { $and: [{ country: { $ne: null } }, { country: { $ne: "" } }] } },
    { $group: { _id: "$country", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 1 },
  ]);
}

export function getRecentBlogs() {
  return Blog.find({ published: true })
    .sort({ publishedAt: -1 })
    .limit(5)
    .select("title slug views readTime publishedAt")
    .lean();
}

export interface ByCategoryItem {
  name: string;
  count: number;
}

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
  recentMessages: Record<string, unknown>[];
}

export interface AnalyticsStats {
  visitors: number;
  sessions: number;
  pageViews: number;
  projectViews: number;
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
  recentActivities: Record<string, unknown>[];
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

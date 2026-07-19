export interface AnalyticsData {
  period: string;
  overview: {
    visitors: number;
    sessions: number;
    pageViews: number;
    projectViews: number;
    contactSubmissions: number;
    githubClicks: number;
    conversionRate: number;
  };
  realtime: {
    liveVisitors: number;
    activePages: Array<{ page: string; visitors: number }>;
  };
  devices: Array<{ name: string; count: number; percentage: number }>;
  browsers: Array<{ name: string; count: number; percentage: number }>;
  countries: Array<{ name: string; code: string; count: number; percentage: number }>;
  referralSources: Array<{ source: string; count: number; percentage: number }>;
  topProjects: Array<{ title: string; category: string; views: number; likes: number }>;
  weekly: Array<{ day: string; visitors: number }>;
  hourly: Array<{ hour: string; visitors: number }>;
}

export interface ChartsData {
  visitorsOverTime: { date: string; visitors: number; pageViews: number; projectViews: number }[];
  messagesOverTime: { date: string; count: number }[];
  commitsPerWeek: { week: string; count: number }[];
  deployments: { id: string; message: string; repo: string; timestamp: string; url: string }[];
  repositories: { name: string; stars: number; forks: number; language: string | null; url: string }[];
  projectCategories: { name: string; count: number }[];
  techUsage: { name: string; count: number }[];
  contactSources: { source: string; count: number; percentage: number }[];
  deviceBreakdown: { name: string; count: number; percentage: number }[];
  browserBreakdown: { name: string; count: number; percentage: number }[];
  countryBreakdown: { name: string; count: number; percentage: number }[];
  hourlyActivity: { hour: number; count: number }[];
}

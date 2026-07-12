export interface ChartsData {
  visitorsOverTime: { date: string; visitors: number; pageViews: number; projectViews: number }[];
  messagesOverTime: { date: string; count: number }[];
  commitsPerWeek: { week: string; count: number }[];
  deployments: { id: string; message: string; repo: string; timestamp: string; url: string }[];
  repositories: { name: string; stars: number; forks: number; language: string | null; url: string }[];
  projectCategories: { name: string; count: number }[];
  techUsage: { name: string; count: number }[];
  contactSources: { source: string; count: number; percentage?: number }[];
  deviceBreakdown: { name: string; count: number; percentage?: number }[];
  browserBreakdown: { name: string; count: number; percentage?: number }[];
  countryBreakdown: { name: string; count: number; percentage?: number }[];
  hourlyActivity: { hour: number; count: number }[];
}

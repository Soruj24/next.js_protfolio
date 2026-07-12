export interface VisitorDataPoint {
  date: string;
  visitors: number;
  pageViews: number;
  projectViews: number;
}

export interface MessageDataPoint {
  date: string;
  count: number;
}

export interface WeeklyCommit {
  week: string;
  count: number;
}

export interface RepoInfo {
  name: string;
  stars: number;
  forks: number;
  language: string | null;
  url: string;
}

export interface DeploymentInfo {
  id: string;
  message: string;
  repo: string;
  timestamp: string;
  url: string;
}

export interface NamedCount {
  name: string;
  count: number;
}

export interface BreakdownItem extends NamedCount {
  percentage: number;
}

export interface HourlyActivity {
  hour: number;
  count: number;
}

export interface ChartsData {
  visitorsOverTime: VisitorDataPoint[];
  messagesOverTime: MessageDataPoint[];
  commitsPerWeek: WeeklyCommit[];
  deployments: DeploymentInfo[];
  repositories: RepoInfo[];
  projectCategories: NamedCount[];
  techUsage: NamedCount[];
  contactSources: BreakdownItem[];
  deviceBreakdown: BreakdownItem[];
  browserBreakdown: BreakdownItem[];
  countryBreakdown: BreakdownItem[];
  hourlyActivity: HourlyActivity[];
}

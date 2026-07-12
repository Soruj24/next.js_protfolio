import { fetchAllGitHubData } from "@/lib/github/service";
import type {
  VisitorDataPoint,
  MessageDataPoint,
  HourlyActivity,
  WeeklyCommit,
  RepoInfo,
  DeploymentInfo,
} from "@/lib/services/charts-types";

export function fillVisitorsOverTime(
  raw: { date: string; visitors: number; pageViews: number; projectViews: number }[],
): VisitorDataPoint[] {
  const now = new Date();
  const result: VisitorDataPoint[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = d.toISOString().split("T")[0];
    const existing = raw.find((v) => v.date === dateStr);
    result.push({
      date: dateStr,
      visitors: existing?.visitors ?? 0,
      pageViews: existing?.pageViews ?? 0,
      projectViews: existing?.projectViews ?? 0,
    });
  }
  return result;
}

export function fillMessagesOverTime(
  raw: { date: string; count: number }[],
): MessageDataPoint[] {
  const now = new Date();
  const result: MessageDataPoint[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = d.toISOString().split("T")[0];
    const existing = raw.find((m) => m.date === dateStr);
    result.push({ date: dateStr, count: existing?.count ?? 0 });
  }
  return result;
}

export function fillHourlyActivity(
  raw: { hour: number; count: number }[],
): HourlyActivity[] {
  const result: HourlyActivity[] = [];
  for (let h = 0; h < 24; h++) {
    const existing = raw.find((a) => a.hour === h);
    result.push({ hour: h, count: existing?.count ?? 0 });
  }
  return result;
}

export function computePercentages<T extends { count: number }>(
  items: T[],
): (T & { percentage: number })[] {
  const total = items.reduce((s, d) => s + d.count, 0);
  return items.map((item) => ({
    ...item,
    percentage: total > 0 ? Math.round((item.count / total) * 100) : 0,
  }));
}

export async function processGitHubData(): Promise<{
  commitsPerWeek: WeeklyCommit[];
  repositories: RepoInfo[];
  deployments: DeploymentInfo[];
}> {
  try {
    const gh = await fetchAllGitHubData();

    const weekMap: Record<string, number> = {};
    gh.recentCommits.forEach((c) => {
      const d = new Date(c.timestamp);
      const weekStart = new Date(d);
      weekStart.setDate(d.getDate() - d.getDay());
      const key = weekStart.toISOString().split("T")[0];
      weekMap[key] = (weekMap[key] || 0) + 1;
    });

    const commitsPerWeek: WeeklyCommit[] = Object.entries(weekMap)
      .map(([week, count]) => ({ week, count }))
      .sort((a, b) => a.week.localeCompare(b.week))
      .slice(-12);

    const repositories: RepoInfo[] = gh.repos.slice(0, 20).map((r) => ({
      name: r.name,
      stars: r.stars,
      forks: r.forks,
      language: r.language,
      url: r.url,
    }));

    const deployments: DeploymentInfo[] = gh.recentCommits.slice(0, 10).map((c) => ({
      id: c.hash,
      message: c.message.length > 80 ? c.message.slice(0, 80) + "..." : c.message,
      repo: c.repo,
      timestamp: c.timestamp,
      url: c.url,
    }));

    return { commitsPerWeek, repositories, deployments };
  } catch {
    return { commitsPerWeek: [], repositories: [], deployments: [] };
  }
}

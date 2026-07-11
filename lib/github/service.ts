const GITHUB_USERNAME = "Soruj24";
const GITHUB_API = "https://api.github.com";

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
}

interface GitHubRepo {
  name: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

interface GitHubCommitResponse {
  sha: string;
  commit: {
    message: string;
    author: { name: string; date: string };
  };
  html_url: string;
}

export interface CommitData {
  hash: string;
  message: string;
  branch: string;
  repo: string;
  timestamp: string;
  timeAgo: string;
  url: string;
}

export interface ProfileStats {
  publicRepos: number;
  followers: number;
  following: number;
  stars: number;
  forks: number;
}

export interface GitHubDataResult {
  stats: ProfileStats;
  recentCommits: CommitData[];
}

const cache: { data: GitHubDataResult | null; ts: number } = { data: null, ts: 0 };
const CACHE_TTL = 5 * 60 * 1000;

function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

async function ghFetch<T>(path: string): Promise<T | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch(`${GITHUB_API}${path}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
      },
      signal: controller.signal,
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchGitHubData(): Promise<GitHubDataResult> {
  if (cache.data && Date.now() - cache.ts < CACHE_TTL) {
    return cache.data;
  }

  const [user, repos] = await Promise.all([
    ghFetch<GitHubUser>(`/users/${GITHUB_USERNAME}`),
    ghFetch<GitHubRepo[]>(`/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
  ]);

  const stats: ProfileStats = {
    publicRepos: user?.public_repos ?? 0,
    followers: user?.followers ?? 0,
    following: user?.following ?? 0,
    stars: repos?.reduce((sum, r) => sum + r.stargazers_count, 0) ?? 0,
    forks: repos?.reduce((sum, r) => sum + r.forks_count, 0) ?? 0,
  };

  const recentCommits: CommitData[] = [];

  if (repos && repos.length > 0) {
    const sortedRepos = [...repos].sort(
      (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );

    for (const repo of sortedRepos.slice(0, 5)) {
      if (recentCommits.length >= 10) break;

      const commits = await ghFetch<GitHubCommitResponse[]>(
        `/repos/${GITHUB_USERNAME}/${repo.name}/commits?per_page=5`
      );

      if (commits) {
        for (const c of commits.slice(0, 3)) {
          if (recentCommits.length >= 10) break;
          recentCommits.push({
            hash: c.sha.slice(0, 7),
            message: c.commit.message.split("\n")[0],
            branch: "main",
            repo: repo.name,
            timestamp: c.commit.author.date,
            timeAgo: timeAgo(c.commit.author.date),
            url: c.html_url,
          });
        }
      }
    }

    recentCommits.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  const result: GitHubDataResult = { stats, recentCommits: recentCommits.slice(0, 10) };
  cache.data = result;
  cache.ts = Date.now();
  return result;
}

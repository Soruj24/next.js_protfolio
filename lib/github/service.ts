const GITHUB_API = "https://api.github.com";

function getGithubUsername(): string {
  return process.env.GITHUB_USERNAME || "Soruj24";
}

function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

async function ghFetch<T>(path: string): Promise<T | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(`${GITHUB_API}${path}`, {
      headers: getAuthHeaders(),
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

export function timeAgo(dateStr: string): string {
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

function toISODate(d: Date): string {
  return d.toISOString().split("T")[0];
}

// ── Raw API types ──

interface RawUser {
  login: string;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  bio: string | null;
  name: string | null;
  company: string | null;
  location: string | null;
  blog: string | null;
  twitter_username: string | null;
  created_at: string;
}

interface RawRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  archived: boolean;
  fork: boolean;
  default_branch: string;
  license: { spdx_id: string | null } | null;
  owner: { login: string };
}

interface RawCommit {
  sha: string;
  commit: {
    message: string;
    author: { name: string; date: string };
  };
  html_url: string;
  repository?: { name: string };
}

interface RawSearchResult<T> {
  total_count: number;
  items: T[];
}

interface RawIssue {
  id: number;
  number: number;
  title: string;
  state: "open" | "closed";
  html_url: string;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  labels: { name: string; color: string }[];
  user: { login: string } | null;
  pull_request?: unknown;
  repository_url: string;
}

interface RawPullRequest {
  id: number;
  number: number;
  title: string;
  state: "open" | "closed";
  merged: boolean;
  html_url: string;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  merged_at: string | null;
  user: { login: string } | null;
  head: { ref: string; repo: { name: string } | null };
  base: { ref: string };
  url: string;
  repository_url: string;
}

interface RawRelease {
  id: number;
  tag_name: string;
  name: string | null;
  body: string | null;
  html_url: string;
  created_at: string;
  published_at: string | null;
  draft: boolean;
  prerelease: boolean;
  author: { login: string } | null;
}

interface RawContributor {
  login: string;
  avatar_url: string;
  contributions: number;
  html_url: string;
}

interface RawLanguage {
  [lang: string]: number;
}

interface RawEvent {
  type: string;
  created_at: string;
  payload: { size?: number; commits?: unknown[] };
  repo: { name: string };
}

// ── Exported clean types ──

export interface GitHubProfile {
  username: string;
  name: string | null;
  avatar: string;
  bio: string | null;
  company: string | null;
  location: string | null;
  blog: string | null;
  twitter: string | null;
  publicRepos: number;
  followers: number;
  following: number;
  stars: number;
  forks: number;
  joinedAt: string;
}

export interface GitHubRepo {
  name: string;
  fullName: string;
  description: string | null;
  url: string;
  homepage: string | null;
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  language: string | null;
  topics: string[];
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
  archived: boolean;
  fork: boolean;
  defaultBranch: string;
  license: string | null;
}

export interface GitHubCommit {
  hash: string;
  message: string;
  repo: string;
  timestamp: string;
  timeAgo: string;
  url: string;
}

export interface GitHubIssue {
  number: number;
  title: string;
  state: "open" | "closed";
  url: string;
  createdAt: string;
  closedAt: string | null;
  labels: { name: string; color: string }[];
  author: string | null;
  isPullRequest: boolean;
}

export interface GitHubPullRequest {
  number: number;
  title: string;
  state: "open" | "closed";
  merged: boolean;
  url: string;
  createdAt: string;
  mergedAt: string | null;
  closedAt: string | null;
  author: string | null;
  headBranch: string;
  baseBranch: string;
}

export interface GitHubRelease {
  tagName: string;
  name: string | null;
  body: string | null;
  url: string;
  createdAt: string;
  publishedAt: string | null;
  draft: boolean;
  prerelease: boolean;
  author: string | null;
}

export interface GitHubContributor {
  username: string;
  avatar: string;
  contributions: number;
  profileUrl: string;
}

export interface GitHubLanguages {
  [language: string]: number;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubDataResult {
  profile: GitHubProfile;
  repos: GitHubRepo[];
  recentCommits: GitHubCommit[];
  issues: GitHubIssue[];
  pullRequests: GitHubPullRequest[];
  releases: GitHubRelease[];
  contributors: GitHubContributor[];
  languages: GitHubLanguages;
  contributionGraph: ContributionDay[];
}

// ── Cache ──

const cache: { data: GitHubDataResult | null; ts: number } = { data: null, ts: 0 };
const CACHE_TTL = 5 * 60 * 1000;

// ── Fetchers ──

async function fetchProfile(username: string): Promise<GitHubProfile | null> {
  const user = await ghFetch<RawUser>(`/users/${username}`);
  if (!user) return null;

  const repos = await ghFetch<RawRepo[]>(`/users/${username}/repos?per_page=100&sort=updated`);
  const stars = repos?.reduce((sum, r) => sum + r.stargazers_count, 0) ?? 0;
  const forks = repos?.reduce((sum, r) => sum + r.forks_count, 0) ?? 0;

  return {
    username: user.login,
    name: user.name,
    avatar: user.avatar_url,
    bio: user.bio,
    company: user.company,
    location: user.location,
    blog: user.blog,
    twitter: user.twitter_username,
    publicRepos: user.public_repos,
    followers: user.followers,
    following: user.following,
    stars,
    forks,
    joinedAt: user.created_at,
  };
}

async function fetchRepos(username: string): Promise<GitHubRepo[]> {
  const raw = await ghFetch<RawRepo[]>(`/users/${username}/repos?per_page=100&sort=pushed`);
  if (!raw) return [];
  return raw
    .filter((r) => !r.archived)
    .map((r) => ({
      name: r.name,
      fullName: r.full_name,
      description: r.description,
      url: r.html_url,
      homepage: r.homepage,
      stars: r.stargazers_count,
      forks: r.forks_count,
      watchers: r.watchers_count,
      openIssues: r.open_issues_count,
      language: r.language,
      topics: r.topics,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
      pushedAt: r.pushed_at,
      archived: r.archived,
      fork: r.fork,
      defaultBranch: r.default_branch,
      license: r.license?.spdx_id ?? null,
    }));
}

async function fetchRecentCommits(username: string): Promise<GitHubCommit[]> {
  const repos = await ghFetch<RawRepo[]>(`/users/${username}/repos?per_page=10&sort=pushed`);
  if (!repos) return [];

  const commits: GitHubCommit[] = [];
  const sorted = [...repos].sort(
    (a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
  );

  for (const repo of sorted.slice(0, 5)) {
    if (commits.length >= 15) break;
    const repoCommits = await ghFetch<RawCommit[]>(
      `/repos/${username}/${repo.name}/commits?per_page=5`,
    );
    if (repoCommits) {
      for (const c of repoCommits.slice(0, 3)) {
        if (commits.length >= 15) break;
        commits.push({
          hash: c.sha.slice(0, 7),
          message: c.commit.message.split("\n")[0],
          repo: repo.name,
          timestamp: c.commit.author.date,
          timeAgo: timeAgo(c.commit.author.date),
          url: c.html_url,
        });
      }
    }
  }

  commits.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  return commits.slice(0, 15);
}

async function fetchIssues(username: string): Promise<GitHubIssue[]> {
  const raw = await ghFetch<RawSearchResult<RawIssue>>(
    `/search/issues?q=author:${username}+type:issue&per_page=20&sort=updated`,
  );
  if (!raw?.items) return [];
  return raw.items.map((i) => ({
    number: i.number,
    title: i.title,
    state: i.state,
    url: i.html_url,
    createdAt: i.created_at,
    closedAt: i.closed_at,
    labels: i.labels.map((l) => ({ name: l.name, color: l.color })),
    author: i.user?.login ?? null,
    isPullRequest: !!i.pull_request,
  }));
}

async function fetchPullRequests(username: string): Promise<GitHubPullRequest[]> {
  const raw = await ghFetch<RawSearchResult<RawPullRequest>>(
    `/search/issues?q=author:${username}+type:pr&per_page=20&sort=updated`,
  );
  if (!raw?.items) return [];

  const prs: GitHubPullRequest[] = [];
  for (const item of raw.items) {
    const repoPart = item.repository_url?.split("/repos/")[1]?.split("/");
    const repoName = repoPart?.[1] ?? "";
    const pr = repoName
      ? await ghFetch<RawPullRequest>(
          `/repos/${username}/${repoName}/pulls/${item.number}`,
        )
      : null;
    prs.push({
      number: item.number,
      title: item.title,
      state: pr?.merged ? "closed" : item.state,
      merged: pr?.merged ?? false,
      url: item.html_url,
      createdAt: item.created_at,
      mergedAt: pr?.merged_at ?? null,
      closedAt: item.closed_at,
      author: item.user?.login ?? null,
      headBranch: pr?.head?.ref ?? "",
      baseBranch: pr?.base?.ref ?? "main",
    });
  }
  return prs;
}

async function fetchReleases(username: string): Promise<GitHubRelease[]> {
  const raw = await ghFetch<RawRelease[]>(`/users/${username}/repos?per_page=10&sort=pushed`);
  if (!raw) return [];

  const releases: GitHubRelease[] = [];
  for (const repo of raw.slice(0, 5)) {
    if (releases.length >= 10) break;
    const rels = await ghFetch<RawRelease[]>(
      `/repos/${username}/${repo.name}/releases?per_page=3`,
    );
    if (rels) {
      for (const r of rels) {
        releases.push({
          tagName: r.tag_name,
          name: r.name,
          body: r.body,
          url: r.html_url,
          createdAt: r.created_at,
          publishedAt: r.published_at,
          draft: r.draft,
          prerelease: r.prerelease,
          author: r.author?.login ?? null,
        });
      }
    }
  }

  releases.sort(
    (a, b) =>
      new Date(b.publishedAt || b.createdAt).getTime() -
      new Date(a.publishedAt || a.createdAt).getTime(),
  );
  return releases.slice(0, 10);
}

async function fetchContributors(username: string): Promise<GitHubContributor[]> {
  const repos = await ghFetch<RawRepo[]>(`/users/${username}/repos?per_page=5&sort=stars`);
  if (!repos) return [];

  const contributorMap = new Map<string, GitHubContributor>();

  for (const repo of repos.slice(0, 3)) {
    const contribs = await ghFetch<RawContributor[]>(
      `/repos/${username}/${repo.name}/contributors?per_page=10`,
    );
    if (contribs) {
      for (const c of contribs) {
        if (c.login === username) continue;
        const existing = contributorMap.get(c.login);
        if (existing) {
          existing.contributions += c.contributions;
        } else {
          contributorMap.set(c.login, {
            username: c.login,
            avatar: c.avatar_url,
            contributions: c.contributions,
            profileUrl: c.html_url,
          });
        }
      }
    }
  }

  return Array.from(contributorMap.values())
    .sort((a, b) => b.contributions - a.contributions)
    .slice(0, 10);
}

async function fetchLanguages(username: string): Promise<GitHubLanguages> {
  const repos = await ghFetch<RawRepo[]>(`/users/${username}/repos?per_page=10&sort=stars`);
  if (!repos) return {};

  const langTotals: Record<string, number> = {};

  for (const repo of repos.slice(0, 5)) {
    const langs = await ghFetch<RawLanguage>(
      `/repos/${username}/${repo.name}/languages`,
    );
    if (langs) {
      for (const [lang, bytes] of Object.entries(langs)) {
        langTotals[lang] = (langTotals[lang] ?? 0) + bytes;
      }
    }
  }

  return langTotals;
}

async function fetchContributionGraph(username: string): Promise<ContributionDay[]> {
  const now = new Date();
  const weeks = 20;
  const startDate = new Date(now);
  startDate.setDate(startDate.getDate() - weeks * 7);
  startDate.setHours(0, 0, 0, 0);

  const events = await ghFetch<RawEvent[]>(`/users/${username}/events?per_page=100`);
  if (!events) return [];

  const pushCounts: Record<string, number> = {};
  for (const event of events) {
    if (event.type === "PushEvent") {
      const date = toISODate(new Date(event.created_at));
      pushCounts[date] = (pushCounts[date] ?? 0) + (event.payload.commits?.length ?? 1);
    }
  }

  const days: ContributionDay[] = [];
  const cursor = new Date(startDate);
  while (cursor <= now) {
    const dateStr = toISODate(cursor);
    const count = pushCounts[dateStr] ?? 0;
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (count > 0) level = 1;
    if (count >= 3) level = 2;
    if (count >= 6) level = 3;
    if (count >= 10) level = 4;
    days.push({ date: dateStr, count, level });
    cursor.setDate(cursor.getDate() + 1);
  }

  return days;
}

// ── Main fetcher ──

export async function fetchAllGitHubData(): Promise<GitHubDataResult> {
  if (cache.data && Date.now() - cache.ts < CACHE_TTL) {
    return cache.data;
  }

  const username = getGithubUsername();

  const [profile, repos, recentCommits, issues, pullRequests, releases, contributors, languages, contributionGraph] =
    await Promise.all([
      fetchProfile(username),
      fetchRepos(username),
      fetchRecentCommits(username),
      fetchIssues(username),
      fetchPullRequests(username),
      fetchReleases(username),
      fetchContributors(username),
      fetchLanguages(username),
      fetchContributionGraph(username),
    ]);

  const result: GitHubDataResult = {
    profile: profile ?? {
      username,
      name: null,
      avatar: "",
      bio: null,
      company: null,
      location: null,
      blog: null,
      twitter: null,
      publicRepos: 0,
      followers: 0,
      following: 0,
      stars: 0,
      forks: 0,
      joinedAt: new Date().toISOString(),
    },
    repos,
    recentCommits,
    issues,
    pullRequests,
    releases,
    contributors,
    languages,
    contributionGraph,
  };

  cache.data = result;
  cache.ts = Date.now();
  return result;
}

export async function fetchGitHubData(): Promise<GitHubDataResult> {
  return fetchAllGitHubData();
}

export function getGitHubUsername(): string {
  return getGithubUsername();
}

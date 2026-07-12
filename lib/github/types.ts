// ── Raw API types ──

export interface RawUser {
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

export interface RawRepo {
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

export interface RawCommit {
  sha: string;
  commit: {
    message: string;
    author: { name: string; date: string };
  };
  html_url: string;
  repository?: { name: string };
}

export interface RawSearchResult<T> {
  total_count: number;
  items: T[];
}

export interface RawIssue {
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

export interface RawPullRequest {
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

export interface RawRelease {
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

export interface RawContributor {
  login: string;
  avatar_url: string;
  contributions: number;
  html_url: string;
}

export interface RawLanguage {
  [lang: string]: number;
}

export interface RawEvent {
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

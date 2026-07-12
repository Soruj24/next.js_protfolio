import { getGithubUsername } from "@/lib/github/config";
import { cache, CACHE_TTL } from "@/lib/github/client";
import { fetchProfile } from "@/lib/github/fetchers/profile";
import { fetchRepos } from "@/lib/github/fetchers/repos";
import { fetchRecentCommits } from "@/lib/github/fetchers/commits";
import { fetchIssues } from "@/lib/github/fetchers/issues";
import { fetchPullRequests } from "@/lib/github/fetchers/pull-requests";
import { fetchReleases } from "@/lib/github/fetchers/releases";
import { fetchContributors } from "@/lib/github/fetchers/contributors";
import { fetchLanguages } from "@/lib/github/fetchers/languages";
import { fetchContributionGraph } from "@/lib/github/fetchers/contributions";
import type { GitHubDataResult } from "@/lib/github/types";

export async function fetchAllGitHubData(): Promise<GitHubDataResult> {
  if (cache.data && Date.now() - cache.ts < CACHE_TTL) {
    return cache.data as GitHubDataResult;
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

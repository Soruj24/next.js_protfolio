import { ghFetch } from "@/lib/github/client";
import type { RawRepo, GitHubRepo } from "@/lib/github/types";

export async function fetchRepos(username: string): Promise<GitHubRepo[]> {
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

import { ghFetch } from "@/lib/github/client";
import type { RawRepo, RawContributor, GitHubContributor } from "@/lib/github/types";

export async function fetchContributors(username: string): Promise<GitHubContributor[]> {
  const repos = await ghFetch<RawRepo[]>(`/users/${username}/repos?per_page=5&sort=stars`);
  if (!repos) return [];

  const contributorMap = new Map<string, GitHubContributor>();

  for (const repo of repos.slice(0, 3)) {
    const contribs = await ghFetch<RawContributor[]>(
      `/repos/${username}/${repo.name}/contributors?per_page=10`
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

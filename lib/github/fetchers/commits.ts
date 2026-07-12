import { ghFetch } from "@/lib/github/client";
import type { RawRepo, RawCommit, GitHubCommit } from "@/lib/github/types";
import { timeAgo } from "@/lib/github/utils";

export async function fetchRecentCommits(username: string): Promise<GitHubCommit[]> {
  const repos = await ghFetch<RawRepo[]>(`/users/${username}/repos?per_page=10&sort=pushed`);
  if (!repos) return [];

  const commits: GitHubCommit[] = [];
  const sorted = [...repos].sort(
    (a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
  );

  for (const repo of sorted.slice(0, 5)) {
    if (commits.length >= 15) break;
    const repoCommits = await ghFetch<RawCommit[]>(
      `/repos/${username}/${repo.name}/commits?per_page=5`
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

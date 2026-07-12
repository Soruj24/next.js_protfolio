import { ghFetch } from "@/lib/github/client";
import type { RawSearchResult, RawIssue, GitHubIssue } from "@/lib/github/types";

export async function fetchIssues(username: string): Promise<GitHubIssue[]> {
  const raw = await ghFetch<RawSearchResult<RawIssue>>(
    `/search/issues?q=author:${username}+type:issue&per_page=20&sort=updated`
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

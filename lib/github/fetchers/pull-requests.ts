import { ghFetch } from "@/lib/github/client";
import type { RawSearchResult, RawPullRequest, GitHubPullRequest } from "@/lib/github/types";

export async function fetchPullRequests(username: string): Promise<GitHubPullRequest[]> {
  const raw = await ghFetch<RawSearchResult<RawPullRequest>>(
    `/search/issues?q=author:${username}+type:pr&per_page=20&sort=updated`
  );
  if (!raw?.items) return [];

  const prs: GitHubPullRequest[] = [];
  for (const item of raw.items) {
    const repoPart = item.repository_url?.split("/repos/")[1]?.split("/");
    const repoName = repoPart?.[1] ?? "";
    const pr = repoName
      ? await ghFetch<RawPullRequest>(`/repos/${username}/${repoName}/pulls/${item.number}`)
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

import { ghFetch } from "@/lib/github/client";
import type { RawRepo, RawRelease, GitHubRelease } from "@/lib/github/types";

export async function fetchReleases(username: string): Promise<GitHubRelease[]> {
  const raw = await ghFetch<RawRepo[]>(`/users/${username}/repos?per_page=10&sort=pushed`);
  if (!raw) return [];

  const releases: GitHubRelease[] = [];
  for (const repo of raw.slice(0, 5)) {
    if (releases.length >= 10) break;
    const rels = await ghFetch<RawRelease[]>(`/repos/${username}/${repo.name}/releases?per_page=3`);
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
      new Date(a.publishedAt || a.createdAt).getTime()
  );
  return releases.slice(0, 10);
}

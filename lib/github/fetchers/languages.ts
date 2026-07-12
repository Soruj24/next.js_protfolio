import { ghFetch } from "@/lib/github/client";
import type { RawRepo, RawLanguage, GitHubLanguages } from "@/lib/github/types";

export async function fetchLanguages(username: string): Promise<GitHubLanguages> {
  const repos = await ghFetch<RawRepo[]>(`/users/${username}/repos?per_page=10&sort=stars`);
  if (!repos) return {};

  const langTotals: Record<string, number> = {};

  for (const repo of repos.slice(0, 5)) {
    const langs = await ghFetch<RawLanguage>(`/repos/${username}/${repo.name}/languages`);
    if (langs) {
      for (const [lang, bytes] of Object.entries(langs)) {
        langTotals[lang] = (langTotals[lang] ?? 0) + bytes;
      }
    }
  }

  return langTotals;
}

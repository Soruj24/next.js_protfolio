import { GITHUB_API, getAuthHeaders } from "@/lib/github/config";

export const cache: { data: unknown | null; ts: number } = { data: null, ts: 0 };
export const CACHE_TTL = 5 * 60 * 1000;

export async function ghFetch<T>(path: string): Promise<T | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(`${GITHUB_API}${path}`, {
      headers: getAuthHeaders(),
      signal: controller.signal,
    });

    // Check rate limit
    const remaining = res.headers.get("x-ratelimit-remaining");
    if (remaining !== null && parseInt(remaining, 10) < 5) {
      console.warn(
        `[GitHub API] Rate limit low: ${remaining} requests remaining. ` +
        `Set GITHUB_TOKEN env var to increase limit from 60 to 5000 req/hour.`
      );
    }

    if (res.status === 403 || res.status === 429) {
      console.error(
        `[GitHub API] Rate limited (${res.status}) on ${path}. ` +
        `Set GITHUB_TOKEN env var to increase limit.`
      );
      return null;
    }

    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      console.error(`[GitHub API] Timeout on ${path}`);
    }
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

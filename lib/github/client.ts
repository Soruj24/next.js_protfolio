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
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

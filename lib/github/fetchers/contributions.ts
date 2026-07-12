import { ghFetch } from "@/lib/github/client";
import type { RawEvent, ContributionDay } from "@/lib/github/types";
import { toISODate } from "@/lib/github/utils";

export async function fetchContributionGraph(username: string): Promise<ContributionDay[]> {
  const now = new Date();
  const weeks = 20;
  const startDate = new Date(now);
  startDate.setDate(startDate.getDate() - weeks * 7);
  startDate.setHours(0, 0, 0, 0);

  const events = await ghFetch<RawEvent[]>(`/users/${username}/events?per_page=100`);
  if (!events) return [];

  const pushCounts: Record<string, number> = {};
  for (const event of events) {
    if (event.type === "PushEvent") {
      const date = toISODate(new Date(event.created_at));
      pushCounts[date] = (pushCounts[date] ?? 0) + (event.payload.commits?.length ?? 1);
    }
  }

  const days: ContributionDay[] = [];
  const cursor = new Date(startDate);
  while (cursor <= now) {
    const dateStr = toISODate(cursor);
    const count = pushCounts[dateStr] ?? 0;
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (count > 0) level = 1;
    if (count >= 3) level = 2;
    if (count >= 6) level = 3;
    if (count >= 10) level = 4;
    days.push({ date: dateStr, count, level });
    cursor.setDate(cursor.getDate() + 1);
  }

  return days;
}

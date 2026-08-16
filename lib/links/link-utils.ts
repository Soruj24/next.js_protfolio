import type { LinkData, LinkType, LinkCategory, LinkHealthStatus } from "./link-types";

export function getLinkHref(link: LinkData): string {
  return link.url;
}

export function isInternalLink(url: string): boolean {
  if (url.startsWith("/")) return true;
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
    if (siteUrl && url.startsWith(siteUrl)) return true;
  } catch {
    // ignore
  }
  return false;
}

export function getInternalPath(url: string): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  if (siteUrl && url.startsWith(siteUrl)) {
    return url.slice(siteUrl.length) || "/";
  }
  return url;
}

export function filterActiveLinks(links: LinkData[]): LinkData[] {
  return links.filter((l) => l.isActive);
}

export function filterLinksByCategory(links: LinkData[], category: LinkCategory): LinkData[] {
  return links.filter((l) => l.category === category);
}

export function filterLinksByType(links: LinkData[], type: LinkType): LinkData[] {
  return links.filter((l) => l.type === type);
}

export function sortLinksByOrder(links: LinkData[]): LinkData[] {
  return [...links].sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getSocialLinks(links: LinkData[]): LinkData[] {
  return filterActiveLinks(filterLinksByCategory(links, "social"));
}

export function getContactLinks(links: LinkData[]): LinkData[] {
  return filterActiveLinks(filterLinksByCategory(links, "contact"));
}

export function getLinkByType(links: LinkData[], type: LinkType): LinkData | undefined {
  return links.find((l) => l.type === type && l.isActive);
}

export function formatHealthStatus(status: LinkHealthStatus): { label: string; color: string; icon: string } {
  switch (status) {
    case "working":
      return { label: "Working", color: "text-emerald-500", icon: "check-circle" };
    case "redirect":
      return { label: "Redirect", color: "text-amber-500", icon: "alert-triangle" };
    case "broken":
      return { label: "Broken", color: "text-red-500", icon: "x-circle" };
    case "unchecked":
    default:
      return { label: "Not Checked", color: "text-gray-400", icon: "circle" };
  }
}

export function formatResponseTime(ms: number | null): string {
  if (ms === null) return "—";
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

export function buildMailtoUrl(email: string, subject?: string): string {
  let url = `mailto:${email}`;
  if (subject) {
    url += `?subject=${encodeURIComponent(subject)}`;
  }
  return url;
}

export function buildTelUrl(phone: string): string {
  return `tel:${phone.replace(/[\s\-()]/g, "")}`;
}

export function extractDomain(url: string): string {
  try {
    const u = new URL(url);
    return u.hostname;
  } catch {
    return "";
  }
}

export function getLinkAnalytics(links: LinkData[]) {
  const total = links.length;
  const active = links.filter((l) => l.isActive).length;
  const broken = links.filter((l) => l.health.status === "broken").length;
  const redirect = links.filter((l) => l.health.status === "redirect").length;
  const unchecked = links.filter((l) => l.health.status === "unchecked").length;
  const totalClicks = links.reduce((sum, l) => sum + l.clickCount, 0);

  const checkedLinks = links.filter((l) => l.health.lastCheckedAt);
  const lastCheckedAt = checkedLinks.length > 0
    ? checkedLinks.sort((a, b) => new Date(b.health.lastCheckedAt!).getTime() - new Date(a.health.lastCheckedAt!).getTime())[0].health.lastCheckedAt
    : null;

  const responseTimes = links.filter((l) => l.health.responseTime !== null).map((l) => l.health.responseTime!);
  const avgResponseTime = responseTimes.length > 0 ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length : null;

  return { total, active, broken, redirect, unchecked, totalClicks, lastCheckedAt, avgResponseTime };
}

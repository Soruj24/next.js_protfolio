import { connectDB } from "@/config/db";
import Link from "@/models/Link";
import type { LinkData, CreateLinkInput, UpdateLinkInput, LinkType, LinkCategory, LinkHealthSummary } from "./link-types";

export async function getAllLinks(): Promise<LinkData[]> {
  await connectDB();
  const links = await Link.find({}).sort({ displayOrder: 1, createdAt: -1 }).lean();
  return links.map((l) => ({ ...l, _id: String(l._id) })) as LinkData[];
}

export async function getActiveLinks(): Promise<LinkData[]> {
  await connectDB();
  const links = await Link.find({ isActive: true }).sort({ displayOrder: 1 }).lean();
  return links.map((l) => ({ ...l, _id: String(l._id) })) as LinkData[];
}

export async function getLinksByCategory(category: LinkCategory): Promise<LinkData[]> {
  await connectDB();
  const links = await Link.find({ category, isActive: true }).sort({ displayOrder: 1 }).lean();
  return links.map((l) => ({ ...l, _id: String(l._id) })) as LinkData[];
}

export async function getLinksByType(type: LinkType): Promise<LinkData[]> {
  await connectDB();
  const links = await Link.find({ type, isActive: true }).sort({ displayOrder: 1 }).lean();
  return links.map((l) => ({ ...l, _id: String(l._id) })) as LinkData[];
}

export async function getLinkById(id: string): Promise<LinkData | null> {
  await connectDB();
  const link = await Link.findById(id).lean();
  if (!link) return null;
  return { ...link, _id: String(link._id) } as LinkData;
}

export async function createLink(input: CreateLinkInput): Promise<LinkData> {
  await connectDB();
  const maxOrder = await Link.findOne({ category: input.category }).sort({ displayOrder: -1 }).lean();
  const order = input.displayOrder ?? ((maxOrder?.displayOrder ?? -1) + 1);

  const link = await Link.create({ ...input, displayOrder: order });
  return { ...link.toObject(), _id: String(link._id) } as unknown as LinkData;
}

export async function updateLink(id: string, input: UpdateLinkInput): Promise<LinkData | null> {
  await connectDB();
  const link = await Link.findByIdAndUpdate(id, { ...input, updatedAt: new Date() }, { new: true }).lean();
  if (!link) return null;
  return { ...link, _id: String(link._id) } as LinkData;
}

export async function deleteLink(id: string): Promise<boolean> {
  await connectDB();
  const result = await Link.findByIdAndDelete(id);
  return result !== null;
}

export async function reorderLinks(ids: string[]): Promise<void> {
  await connectDB();
  const updates = ids.map((id, index) =>
    Link.findByIdAndUpdate(id, { displayOrder: index })
  );
  await Promise.all(updates);
}

export async function toggleLinkActive(id: string): Promise<LinkData | null> {
  await connectDB();
  const link = await Link.findById(id);
  if (!link) return null;
  link.isActive = !link.isActive;
  await link.save();
  return { ...link.toObject(), _id: String(link._id) } as unknown as LinkData;
}

export async function trackLinkClick(id: string): Promise<void> {
  await connectDB();
  await Link.findByIdAndUpdate(id, {
    $inc: { clickCount: 1 },
    lastClickedAt: new Date(),
  });
}

export async function updateLinkHealth(
  id: string,
  health: { status: string; statusCode: number | null; responseTime: number | null; errorMessage: string | null }
): Promise<void> {
  await connectDB();
  await Link.findByIdAndUpdate(id, {
    health: { ...health, lastCheckedAt: new Date() },
  });
}

export async function getLinkHealthSummary(): Promise<LinkHealthSummary> {
  await connectDB();
  const links = await Link.find({}).lean();
  const total = links.length;
  const active = links.filter((l) => l.isActive).length;
  const broken = links.filter((l) => l.health?.status === "broken").length;
  const redirect = links.filter((l) => l.health?.status === "redirect").length;
  const unchecked = links.filter((l) => !l.health || l.health.status === "unchecked").length;

  const checkedLinks = links.filter((l) => l.health?.lastCheckedAt);
  const lastCheckedAt = checkedLinks.length > 0
    ? checkedLinks.sort((a, b) => new Date(b.health!.lastCheckedAt!).getTime() - new Date(a.health!.lastCheckedAt!).getTime())[0].health!.lastCheckedAt
    : null;

  const responseTimes = links.filter((l) => l.health?.responseTime != null).map((l) => l.health!.responseTime!);
  const avgResponseTime = responseTimes.length > 0 ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length : null;

  return { total, active, broken, redirect, unchecked, lastCheckedAt: lastCheckedAt as string | null, avgResponseTime };
}

import type { ResumeData } from "./resume-types";

export function getResumeFileName(data: ResumeData): string {
  const name = data.name.replace(/\s+/g, "_");
  return `${name}_Frontend_Developer_Resume.pdf`;
}

export function buildContactParts(data: ResumeData): { label: string; value: string; href: string }[] {
  const parts: { label: string; value: string; href: string }[] = [];
  if (data.location) parts.push({ label: "Location", value: data.location, href: "" });
  if (data.email) parts.push({ label: "Email", value: data.email, href: `mailto:${data.email}` });
  if (data.phone) parts.push({ label: "Phone", value: data.phone, href: `tel:${data.phone.replace(/[\s\-()]/g, "")}` });
  if (data.github) parts.push({ label: "GitHub", value: data.github, href: data.github });
  if (data.portfolio) parts.push({ label: "Portfolio", value: data.portfolio, href: data.portfolio });
  if (data.linkedin) parts.push({ label: "LinkedIn", value: data.linkedin, href: data.linkedin });
  return parts;
}

export function buildFlatContactParts(data: ResumeData): string[] {
  const parts: string[] = [];
  if (data.location) parts.push(data.location);
  if (data.email) parts.push(data.email);
  if (data.phone) parts.push(data.phone);
  if (data.github) parts.push(data.github);
  if (data.portfolio) parts.push(data.portfolio);
  if (data.linkedin) parts.push(data.linkedin);
  return parts;
}

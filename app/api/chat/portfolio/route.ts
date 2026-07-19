import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { Settings } from "@/models/Settings";
import { Project } from "@/models/Project";
import { SkillCategory } from "@/models/Skill";

export const dynamic = "force-dynamic";

function flattenObject(obj: Record<string, unknown>, prefix = ""): string[] {
  const lines: string[] = [];
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    const path = prefix ? `${prefix}.${key}` : key;
    if (val && typeof val === "object" && !Array.isArray(val)) {
      lines.push(...flattenObject(val as Record<string, unknown>, path));
    } else if (Array.isArray(val)) {
      const items = val.map((v) => (typeof v === "object" ? JSON.stringify(v) : String(v)));
      lines.push(`${path}: ${items.join(", ")}`);
    } else if (val !== null && val !== undefined) {
      lines.push(`${path}: ${String(val)}`);
    }
  }
  return lines;
}

export async function GET() {
  try {
    await connectDB();

    const [settingsDoc, projects, skillCategories] = await Promise.all([
      Settings.findOne({}).lean(),
      Project.find({}).lean(),
      SkillCategory.find({}).lean(),
    ]);

    const settings = (settingsDoc || {}) as Record<string, unknown>;
    const lines: string[] = [];

    lines.push("# PORTFOLIO DATA");
    lines.push("");

    if (settings.personal_info) {
      lines.push("## PERSONAL INFO");
      lines.push(...flattenObject(settings.personal_info as Record<string, unknown>));
      lines.push("");
    }

    if (settings.contact) {
      lines.push("## CONTACT");
      lines.push(...flattenObject(settings.contact as Record<string, unknown>));
      lines.push("");
    }

    if (settings.social_links) {
      lines.push("## SOCIAL LINKS");
      const socials = settings.social_links as Record<string, unknown>;
      for (const [key, val] of Object.entries(socials)) {
        if (typeof val === "string") lines.push(`${key}: ${val}`);
      }
      lines.push("");
    }

    if (settings.experience) {
      lines.push("## EXPERIENCE");
      lines.push(...flattenObject(settings.experience as Record<string, unknown>));
      lines.push("");
    }

    if (settings.educations && Array.isArray(settings.educations)) {
      lines.push("## EDUCATION");
      (settings.educations as Record<string, unknown>[]).forEach((edu, i) => {
        lines.push(`Education ${i + 1}:`);
        lines.push(...flattenObject(edu));
      });
      lines.push("");
    }

    if (settings.experiences && Array.isArray(settings.experiences)) {
      lines.push("## WORK EXPERIENCE");
      (settings.experiences as Record<string, unknown>[]).forEach((exp, i) => {
        lines.push(`Experience ${i + 1}:`);
        lines.push(...flattenObject(exp));
      });
      lines.push("");
    }

    if (projects.length > 0) {
      lines.push("## PROJECTS");
      projects.forEach((proj) => {
        lines.push(`### ${proj.title}`);
        if (proj.description) lines.push(`Description: ${proj.description}`);
        if (proj.technologies?.length) lines.push(`Tech: ${proj.technologies.join(", ")}`);
        if (proj.metadata?.category) lines.push(`Category: ${proj.metadata.category}`);
        if (proj.metadata?.featured) lines.push("Featured: Yes");
        if (proj.highlights?.length) {
          lines.push("Highlights:");
          proj.highlights.forEach((h: string) => lines.push(`- ${h}`));
        }
        if (proj.media?.demo) lines.push(`Demo: ${proj.media.demo}`);
        if (proj.media?.github) lines.push(`GitHub: ${proj.media.github}`);
        lines.push("");
      });
    }

    if (skillCategories.length > 0) {
      lines.push("## SKILLS");
      skillCategories.forEach((cat) => {
        lines.push(`### ${cat.title}`);
        if (cat.skills?.length) {
          const skillList = cat.skills.map(
            (s: { name?: string; title?: string }) => s.name || s.title
          );
          lines.push(skillList.join(", "));
        }
        lines.push("");
      });
    }

    return new NextResponse(lines.join("\n"), {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error: unknown) {
    console.error("Portfolio API Error:", error);
    return new NextResponse("Portfolio data unavailable", { status: 500 });
  }
}

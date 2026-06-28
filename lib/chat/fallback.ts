import { normalize } from "@/lib/chat/context"

export function buildFallbackResponse(
  message: string,
  scoredProjects: any[],
  scoredSkills: any[],
  contactSection: string,
): string {
  const isBangla = /[\u0980-\u09FF]/.test(message)

  const featuredProjects = scoredProjects
    .map(
      (p: any) =>
        `- ${p.title}\n  ${p.description}\n  Tech: ${(Array.isArray(p.technologies) ? p.technologies.join(", ") : "")}`,
    )
    .join("\n\n") || (isBangla ? "কোন প্রকল্প পাওয়া যায়নি" : "No projects available")

  const coreSkills = scoredSkills
    .map((c: any) => `- ${c.title}: ${(Array.isArray(c.skills) ? c.skills.join(", ") : "")}`)
    .join("\n") || (isBangla ? "কোন দক্ষতা পাওয়া যায়নি" : "No skills available")

  const contactLine = contactSection ? (isBangla ? `যোগাযোগ: ${contactSection}` : `Contact: ${contactSection}`) : ""

  return [
    isBangla ? "## বাছাই করা প্রোজেক্ট" : "## Featured Projects",
    featuredProjects,
    "",
    isBangla ? "## মূল দক্ষতা" : "## Core Skills",
    coreSkills,
    "",
    contactLine,
  ].join("\n")
}

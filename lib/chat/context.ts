import { Document } from "@langchain/core/documents"
import path from "path"
import fs from "fs/promises"

export function normalize(s: unknown): string {
  return typeof s === "string" ? s : Array.isArray(s) ? s.join(", ") : ""
}

function scoreText(text: string, inputTerms: string[]): number {
  return inputTerms.reduce((acc, t) => (text.toLowerCase().includes(t) ? acc + 1 : acc), 0)
}

function getInputTerms(query: string): string[] {
  return (query || "").toLocaleLowerCase().match(/[\p{L}\p{N}]+/gu) || []
}

export async function loadSiteDocuments(dataDir: string): Promise<Document[]> {
  try {
    const entries = await fs.readdir(dataDir)
    const docs: Document[] = []
    for (const name of entries) {
      if (name.toLowerCase().endsWith(".json")) {
        const full = path.join(dataDir, name)
        const content = await fs.readFile(full, "utf-8")
        docs.push(new Document({ pageContent: content, metadata: { source: `data/${name}` } }))
      }
    }
    return docs
  } catch {
    return []
  }
}

export function filterRelevantDocs(docs: Document[], query: string, maxResults = 6): Document[] {
  const terms = getInputTerms(query)
  return docs
    .map((d) => ({ doc: d, score: scoreText(d.pageContent || "", terms) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(({ doc }) => doc)
}

export function scoreProjects(projects: any[], query: string) {
  const terms = getInputTerms(query)
  return projects
    .map((p: any) => {
      const text =
        `${normalize(p.title)} ${normalize(p.description)} ${normalize(p.fullDescription)} ${Array.isArray(p.technologies) ? p.technologies.join(" ") : ""}`
      return { doc: p, score: scoreText(text, terms) + (p.featured ? 1 : 0) }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map(({ doc }) => doc)
}

export function scoreSkills(skillsDocs: any[], query: string) {
  const terms = getInputTerms(query)
  return skillsDocs
    .map((c: any) => {
      const text = `${normalize(c.title)} ${Array.isArray(c.skills) ? c.skills.join(" ") : ""}`
      return { doc: c, score: scoreText(text, terms) }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(({ doc }) => doc)
}

export function formatSkillsSection(scoredSkills: any[]): string {
  return scoredSkills
    .map((c: any) => {
      const list =
        Array.isArray(c.skills)
          ? c.skills.map((s: any) => (typeof s === "string" ? s : s?.name)).filter(Boolean).join(", ")
          : ""
      return `- ${c.title}: ${list}`
    })
    .join("\n") || "No skills available"
}

export function formatProjectsSection(scoredProjects: any[]): string {
  return scoredProjects
    .map((p: any) => {
      const tech = Array.isArray(p.technologies) ? p.technologies.join(", ") : ""
      return `- ${p.title}\n  Description: ${p.description}\n  Tech: ${tech}\n  Status: ${p.status}`
    })
    .join("\n\n") || "No projects available"
}

export function formatContactSection(settingsDoc: any): string {
  if (!settingsDoc) return ""
  return [
    normalize(settingsDoc?.personal_info?.full_name),
    normalize(settingsDoc?.personal_info?.professional_title),
    normalize(settingsDoc?.personal_info?.email),
    normalize(settingsDoc?.personal_info?.phone),
    normalize(settingsDoc?.personal_info?.location),
    normalize(settingsDoc?.personal_info?.github),
    normalize(settingsDoc?.personal_info?.linkedin),
  ]
    .filter(Boolean)
    .join(" | ")
}

export function formatDocsSection(siteDocs: Document[]): string {
  return siteDocs
    .map((d) => {
      const src = typeof d.metadata?.source === "string" ? d.metadata.source : "local"
      const content = (d.pageContent || "").slice(0, 1500)
      return `- Source: ${src}\n  ${content}`
    })
    .join("\n\n") || "No site documents available"
}

import { NextResponse } from "next/server"
import { ChatGroq } from "@langchain/groq"
import { ChatPromptTemplate } from "@langchain/core/prompts"
import { StringOutputParser } from "@langchain/core/output_parsers"
import { connectDB } from "@/config/db"
import { SkillCategory } from "@/models/Skill"
import { Project } from "@/models/Project"
import { Settings } from "@/models/Settings"
import personalData from "@/data/Parsonal.json"
import { skillCategories as localSkillCategories } from "@/data/skills"
import { projects as localProjects } from "@/data/projects"
import { contactInfo } from "@/data/contact"
import path from "path"
import fs from "fs/promises"
import { Document } from "@langchain/core/documents"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 })
    }

    const apiKey = process.env.GROQ_API_KEY?.trim()
    if (!apiKey) {
      const guidance =
        "GROQ_API_KEY is not configured. Please set it in your environment to enable AI responses."
      return new Response(guidance, {
        status: 200,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      })
    }

    // Prefer local site content from /data; include DB as supplementary context if available
    let skillsDocs: any[] = Array.isArray(localSkillCategories)
      ? localSkillCategories.map((c: any) => ({
          title: c.title,
          skills: (c.skills || []).map((s: any) => s?.name || s),
        }))
      : []

    let projectsDocs: any[] = Array.isArray(localProjects) ? localProjects : []
    let settingsDoc: any = personalData || null

    try {
      await connectDB()
      const [dbSkills, dbProjects, dbSettings] = await Promise.all([
        SkillCategory.find({}).lean(),
        Project.find({}).lean(),
        Settings.findOne().lean(),
      ])
      // Merge DB content (avoid duplicates by simple title/id matching)
      if (Array.isArray(dbSkills)) {
        const titles = new Set(skillsDocs.map((s) => (s.title || "").toLowerCase()))
        for (const s of dbSkills) {
          const t = (s?.title || "").toLowerCase()
          if (!titles.has(t)) skillsDocs.push(s)
        }
      }
      if (Array.isArray(dbProjects)) {
        const ids = new Set(projectsDocs.map((p) => p.id))
        for (const p of dbProjects) {
          if (!ids.has(p.id)) projectsDocs.push(p)
        }
      }
      if (dbSettings) settingsDoc = dbSettings
    } catch {
      // If DB unavailable, continue with local data only
    }

    const normalize = (s: unknown) =>
      typeof s === "string" ? s : Array.isArray(s) ? s.join(", ") : ""

    const inputTerms =
      (message || "")
        .toLocaleLowerCase()
        .match(/[\p{L}\p{N}]+/gu) || []

    const scoreText = (text: string) =>
      inputTerms.reduce((acc, t) => (text.toLowerCase().includes(t) ? acc + 1 : acc), 0)

    const dataDir = path.resolve(process.cwd(), "data")
    let loadedDocs: Document[] = []
    try {
      const entries = await fs.readdir(dataDir)
      for (const name of entries) {
        if (name.toLowerCase().endsWith(".json")) {
          const full = path.join(dataDir, name)
          const content = await fs.readFile(full, "utf-8")
          loadedDocs.push(new Document({ pageContent: content, metadata: { source: `data/${name}` } }))
        }
      }
    } catch {
      loadedDocs = []
    }
    const manualDocs: Document[] = [
      new Document({
        pageContent: JSON.stringify(personalData),
        metadata: { source: "data/Parsonal.json" },
      }),
      new Document({
        pageContent: JSON.stringify(localSkillCategories),
        metadata: { source: "data/skills.ts" },
      }),
      new Document({
        pageContent: JSON.stringify(localProjects),
        metadata: { source: "data/projects.ts" },
      }),
      new Document({
        pageContent: JSON.stringify(contactInfo),
        metadata: { source: "data/contact.ts" },
      }),
    ]
    const siteDocs = [...loadedDocs, ...manualDocs]
      .map((d) => ({ doc: d, score: scoreText(d.pageContent || "") }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map(({ doc }) => doc)

    const scoredProjects = projectsDocs
      .map((p: any) => {
        const text =
          `${normalize(p.title)} ${normalize(p.description)} ${normalize(p.fullDescription)} ${Array.isArray(p.technologies) ? p.technologies.join(" ") : ""}`
        return { doc: p, score: scoreText(text) + (p.featured ? 1 : 0) }
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map(({ doc }) => doc)

    const scoredSkills = skillsDocs
      .map((c: any) => {
        const text =
          `${normalize(c.title)} ${Array.isArray(c.skills) ? c.skills.join(" ") : ""}`
        return { doc: c, score: scoreText(text) }
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(({ doc }) => doc)

    const skillsSection =
      scoredSkills
        .map((c: any) => {
          const list =
            Array.isArray(c.skills)
              ? c.skills
                  .map((s: any) => (typeof s === "string" ? s : s?.name))
                  .filter(Boolean)
                  .join(", ")
              : ""
          return `- ${c.title}: ${list}`
        })
        .join("\n") || "No skills available"

    const projectsSection =
      scoredProjects
        .map((p: any) => {
          const tech =
            Array.isArray(p.technologies) ? p.technologies.join(", ") : ""
          return `- ${p.title}\n  Description: ${p.description}\n  Tech: ${tech}\n  Status: ${p.status}`
        })
        .join("\n\n") || "No projects available"

    const contactSection = settingsDoc
      ? [
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
      : ""

    const system =
      "You are Soruj AI, a portfolio assistant for Soruj Mahmud. Respond in a formal, professional tone. Match the user's language; when the input is in Bengali, answer in professional Bengali. Use clear section headers and bullet points. Focus on quantified impact, architecture/performance rationale, and leadership/collaboration. Align technologies to enterprise stacks. Avoid speculation, emojis, and filler. If context is insufficient, state uncertainty and suggest contacting directly."
    const docsSection =
      siteDocs
        .map((d) => {
          const src = typeof d.metadata?.source === "string" ? d.metadata.source : "local"
          const content = (d.pageContent || "").slice(0, 1500)
          return `- Source: ${src}\n  ${content}`
        })
        .join("\n\n") || "No site documents available"
    const context =
      `Site Content\n\nSkills\n${skillsSection}\n\nProjects\n${projectsSection}\n\nContact\n${contactSection}\n\nDocuments\n${docsSection}`

    const escapeBraces = (s: string) => s.replace(/\{/g, "{{").replace(/\}/g, "}}")

    const messagesDef: Array<[string, string]> = [
      ["system", escapeBraces(system)],
      ["system", escapeBraces(context)],
    ]

    if (Array.isArray(history)) {
      for (const h of history) {
        if (!h || typeof h !== "object" || typeof h.content !== "string") continue
        const role = h.role === "assistant" ? "ai" : "human"
        messagesDef.push([role, escapeBraces(h.content)])
      }
    }

    messagesDef.push(["human", "{input}"])

    const prompt = ChatPromptTemplate.fromMessages(messagesDef)
    const model = new ChatGroq({
      apiKey,
      model: "llama-3.3-70b-versatile",
      temperature: 0.1,
    })

    try {
      const chain = prompt.pipe(model).pipe(new StringOutputParser())
      const aiStream = await chain.stream({ input: message })
      const stream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of aiStream) {
              controller.enqueue(new TextEncoder().encode(chunk))
            }
            controller.close()
          } catch (err) {
            controller.error(err)
          }
        },
      })
      return new Response(stream, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-cache",
        },
      })
    } catch {
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
      const fallback = [
        isBangla ? "## বাছাই করা প্রোজেক্ট" : "## Featured Projects",
        featuredProjects,
        "",
        isBangla ? "## মূল দক্ষতা" : "## Core Skills",
        coreSkills,
        "",
        contactLine,
      ].join("\n")
      return new Response(fallback, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      })
    }
  } catch (error) {
    console.error("Chat route error:", error)
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 })
  }
}

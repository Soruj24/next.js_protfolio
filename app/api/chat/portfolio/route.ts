import { NextResponse } from "next/server"
import { ChatGroq } from "@langchain/groq"
import { ChatPromptTemplate } from "@langchain/core/prompts"
import { StringOutputParser } from "@langchain/core/output_parsers"
import { connectDB } from "@/config/db"
import { SkillCategory } from "@/models/Skill"
import { Project } from "@/models/Project"
import { Settings } from "@/models/Settings"
import personalData from "@/data/Personal.json"
import { skillCategories as localSkillCategories } from "@/data/skills"
import { projects as localProjects } from "@/data/projects"
import { contactInfo } from "@/data/contact"
import path from "path"
import {
  loadSiteDocuments,
  filterRelevantDocs,
  scoreProjects,
  scoreSkills,
  formatSkillsSection,
  formatProjectsSection,
  formatContactSection,
  formatDocsSection,
} from "@/lib/chat/context"
import { buildFallbackResponse } from "@/lib/chat/fallback"

export const runtime = "nodejs"

const SYSTEM_PROMPT =
  "You are Soruj AI, a portfolio assistant for Soruj Mahmud. Respond in a formal, professional tone. Match the user's language; when the input is in Bengali, answer in professional Bengali. Use clear section headers and bullet points. Focus on quantified impact, architecture/performance rationale, and leadership/collaboration. Align technologies to enterprise stacks. Avoid speculation, emojis, and filler. If context is insufficient, state uncertainty and suggest contacting directly."

const escapeBraces = (s: string) => s.replace(/\{/g, "{{").replace(/\}/g, "}}")

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json()
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 })
    }

    const apiKey = process.env.GROQ_API_KEY?.trim()
    if (!apiKey) {
      return new Response(
        "GROQ_API_KEY is not configured. Please set it in your environment to enable AI responses.",
        { headers: { "Content-Type": "text/plain; charset=utf-8" } },
      )
    }

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
      // Continue with local data only
    }

    const dataDir = path.resolve(process.cwd(), "data")
    const loadedDocs = await loadSiteDocuments(dataDir)
    const manualDocs = [
      { pageContent: JSON.stringify(personalData), metadata: { source: "data/Personal.json" } },
      { pageContent: JSON.stringify(localSkillCategories), metadata: { source: "data/skills.ts" } },
      { pageContent: JSON.stringify(localProjects), metadata: { source: "data/projects.ts" } },
      { pageContent: JSON.stringify(contactInfo), metadata: { source: "data/contact.ts" } },
    ]
    const siteDocs = filterRelevantDocs([...loadedDocs, ...manualDocs], message)

    const scoredProjects = scoreProjects(projectsDocs, message)
    const scoredSkills = scoreSkills(skillsDocs, message)
    const contactSection = formatContactSection(settingsDoc)

    const context = [
      "Site Content\n",
      "Skills\n" + formatSkillsSection(scoredSkills),
      "\nProjects\n" + formatProjectsSection(scoredProjects),
      "\nContact\n" + contactSection,
      "\nDocuments\n" + formatDocsSection(siteDocs),
    ].join("\n")

    const messagesDef: Array<[string, string]> = [
      ["system", escapeBraces(SYSTEM_PROMPT)],
      ["system", escapeBraces(context)],
    ]
    if (Array.isArray(history)) {
      for (const h of history) {
        if (!h || typeof h !== "object" || typeof h.content !== "string") continue
        messagesDef.push([h.role === "assistant" ? "ai" : "human", escapeBraces(h.content)])
      }
    }
    messagesDef.push(["human", "{input}"])

    const prompt = ChatPromptTemplate.fromMessages(messagesDef)
    const model = new ChatGroq({ apiKey, model: "llama-3.3-70b-versatile", temperature: 0.1 })

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
      return new Response(
        buildFallbackResponse(message, scoredProjects, scoredSkills, contactSection),
        { headers: { "Content-Type": "text/plain; charset=utf-8" } },
      )
    }
  } catch (error) {
    console.error("Chat route error:", error)
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 })
  }
}

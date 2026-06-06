import { ChatOllama } from "@langchain/ollama"
import { ChatGroq } from "@langchain/groq"
import { NextResponse } from "next/server"
import { connectDB } from "@/config/db"
import { SkillCategory } from "@/models/Skill"
import { Project } from "@/models/Project"
import { parseAIResponse } from "@/lib/ai/parse-response"
import {
  formatSkillsForResume,
  formatProjectsForResume,
  resumePromptTemplate,
} from "@/lib/ai/resume-prompt"

export async function POST() {
  try {
    await connectDB()

    const groqKey = process.env.GROQ_API_KEY?.trim()

    const [skills, projects] = await Promise.all([
      SkillCategory.find({}),
      Project.find({}),
    ])

    const skillsFormatted = formatSkillsForResume(skills)
    const projectsFormatted = formatProjectsForResume(projects)

    const formattedPrompt = await resumePromptTemplate.format({
      skills: skillsFormatted,
      projects: projectsFormatted,
    })

    let resumeContent: unknown
    let lastError: unknown

    try {
      const model = new ChatOllama({
        baseUrl: "http://localhost:11434",
        model: "llama3.2",
        temperature: 0,
      })
      const response = await model.invoke(formattedPrompt)
      resumeContent = parseAIResponse(response.content as string)
    } catch (error: unknown) {
      console.warn("Local engine failed (Ollama not running):", error instanceof Error ? error.message : String(error))
      lastError = error
    }

    if (!resumeContent && groqKey) {
      try {
        const model = new ChatGroq({
          apiKey: groqKey,
          model: "llama-3.3-70b-versatile",
          temperature: 0.1,
        })
        const response = await model.invoke(formattedPrompt)
        resumeContent = parseAIResponse(response.content as string)
      } catch (error: unknown) {
        if (error instanceof Error && error.message?.includes("401")) {
          console.error("Cloud Authentication Error: Invalid API Key.")
        } else {
          console.error("Cloud engine failed:", error instanceof Error ? error.message : String(error))
        }
        lastError = error
      }
    }

    if (!resumeContent) {
      throw new Error(
        "Resume generation engines failed. Please ensure the local service is running or check your cloud API key.",
      )
    }

    return NextResponse.json({ success: true, data: resumeContent })
  } catch (error: unknown) {
    console.error("Resume Generation Error:", error instanceof Error ? error.message : String(error))
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to generate resume",
      },
      { status: 500 },
    )
  }
}

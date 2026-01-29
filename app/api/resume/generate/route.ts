import { ChatOllama } from "@langchain/ollama";
import { ChatGroq } from "@langchain/groq";
import { PromptTemplate } from "@langchain/core/prompts";
import { ISkillCategory, SkillCategory } from "@/models/Skill";
import { Project } from "@/models/Project";
import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { IProject } from "@/types";

// Helper function to extract JSON from markdown or raw text
function parseAIResponse(text: string) {
  try {
    // 1. Clean the text: remove potential markdown blocks or leading/trailing whitespace
    let cleanedText = text.trim();

    // Remove markdown code blocks if present (handles ```json ... ``` and ``` ... ```)
    const jsonMatch =
      cleanedText.match(/```(?:json)?\s*([\s\S]*?)\s*```/) ||
      cleanedText.match(/{[\s\S]*}/);

    if (jsonMatch) {
      cleanedText = (jsonMatch[1] || jsonMatch[0]).trim();
    }

    // 2. Try to parse the cleaned text
    return JSON.parse(cleanedText);
  } catch (error: unknown) {
    console.error(
      "JSON Parse Error Details:",
      error instanceof Error ? error.message : String(error),
      "Original Text snippet:",
      text.substring(0, 100)
    );
    // If parsing fails, try one more aggressive cleanup: find first '{' and last '}'
    try {
      const firstBrace = text.indexOf("{");
      const lastBrace = text.lastIndexOf("}");
      if (firstBrace !== -1 && lastBrace !== -1) {
        const fallbackClean = text.substring(firstBrace, lastBrace + 1);
        return JSON.parse(fallbackClean);
      }
    } catch (innerError) {
      console.error("Aggressive JSON cleanup failed too");
    }
    throw new Error(
      `Failed to parse system response: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

export async function POST() {
  try {
    await connectDB();

    const groqKey = process.env.GROQ_API_KEY?.trim();

    // Fetch data from DB
    const [skills, projects] = await Promise.all([
      SkillCategory.find({}),
      Project.find({}),
    ]);

    const skillsFormatted = skills
      .map((cat: ISkillCategory) => `${cat.title}: ${cat.skills.join(", ")}`)
      .join("\n");

    const projectsFormatted = projects
      .map(
        (p: IProject) => `Project: ${p.title}\nDescription: ${p.description}`
      )
      .join("\n\n");

    const prompt = PromptTemplate.fromTemplate(`
      You are an expert Executive Resume Writer specializing in high-end tech roles (Senior Frontend Developer, UI/UX Architect). 
      Your task is to transform raw project and skill data into a high-impact, ATS-optimized professional resume.

      GUIDELINES:
      1. Professional Summary: Write a compelling 3-sentence narrative. Focus on solving business problems with modern frontend technologies, performant UI architecture, and seamless user experiences. Use strong action verbs.
      2. Key Highlights: Identify 3 unique value propositions (e.g., "Architected immersive web experiences", "Optimized core web vitals for 40% performance gain").
      3. Suggested Projects: For each project, write a 1-sentence description that follows the Google XYZ formula: "Accomplished [X] as measured by [Y], by doing [Z]".
      4. Optimized Skills: Categorize and select the most relevant frontend technologies.

      USER DATA:
      SKILLS DATABASE:
      {skills}

      PROJECTS DATABASE:
      {projects}

      REQUIRED JSON STRUCTURE (STRICTLY VALID JSON):
      Return ONLY the JSON object. Do not include any conversational text, explanations, or preamble.
      
      {{
        "professionalSummary": "Executive-level summary here...",
        "keyHighlights": ["Value Prop 1", "Value Prop 2", "Value Prop 3"],
        "suggestedProjects": [
          {{
            "title": "Project Title",
            "impact": "Accomplished [X] as measured by [Y], by doing [Z].",
            "techStack": ["Tech 1", "Tech 2"]
          }}
        ],
        "optimizedSkills": ["Skill 1", "Skill 2"]
      }}
    `);

    let resumeContent;
    let lastError;

    // --- Strategy 1: Try Local Engine (llama3.2) ---
    try {
      console.log("Attempting local engine (llama3.2)...");
      const model = new ChatOllama({
        baseUrl: "http://localhost:11434", // Default Ollama URL
        model: "llama3.2",
        temperature: 0,
      });
      const formattedPrompt = await prompt.format({
        skills: skillsFormatted,
        projects: projectsFormatted,
      });
      const response = await model.invoke(formattedPrompt);
      resumeContent = parseAIResponse(response.content as string);
      console.log("Success with local engine!");
    } catch (error: unknown) {
      console.warn(
        "Local engine failed (Make sure Ollama is running):",
        error instanceof Error ? error.message : String(error)
      );
      lastError = error;
    }

    // --- Strategy 2: Try Cloud Engine (Llama-3.3-70b) ---
    if (!resumeContent && groqKey) {
      try {
        console.log("Attempting cloud engine (Llama-3.3-70b)...");
        const model = new ChatGroq({
          apiKey: groqKey,
          model: "llama-3.3-70b-versatile",
          temperature: 0.1, // Lower temperature for more consistent JSON
        });
        const formattedPrompt = await prompt.format({
          skills: skillsFormatted,
          projects: projectsFormatted,
        });
        const response = await model.invoke(formattedPrompt);
        resumeContent = parseAIResponse(response.content as string);
        console.log("Success with cloud engine!");
      } catch (error: unknown) {
        if (error instanceof Error && error.message?.includes("401")) {
          console.error("Cloud Authentication Error: Invalid API Key.");
        } else {
          console.error(
            "Cloud engine failed:",
            error instanceof Error ? error.message : String(error)
          );
        }
        lastError = error;
      }
    }

    if (!resumeContent) {
      throw new Error(
        "Resume generation engines failed. Please ensure the local service is running or check your cloud API key."
      );
    }

    return NextResponse.json({
      success: true,
      data: resumeContent,
    });
  } catch (error: unknown) {
    console.error(
      "Resume Generation Error:",
      error instanceof Error ? error.message : String(error)
    );
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to generate resume",
      },
      { status: 500 }
    );
  }
}

import { PromptTemplate } from "@langchain/core/prompts"
import { ISkillCategory } from "@/models/Skill"
import { IProject } from "@/types"

export function formatSkillsForResume(skills: ISkillCategory[]): string {
  return skills
    .map((cat: ISkillCategory) => `${cat.title}: ${cat.skills.join(", ")}`)
    .join("\n")
}

export function formatProjectsForResume(projects: IProject[]): string {
  return projects
    .map((p: IProject) => `Project: ${p.title}\nDescription: ${p.description}`)
    .join("\n\n")
}

export const resumePromptTemplate = PromptTemplate.fromTemplate(`
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
`)

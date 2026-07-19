import * as z from "zod";
import { ISettings } from "@/models/Settings";

export const settingsSchema = z.object({
  assistant: z.object({
    name: z.string().min(2, "Name is required"),
    purpose: z.string().min(10, "Purpose description is required"),
    contact_recommendation: z.string(),
  }),
  personal_info: z.object({
    full_name: z.string().min(2, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string(),
    location: z.string(),
    professional_title: z.string(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
  }),
  technical_skills: z.object({
    specializations: z.string().transform((val) =>
      val.split(",").map((s) => s.trim()).filter((s) => s !== "")
    ),
    core_technologies: z.string().transform((val) =>
      val.split(",").map((s) => s.trim()).filter((s) => s !== "")
    ),
  }),
  experience: z.object({
    professional_experience: z.string(),
    project_experience: z.string(),
    focus: z.string(),
  }),
  experiences: z.array(
    z.object({
      year: z.string(),
      role: z.string(),
      company: z.string(),
      description: z.string(),
      technologies: z.string(),
    })
  ),
  education: z.object({
    background: z.string(),
    additional_info: z.string(),
  }),
  educations: z.array(
    z.object({
      degree: z.string(),
      institution: z.string(),
      period: z.string(),
      description: z.string().optional(),
    })
  ),
  response_guidelines: z.object({
    be_concise: z.boolean(),
    be_informative: z.boolean(),
    professional_tone: z.boolean(),
    redirect_uncertain_queries: z.string(),
    language: z.string(),
  }),
  innovation: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string(),
      color: z.string(),
    })
  ),
  expertise: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string(),
      skills: z.string(),
      color: z.string(),
    })
  ),
  standards: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string(),
      metrics: z.string(),
      features: z.string(),
    })
  ),
  testimonials: z.array(
    z.object({
      name: z.string(),
      role: z.string(),
      content: z.string(),
      avatar: z.string(),
      color: z.string(),
    })
  ),
  case_studies: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      challenge: z.string(),
      solution: z.string(),
      impact: z.string(),
      technologies: z.string(),
      image: z.string(),
    })
  ),
});

export type SettingsFormInput = z.infer<typeof settingsSchema>;

export interface SettingsFormValues extends Omit<ISettings, "experiences" | "expertise" | "standards" | "testimonials" | "case_studies"> {
  experiences: {
    year: string;
    role: string;
    company: string;
    description: string;
    technologies: string | string[];
  }[];
  expertise: {
    title: string;
    description: string;
    icon: string;
    skills: string | string[];
    color: string;
  }[];
  standards: {
    title: string;
    description: string;
    icon: string;
    metrics: string;
    features: string | string[];
  }[];
  testimonials: {
    name: string;
    role: string;
    content: string;
    avatar: string;
    color: string;
  }[];
  case_studies: {
    title: string;
    description: string;
    challenge: string;
    solution: string;
    impact: string;
    technologies: string | string[];
    image: string;
  }[];
}

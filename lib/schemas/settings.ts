import * as z from "zod";

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
  response_guidelines: z.object({
    be_concise: z.boolean(),
    be_informative: z.boolean(),
    professional_tone: z.boolean(),
    redirect_uncertain_queries: z.string(),
    language: z.string(),
  }),
  innovation: z.array(
    z.object({
      title: z.string().min(1, "Title is required"),
      description: z.string().min(1, "Description is required"),
      icon: z.string().min(1, "Icon is required"),
      color: z.string().min(1, "Color is required"),
    })
  ),
  expertise: z.array(
    z.object({
      title: z.string().min(1, "Title is required"),
      description: z.string().min(1, "Description is required"),
      icon: z.string().min(1, "Icon is required"),
      skills: z.string().min(1, "Skills are required"),
      color: z.string().min(1, "Color is required"),
    })
  ),
  standards: z.array(
    z.object({
      title: z.string().min(1, "Title is required"),
      description: z.string().min(1, "Description is required"),
      icon: z.string().min(1, "Icon is required"),
      metrics: z.string().min(1, "Metrics are required"),
      features: z.string().min(1, "Features are required"),
    })
  ),
  testimonials: z.array(
    z.object({
      name: z.string().min(1, "Name is required"),
      role: z.string().min(1, "Role is required"),
      content: z.string().min(1, "Content is required"),
      avatar: z.string().min(1, "Avatar URL is required"),
      color: z.string().min(1, "Color is required"),
    })
  ),
  case_studies: z.array(
    z.object({
      title: z.string().min(1, "Title is required"),
      description: z.string().min(1, "Description is required"),
      challenge: z.string().min(1, "Challenge is required"),
      solution: z.string().min(1, "Solution is required"),
      impact: z.string().min(1, "Impact is required"),
      technologies: z.string().min(1, "Technologies are required"),
      image: z.string().min(1, "Image URL is required"),
    })
  ),
});

export type SettingsFormInput = z.infer<typeof settingsSchema>;

import { ISettings } from "@/models/Settings";

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

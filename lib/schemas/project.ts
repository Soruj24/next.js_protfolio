import * as z from "zod";

export const projectSchema = z.object({
  id: z.string().min(1, "ID is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description is required"),
  fullDescription: z.string().optional(),
  image: z.string().url("Valid image URL is required"),
  technologies: z.string().min(1, "At least one technology is required"),
  features: z.string().min(1, "At least one feature is required"),
  githubUrl: z.string().url().optional().or(z.literal("")),
  liveUrl: z.string().url().optional().or(z.literal("")),
  category: z.string(),
  status: z.enum(["completed", "in-progress", "planned"]),
  featured: z.boolean().default(false),
  difficulty: z.enum(["beginner", "medium", "intermediate", "advanced"]),
  duration: z.string().optional(),
  teamSize: z.string().min(1),
  emoji: z.string().optional(),
  screenshots: z.string().optional(),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

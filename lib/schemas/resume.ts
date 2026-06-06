import * as z from "zod";

export const resumeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  contact: z.object({
    email: z.string().email(),
    phone: z.string(),
    location: z.string(),
  }),
  summary: z.string().min(10, "Summary should be at least 10 characters"),
  experience: z.array(
    z.object({
      role: z.string().min(1, "Role is required"),
      company: z.string().min(1, "Company is required"),
      duration: z.string(),
      responsibilities: z.array(z.string()),
    })
  ),
  projects: z.array(
    z.object({
      title: z.string().min(1, "Project title is required"),
      description: z.string(),
      technologies: z.array(z.string()),
    })
  ),
  skills: z.array(z.string()),
  education: z.array(
    z.object({
      institution: z.string().min(1, "Institution is required"),
      degree: z.string(),
      year: z.string(),
    })
  ),
});

export type ResumeFormData = z.infer<typeof resumeSchema>;

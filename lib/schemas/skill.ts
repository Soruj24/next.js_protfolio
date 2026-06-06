import * as z from "zod";

export const skillSchema = z.object({
  title: z.string().min(1, "Title is required"),
  icon: z.string().min(1, "Icon is required"),
  skills: z
    .array(
      z.object({
        name: z.string().min(1, "Skill name is required"),
        level: z.number().min(0).max(100),
        icon: z.string().min(1, "Icon is required"),
        color: z.string().min(1, "Color is required"),
        description: z.string().optional(),
      })
    )
    .min(1, "At least one skill is required"),
});

export type SkillFormData = z.infer<typeof skillSchema>;

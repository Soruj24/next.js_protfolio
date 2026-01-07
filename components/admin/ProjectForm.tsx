"use client";

import { useState } from "react";
import { useForm,  Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { IProject } from "@/models/Project";

const projectSchema = z.object({
  id: z.string().min(1, "ID is required"),
  title: z.string().min(2, "Title is required"),
  description: z.string().min(10, "Description is required"),
  fullDescription: z.string().min(20, "Full description is required"),
  image: z.string().url("Valid image URL is required"),
  technologies: z.string().min(1, "At least one technology is required"),
  features: z.string().min(1, "At least one feature is required"),
  githubUrl: z.string().url().optional().or(z.literal("")),
  liveUrl: z.string().url().optional().or(z.literal("")),
  category: z.string(),
  status: z.enum(["completed", "in-progress", "planned"]),
  featured: z.boolean().default(false),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  duration: z.string().min(1),
  teamSize: z.string().min(1),
  emoji: z.string().optional(),
  screenshots: z.string().optional(),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  project?: IProject | null;
  onSuccess: () => void;
}

export default function ProjectForm({ project, onSuccess }: ProjectFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema) as unknown as Resolver<ProjectFormValues>,
    defaultValues: project
      ? {
          id: project.id,
          title: project.title,
          description: project.description,
          fullDescription: project.fullDescription,
          image: project.image,
          technologies: project.technologies.join(", "),
          features: project.features.join(", "),
          githubUrl: project.githubUrl || "",
          liveUrl: project.liveUrl || "",
          category: project.category,
          status: project.status,
          featured: project.featured,
          difficulty: project.difficulty,
          duration: project.duration,
          teamSize: project.teamSize,
          emoji: project.emoji || "🚀",
          screenshots: project.screenshots?.join(", ") || "",
        }
      : {
          id: "",
          title: "",
          description: "",
          fullDescription: "",
          image: "",
          technologies: "",
          features: "",
          githubUrl: "",
          liveUrl: "",
          category: "Fullstack",
          status: "completed",
          featured: false,
          difficulty: "intermediate",
          duration: "",
          teamSize: "1",
          emoji: "🚀",
          screenshots: "",
        },
  });

  const onSubmit = async (values: ProjectFormValues) => {
    setIsLoading(true);
    try {
      const data = {
        ...values,
        technologies: values.technologies
          .split(",")
          .map((s: string) => s.trim()),
        features: values.features.split(",").map((s: string) => s.trim()),
        screenshots: values.screenshots
          ? values.screenshots.split(",").map((s: string) => s.trim())
          : [],
        completionDate: new Date(),
        stats: {
          completionTime: values.duration,
          teamSize: values.teamSize,
          complexity: values.difficulty,
          linesOfCode: "10k+",
        },
        tags: values.technologies.split(",").map((s: string) => s.trim()),
      };

      const url = project
        ? `/api/projects/${project._id || project.id}`
        : "/api/projects";
      const method = project ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success(project ? "Project updated" : "Project created");
        onSuccess();
      } else {
        const err = await res.json();
        toast.error(err.error || "Something went wrong");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Error saving project");
      } else {
        toast.error("Unknown error saving project");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project ID (Slug)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="my-awesome-project"
                    className="bg-white/5 border-white/10"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Project Title"
                    className="bg-white/5 border-white/10"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Description</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Brief summary"
                  className="bg-white/5 border-white/10"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fullDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Detailed explanation"
                  className="bg-white/5 border-white/10 min-h-[100px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="https://..."
                    className="bg-white/5 border-white/10"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white/5 border-white/10">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="AI">AI</SelectItem>
                    <SelectItem value="Fullstack">Fullstack</SelectItem>
                    <SelectItem value="Mobile">Mobile</SelectItem>
                    <SelectItem value="Frontend">Frontend</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="technologies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technologies (comma separated)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Next.js, Tailwind, MongoDB"
                    className="bg-white/5 border-white/10"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="features"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Features (comma separated)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Auth, Real-time, Dashboard"
                    className="bg-white/5 border-white/10"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white/5 border-white/10">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="planned">Planned</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Difficulty</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white/5 border-white/10">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="2 weeks"
                    className="bg-white/5 border-white/10"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-8"
          >
            {isLoading
              ? "Saving..."
              : project
                ? "Update Project"
                : "Create Project"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

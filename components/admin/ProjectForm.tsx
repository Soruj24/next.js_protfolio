"use client";

import { useState } from "react";
import { useForm, Resolver } from "react-hook-form";
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
  title: z.string().min(1, "Title is required"),
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
  difficulty: z.enum(["beginner", "medium", "intermediate", "advanced"]),
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
    resolver: zodResolver(
      projectSchema
    ) as unknown as Resolver<ProjectFormValues>,
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
          category: project.category as string,
          status: project.status,
          featured: project.featured,
          difficulty: project.difficulty as any,
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

  // Auto-generate slug from title
  const title = form.watch("title");
  const id = form.watch("id");

  useState(() => {
    if (title && !id && !project) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      form.setValue("id", slug);
    }
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-white/5 p-4 sm:p-8 rounded-3xl border border-white/10 backdrop-blur-xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel className="text-gray-300 font-medium">
                  Project Title
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g. Luxe E-Commerce Platform"
                    className="bg-black/40 border-white/10 text-white focus:border-cyan-500/50 transition-colors h-12"
                    onChange={(e) => {
                      field.onChange(e);
                      if (!project) {
                        const slug = e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/(^-|-$)/g, "");
                        form.setValue("id", slug);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 font-medium">
                  Slug (ID)
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="luxe-ecommerce-platform"
                    className="bg-black/40 border-white/10 text-white focus:border-cyan-500/50 transition-colors h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 font-medium">
                  One-line Summary
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Briefly describe the project's core purpose"
                    className="bg-black/40 border-white/10 text-white focus:border-cyan-500/50 transition-colors h-12"
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
                <FormLabel className="text-gray-300 font-medium">
                  Category
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-black/40 border-white/10 text-white h-12">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-[#030712] border-white/10 text-white">
                    <SelectItem value="SaaS">SaaS / Product</SelectItem>
                    <SelectItem value="Fullstack">
                      Fullstack Development
                    </SelectItem>
                    <SelectItem value="Mobile">Mobile Application</SelectItem>
                    <SelectItem value="Frontend">Frontend / UI/UX</SelectItem>
                    <SelectItem value="E-Commerce">E-Commerce</SelectItem>
                    <SelectItem value="Portfolio">Portfolio</SelectItem>
                    <SelectItem value="Analytics">Analytics</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="fullDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300 font-medium">
                Detailed Case Study
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Explain the problem, solution, and your specific role..."
                  className="bg-black/40 border-white/10 text-white focus:border-cyan-500/50 transition-colors min-h-[150px] resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 font-medium">
                  Main Image URL
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="https://images.unsplash.com/..."
                    className="bg-black/40 border-white/10 text-white focus:border-cyan-500/50 transition-colors h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="emoji"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 font-medium">
                  Project Emoji
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="🚀"
                    className="bg-black/40 border-white/10 text-white focus:border-cyan-500/50 transition-colors h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="githubUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 font-medium">
                  GitHub Repository URL
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="https://github.com/..."
                    className="bg-black/40 border-white/10 text-white focus:border-cyan-500/50 transition-colors h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="liveUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 font-medium">
                  Live Deployment URL
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="https://project-demo.com"
                    className="bg-black/40 border-white/10 text-white focus:border-cyan-500/50 transition-colors h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="technologies"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 font-medium">
                  Technologies (comma separated)
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Next.js, TypeScript, Tailwind, OpenAI"
                    className="bg-black/40 border-white/10 text-white focus:border-cyan-500/50 transition-colors h-12"
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
                <FormLabel className="text-gray-300 font-medium">
                  Key Features (comma separated)
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Responsive Design, Real-time Data, Interactive UI"
                    className="bg-black/40 border-white/10 text-white focus:border-cyan-500/50 transition-colors h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 font-medium">
                  Development Status
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-black/40 border-white/10 text-white h-12">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-[#030712] border-white/10 text-white">
                    <SelectItem value="completed">Production Ready</SelectItem>
                    <SelectItem value="in-progress">In Development</SelectItem>
                    <SelectItem value="planned">Beta / Planned</SelectItem>
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
                <FormLabel className="text-gray-300 font-medium">
                  Technical Complexity
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-black/40 border-white/10 text-white h-12">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-[#030712] border-white/10 text-white">
                    <SelectItem value="beginner">Foundational</SelectItem>
                    <SelectItem value="medium">Intermediate</SelectItem>
                    <SelectItem value="intermediate">Advanced Logic</SelectItem>
                    <SelectItem value="advanced">Expert Systems</SelectItem>
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
                <FormLabel className="text-gray-300 font-medium">
                  Development Time
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g. 3 Months"
                    className="bg-black/40 border-white/10 text-white focus:border-cyan-500/50 transition-colors h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="teamSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 font-medium">
                  Core Team Size
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="1"
                    className="bg-black/40 border-white/10 text-white focus:border-cyan-500/50 transition-colors h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="screenshots"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 font-medium">
                  Gallery URLs (comma separated)
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="url1, url2, url3"
                    className="bg-black/40 border-white/10 text-white focus:border-cyan-500/50 transition-colors h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-4 pt-8">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white px-10 py-6 rounded-2xl font-bold text-lg shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Processing...</span>
              </div>
            ) : project ? (
              "Update Project"
            ) : (
              "Deploy Project"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

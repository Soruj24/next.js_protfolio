"use client";

import { useEffect, useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
} from "@/components/ui/form";
import { IProject } from "@/models/Project";
import { projectSchema, ProjectFormValues } from "@/lib/schemas/project";
import ProjectBasicFields from "@/components/features/admin/ProjectBasicFields";
import ProjectMediaLinks from "@/components/features/admin/ProjectMediaLinks";
import ProjectTechMeta from "@/components/features/admin/ProjectTechMeta";

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

  const title = form.watch("title");
  const id = form.watch("id");

  useEffect(() => {
    if (title && !id && !project) {
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      form.setValue("id", slug);
    }
  }, [title, id, project, form]);

  const onSubmit = async (values: ProjectFormValues) => {
    setIsLoading(true);
    try {
      const data = {
        ...values,
        technologies: values.technologies.split(",").map((s: string) => s.trim()),
        features: values.features.split(",").map((s: string) => s.trim()),
        screenshots: values.screenshots ? values.screenshots.split(",").map((s: string) => s.trim()) : [],
        completionDate: new Date(),
        stats: { completionTime: values.duration, teamSize: values.teamSize, complexity: values.difficulty, linesOfCode: "10k+" },
        tags: values.technologies.split(",").map((s: string) => s.trim()),
      };

      const url = project ? `/api/projects/${project._id || project.id}` : "/api/projects";
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
      toast.error(error instanceof Error ? error.message : "Error saving project");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white/5 p-4 sm:p-8 rounded-3xl border border-white/10 backdrop-blur-xl">
        <ProjectBasicFields project={project} />
        <ProjectMediaLinks />
        <ProjectTechMeta />

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

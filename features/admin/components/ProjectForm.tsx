"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { IProject } from "@/models/Project";
import { projectSchema, ProjectFormValues } from "@/lib/schemas/project";
import ProjectBasicFields from "@/features/admin/components/ProjectBasicFields";
import ProjectMediaLinks from "@/features/admin/components/ProjectMediaLinks";
import ProjectTechMeta from "@/features/admin/components/ProjectTechMeta";
import { Save, Eye, EyeOff, Clock, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectFormProps {
  project?: IProject | null;
  onSuccess: () => void;
}

type AutoSaveStatus = "idle" | "saving" | "saved" | "error";

export default function ProjectForm({ project, onSuccess }: ProjectFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDraft, setIsDraft] = useState(project?.published === false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<AutoSaveStatus>("idle");
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedRef = useRef<string>("");

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

  // Autosave
  const autoSave = useCallback(async () => {
    if (!project) return;

    const values = form.getValues();
    const currentData = JSON.stringify(values);
    if (currentData === lastSavedRef.current) return;

    setAutoSaveStatus("saving");
    try {
      const data = {
        ...values,
        technologies: values.technologies.split(",").map((s: string) => s.trim()),
        features: values.features.split(",").map((s: string) => s.trim()),
        screenshots: values.screenshots ? values.screenshots.split(",").map((s: string) => s.trim()) : [],
        published: !isDraft,
      };

      const res = await fetch(`/api/projects/${project._id || project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setAutoSaveStatus("saved");
        lastSavedRef.current = currentData;
        setTimeout(() => setAutoSaveStatus("idle"), 2000);
      } else {
        setAutoSaveStatus("error");
      }
    } catch {
      setAutoSaveStatus("error");
    }
  }, [project, form, isDraft]);

  useEffect(() => {
    if (!project) return;

    const subscription = form.watch(() => {
      if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
      autoSaveTimerRef.current = setTimeout(autoSave, 3000);
    });

    return () => {
      subscription.unsubscribe();
      if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    };
  }, [form, autoSave, project]);

  const buildData = (values: ProjectFormValues, published: boolean) => ({
    ...values,
    technologies: values.technologies.split(",").map((s: string) => s.trim()),
    features: values.features.split(",").map((s: string) => s.trim()),
    screenshots: values.screenshots ? values.screenshots.split(",").map((s: string) => s.trim()) : [],
    completionDate: project?.completionDate || new Date(),
    stats: {
      completionTime: values.duration,
      teamSize: values.teamSize,
      complexity: values.difficulty,
      views: project?.stats?.views || 0,
      likes: project?.stats?.likes || 0,
    },
    tags: values.technologies.split(",").map((s: string) => s.trim()),
    published,
    archived: project?.archived || false,
    order: project?.order || 0,
  });

  const onSubmit = async (values: ProjectFormValues) => {
    setIsLoading(true);
    try {
      const data = buildData(values, !isDraft);
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

  const saveAsDraft = async () => {
    setIsDraft(true);
    const values = form.getValues();
    await onSubmit(values);
  };

  const statusIcon = {
    idle: null,
    saving: <Loader2 size={12} className="animate-spin text-gray-400" />,
    saved: <Check size={12} className="text-emerald-400" />,
    error: <span className="text-red-400 text-[10px] font-semibold">Failed</span>,
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Autosave status bar */}
        {project && (
          <div className="flex items-center justify-between p-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-bold border",
                isDraft
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                  : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
              )}>
                {isDraft ? "Draft" : "Published"}
              </div>
              <button
                type="button"
                onClick={() => setIsDraft(!isDraft)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
                  isDraft
                    ? "text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/10"
                    : "text-amber-400 border-amber-500/20 hover:bg-amber-500/10",
                )}
              >
                {isDraft ? <><Eye size={12} /> Publish</> : <><EyeOff size={12} /> Unpublish</>}
              </button>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              {statusIcon[autoSaveStatus]}
              {autoSaveStatus === "saving" && <span className="text-[11px] font-medium">Autosaving...</span>}
              {autoSaveStatus === "saved" && <span className="text-[11px] font-medium">Saved</span>}
              {autoSaveStatus === "idle" && (
                <span className="text-[11px] font-medium flex items-center gap-1">
                  <Clock size={11} /> Autosave on
                </span>
              )}
            </div>
          </div>
        )}

        <div className="space-y-8 p-4 sm:p-8 rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl">
          <ProjectBasicFields project={project} />
          <ProjectMediaLinks />
          <ProjectTechMeta />

          <div className="flex items-center justify-between pt-8 border-t border-white/[0.06]">
            {project ? (
              <Button
                type="button"
                variant="ghost"
                onClick={saveAsDraft}
                disabled={isLoading}
                className="text-gray-400 hover:text-white hover:bg-white/5"
              >
                <Save size={16} className="mr-2" />
                Save as Draft
              </Button>
            ) : (
              <div />
            )}
            <div className="flex items-center gap-3">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white px-8 py-5 rounded-xl font-bold shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Saving...</span>
                  </div>
                ) : project ? (
                  "Update Project"
                ) : (
                  "Create Project"
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}

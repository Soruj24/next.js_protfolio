"use client";
import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { resumeSchema, ResumeFormData } from "@/lib/schemas/resume";
import ResumeBasicInfo from "@/components/admin/resume/ResumeBasicInfo";
import ResumeExperienceSection from "@/components/admin/resume/ResumeExperienceSection";
import ResumeProjectsSection from "@/components/admin/resume/ResumeProjectsSection";
import ResumeSkillsSection from "@/components/admin/resume/ResumeSkillsSection";
import ResumeEducationSection from "@/components/admin/resume/ResumeEducationSection";

export default function ResumeAdminPage() {
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<ResumeFormData>({
    resolver: zodResolver(resumeSchema),
    defaultValues: { name: "", title: "", contact: { email: "", phone: "", location: "" }, summary: "", experience: [], projects: [], skills: [], education: [] },
  });

  const { reset, handleSubmit } = form;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/resume");
        const data = await res.json();
        if (data) {
          data.skills = Array.isArray(data.skills) ? data.skills : data.skills ? String(data.skills).split(",").map((s: string) => s.trim()) : [];
          reset(data);
        }
      } catch {
        toast.error("Failed to load resume data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [reset]);

  const onSubmit = async (data: ResumeFormData) => {
    try {
      const payload = {
        ...data,
        skills: Array.isArray(data.skills) ? data.skills : String(data.skills).split(",").map((s: string) => s.trim()),
      };
      const res = await fetch("/api/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to save");
      toast.success("Resume updated successfully!");
    } catch {
      toast.error("Failed to update resume.");
    }
  };

  return (
    <div className="bg-[#0d1117] min-h-screen p-8 text-gray-300">
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl mx-auto space-y-12">
          <h1 className="text-3xl font-bold text-white mb-8">Manage Resume</h1>

          <fieldset disabled={isLoading} className="space-y-12">
            <ResumeBasicInfo />
            <ResumeExperienceSection />
            <ResumeProjectsSection />
            <ResumeSkillsSection />
            <ResumeEducationSection />
          </fieldset>

          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading} className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

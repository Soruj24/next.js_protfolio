"use client";

import { useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ISettings } from "@/models/Settings";
import { settingsSchema, SettingsFormInput, SettingsFormValues } from "@/lib/schemas/settings";
import AssistantTab from "@/components/admin/settings/AssistantTab";
import PersonalInfoTab from "@/components/admin/settings/PersonalInfoTab";
import SkillsTab from "@/components/admin/settings/SkillsTab";
import ExperiencesTab from "@/components/admin/settings/ExperiencesTab";
import InnovationTab from "@/components/admin/settings/InnovationTab";
import ExpertiseTab from "@/components/admin/settings/ExpertiseTab";
import StandardsTab from "@/components/admin/settings/StandardsTab";
import CaseStudiesTab from "@/components/admin/settings/CaseStudiesTab";
import TestimonialsTab from "@/components/admin/settings/TestimonialsTab";
import GuidelinesTab from "@/components/admin/settings/GuidelinesTab";

interface SettingsFormProps {
  initialData?: ISettings | null;
}

export default function SettingsForm({ initialData }: SettingsFormProps) {
  const [loading, setLoading] = useState(false);

  const defaultValues = initialData
    ? {
        assistant: initialData.assistant || { name: "", purpose: "", contact_recommendation: "" },
        personal_info: initialData.personal_info || { full_name: "", email: "", phone: "", location: "", professional_title: "" },
        technical_skills: {
          specializations: initialData.technical_skills?.specializations?.join(", ") || "",
          core_technologies: initialData.technical_skills?.core_technologies?.join(", ") || "",
        },
        experience: initialData.experience || { professional_experience: "", project_experience: "", focus: "" },
        experiences: initialData.experiences?.map((exp) => ({
          year: exp.year || "",
          role: exp.role || "",
          company: exp.company || "",
          description: exp.description || "",
          technologies: Array.isArray(exp.technologies) ? exp.technologies.join(", ") : (exp.technologies as unknown as string) || "",
        })) || [],
        education: initialData.education || { background: "", additional_info: "" },
        response_guidelines: initialData.response_guidelines || {
          be_concise: true, be_informative: true, professional_tone: true,
          redirect_uncertain_queries: "", language: "English",
        },
        innovation: (initialData.innovation || []).map(item => ({ title: item.title || "", description: item.description || "", icon: item.icon || "", color: item.color || "" })),
        expertise: (initialData.expertise || []).map(exp => ({ title: exp.title || "", description: exp.description || "", icon: exp.icon || "", skills: Array.isArray(exp.skills) ? exp.skills.join(", ") : exp.skills || "", color: exp.color || "" })),
        standards: (initialData.standards || []).map(std => ({ title: std.title || "", description: std.description || "", icon: std.icon || "", metrics: std.metrics || "", features: Array.isArray(std.features) ? std.features.join(", ") : std.features || "" })),
        testimonials: (initialData.testimonials || []).map(t => ({ name: t.name || "", role: t.role || "", content: t.content || "", avatar: t.avatar || "", color: t.color || "" })),
        case_studies: (initialData.case_studies || []).map((cs) => ({
          title: cs.title || "", description: cs.description || "", challenge: cs.challenge || "", solution: cs.solution || "", impact: cs.impact || "",
          technologies: Array.isArray(cs.technologies) ? cs.technologies.join(", ") : (cs.technologies as unknown as string) || "",
          image: cs.image || "",
        })),
      }
    : {
        assistant: { name: "", purpose: "", contact_recommendation: "" },
        personal_info: { full_name: "", email: "", phone: "", location: "", professional_title: "" },
        technical_skills: { specializations: "", core_technologies: "" },
        experience: { professional_experience: "", project_experience: "", focus: "" },
        experiences: [],
        education: { background: "", additional_info: "" },
        response_guidelines: { be_concise: true, be_informative: true, professional_tone: true, redirect_uncertain_queries: "", language: "English" },
        innovation: [],
        expertise: [],
        standards: [],
        testimonials: [],
        case_studies: [],
      };

  const form = useForm<SettingsFormInput>({
    resolver: zodResolver(settingsSchema) as unknown as Resolver<SettingsFormInput>,
    defaultValues: defaultValues as unknown as SettingsFormInput,
  });

  const onSubmit = async (data: SettingsFormInput) => {
    const validatedData = data as unknown as SettingsFormValues;
    setLoading(true);
    try {
      const formattedData = {
        ...validatedData,
        experiences: validatedData.experiences?.map((exp) => ({
          ...exp,
          technologies: typeof exp.technologies === "string" ? exp.technologies.split(",").map((s: string) => s.trim()).filter((s: string) => s !== "") : exp.technologies,
        })),
        expertise: validatedData.expertise?.map((exp) => ({
          ...exp,
          skills: typeof exp.skills === "string" ? exp.skills.split(",").map((s: string) => s.trim()).filter((s: string) => s !== "") : exp.skills,
        })),
        standards: validatedData.standards?.map((std) => ({
          ...std,
          features: typeof std.features === "string" ? std.features.split(",").map((s: string) => s.trim()).filter((s: string) => s !== "") : std.features,
        })),
        testimonials: validatedData.testimonials || [],
        case_studies: validatedData.case_studies?.map((cs) => ({
          ...cs,
          technologies: typeof cs.technologies === "string" ? cs.technologies.split(",").map((s: string) => s.trim()).filter((s: string) => s !== "") : cs.technologies,
        })),
      };

      const response = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) throw new Error("Failed to update settings");
      toast.success("Settings updated successfully");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Settings</h1>
            <p className="text-sm md:text-base text-gray-400">Manage your portfolio and assistant settings.</p>
          </div>
          <Button type="submit" disabled={loading} className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-700 min-h-[44px]">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save Changes
          </Button>
        </div>

        <Tabs defaultValue="assistant" className="w-full">
          <TabsList className="bg-gray-800 border-gray-700 w-full justify-start overflow-x-auto overflow-y-hidden h-auto flex-nowrap p-1 mb-4 custom-scrollbar">
            <TabsTrigger value="assistant" className="flex-shrink-0">Smart Guide</TabsTrigger>
            <TabsTrigger value="personal" className="flex-shrink-0">Personal Info</TabsTrigger>
            <TabsTrigger value="skills" className="flex-shrink-0">Skills</TabsTrigger>
            <TabsTrigger value="experiences" className="flex-shrink-0">Experiences</TabsTrigger>
            <TabsTrigger value="education" className="flex-shrink-0">Education</TabsTrigger>
            <TabsTrigger value="innovation" className="flex-shrink-0">Innovation</TabsTrigger>
            <TabsTrigger value="expertise" className="flex-shrink-0">Expertise</TabsTrigger>
            <TabsTrigger value="standards" className="flex-shrink-0">Standards</TabsTrigger>
            <TabsTrigger value="case_studies" className="flex-shrink-0">Case Studies</TabsTrigger>
            <TabsTrigger value="testimonials" className="flex-shrink-0">Testimonials</TabsTrigger>
            <TabsTrigger value="guidelines" className="flex-shrink-0">Guidelines</TabsTrigger>
          </TabsList>

          <TabsContent value="assistant" className="space-y-4 mt-4"><AssistantTab /></TabsContent>
          <TabsContent value="personal" className="space-y-4 mt-4"><PersonalInfoTab /></TabsContent>
          <TabsContent value="skills" className="space-y-4 mt-4"><SkillsTab /></TabsContent>
          <TabsContent value="experiences" className="space-y-4 mt-4"><ExperiencesTab /></TabsContent>
          <TabsContent value="education" className="space-y-4 mt-4"><PersonalInfoTab /></TabsContent>
          <TabsContent value="innovation" className="space-y-4 mt-4"><InnovationTab /></TabsContent>
          <TabsContent value="expertise" className="space-y-4 mt-4"><ExpertiseTab /></TabsContent>
          <TabsContent value="standards" className="space-y-4 mt-4"><StandardsTab /></TabsContent>
          <TabsContent value="case_studies" className="space-y-4 mt-4"><CaseStudiesTab /></TabsContent>
          <TabsContent value="testimonials" className="space-y-4 mt-4"><TestimonialsTab /></TabsContent>
          <TabsContent value="guidelines" className="space-y-4 mt-4"><GuidelinesTab /></TabsContent>
        </Tabs>
      </form>
    </Form>
  );
}

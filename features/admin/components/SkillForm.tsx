"use client";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { ISkillCategory } from "@/models/Skill";
import { skillSchema, SkillFormData } from "@/lib/schemas/skill";
import SkillBasicFields from "./SkillBasicFields";
import SkillNodesArray from "./SkillNodesArray";

interface SkillFormProps {
  category?: ISkillCategory | null;
  onSuccess: () => void;
}

export default function SkillForm({ category, onSuccess }: SkillFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SkillFormData>({
    resolver: zodResolver(skillSchema),
    defaultValues: category ? {
      title: category.title,
      icon: category.icon,
      skills: category.skills,
    } : {
      title: "",
      icon: "💻",
      skills: [{ name: "", level: 80, icon: "⚡", color: "#3B82F6", description: "" }],
    },
  });

  const onSubmit = async (data: SkillFormData) => {
    setIsLoading(true);
    try {
      const url = category ? `/api/skills/${category._id}` : "/api/skills";
      const method = category ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });

      if (res.ok) {
        toast.success(category ? "Skill category updated" : "Skill category created");
        onSuccess();
      } else {
        const err = await res.json();
        toast.error(err.error || "Something went wrong");
      }
    } catch {
      toast.error("Error saving skills");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white/5 p-4 sm:p-8 rounded-3xl border border-white/10 backdrop-blur-xl">
          <SkillBasicFields />
          <SkillNodesArray />

          <div className="flex justify-end pt-8">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-600 to-pink-700 hover:from-purple-500 hover:to-pink-600 text-white px-10 py-6 rounded-2xl font-bold text-lg shadow-lg shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Synchronizing...</span>
                </div>
              ) : category ? (
                "Update Skill Matrix"
              ) : (
                "Initialize Category"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
}

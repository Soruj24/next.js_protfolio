'use client';

import { useState, useEffect } from "react";
import {
  useForm,
  useFieldArray,
  Controller,
  UseFormRegister,
  Control,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Trash2, PlusCircle } from "lucide-react";

// Zod Schema for Validation
const resumeSchema = z.object({
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

type ResumeFormData = z.infer<typeof resumeSchema>;

const inputStyles =
  "bg-transparent border-gray-700 border rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500";

// Reusable Section Component
const SectionWrapper = ({ title, onAppend, children }: { title: string, onAppend: () => void, children: React.ReactNode }) => (
    <div className="space-y-4">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-white">{title}</h2>
            <Button type="button" onClick={onAppend} className="bg-gray-800 border border-gray-700 hover:bg-gray-700 text-sm font-semibold py-2 px-4 rounded-lg flex items-center gap-2">
                <PlusCircle size={16} />
                Add {title}
            </Button>
        </div>
        <div className="space-y-6">{children}</div>
    </div>
);

// Reusable FieldSet Component
const FieldSetWrapper = ({ onRemove, children }: { onRemove: () => void, children: React.ReactNode }) => (
    <div className="p-6 bg-[#161b22] border border-gray-800 rounded-lg space-y-4 relative">
        <Button type="button" variant="ghost" onClick={onRemove} className="absolute top-3 right-3 text-gray-500 hover:text-red-500 p-1 h-auto">
            <Trash2 size={18} />
        </Button>
        {children}
    </div>
);

export default function ResumeAdminPage() {
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    control,
    handleSubmit,
    reset,
  } = useForm<ResumeFormData>({
    resolver: zodResolver(resumeSchema),
    defaultValues: { experience: [], projects: [], skills: [], education: [] },
  });

  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({ control, name: "experience" });
  const { fields: projFields, append: appendProj, remove: removeProj } = useFieldArray({ control, name: "projects" });
  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({ control, name: "education" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/resume");
        const data = await res.json();
        if (data) {
          data.skills = Array.isArray(data.skills) ? data.skills : data.skills ? String(data.skills).split(",").map((s: string) => s.trim()) : [];
          reset(data);
        }
      } catch (error) {
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
    } catch (error) {
      toast.error("Failed to update resume.");
    }
  };



  return (
    <div className="bg-[#0d1117] min-h-screen p-8 text-gray-300">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl mx-auto space-y-12">
        <h1 className="text-3xl font-bold text-white mb-8">Manage Resume</h1>

        <fieldset disabled={isLoading} className="space-y-12">
          {/* Basic Info */}
          <div className="space-y-6 p-6 bg-[#161b22] border border-gray-800 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input placeholder="Full Name" {...register("name")} className={inputStyles} />
            <Input placeholder="Professional Title" {...register("title")} className={inputStyles} />
            <Input placeholder="Email" {...register("contact.email")} className={inputStyles} />
            <Input placeholder="Phone" {...register("contact.phone")} className={inputStyles} />
            <Input placeholder="Location" {...register("contact.location")} className={`${inputStyles} md:col-span-2`} />
          </div>
          <Textarea placeholder="Summary" {...register("summary")} className={`${inputStyles} min-h-[100px]`} />
        </div>

        {/* Experience */}
        <SectionWrapper title="Experience" onAppend={() => appendExp({ role: "", company: "", duration: "", responsibilities: [] })}>
            {expFields.map((field, index) => (
                <FieldSetWrapper key={field.id} onRemove={() => removeExp(index)}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input placeholder="Role" {...register(`experience.${index}.role`)} className={`${inputStyles} md:col-span-2`} />
                        <Input placeholder="Duration" {...register(`experience.${index}.duration`)} className={inputStyles} />
                    </div>
                    <Input placeholder="Company" {...register(`experience.${index}.company`)} className={inputStyles} />
                    <Controller
                        name={`experience.${index}.responsibilities`}
                        control={control}
                        render={({ field: controllerField }) => (
                            <Textarea
                                placeholder="Responsibilities (one per line)"
                                className={`${inputStyles} min-h-[80px]`}
                                value={Array.isArray(controllerField.value) ? controllerField.value.join('\n') : ''}
                                onChange={(e) => controllerField.onChange(e.target.value.split('\n'))}
                            />
                        )}
                    />
                </FieldSetWrapper>
            ))}
        </SectionWrapper>

        {/* Projects */}
        <SectionWrapper title="Projects" onAppend={() => appendProj({ title: "", description: "", technologies: [] })}>
            {projFields.map((field, index) => (
                <FieldSetWrapper key={field.id} onRemove={() => removeProj(index)}>
                    <Input placeholder="Project Title" {...register(`projects.${index}.title`)} className={inputStyles} />
                    <Textarea placeholder="Description" {...register(`projects.${index}.description`)} className={`${inputStyles} min-h-[80px]`} />
                    <Controller
                        name={`projects.${index}.technologies`}
                        control={control}
                        render={({ field: controllerField }) => (
                            <Input
                                placeholder="Technologies (comma separated)"
                                className={inputStyles}
                                value={Array.isArray(controllerField.value) ? controllerField.value.join(', ') : ''}
                                onChange={(e) => controllerField.onChange(e.target.value.split(',').map(s => s.trim()))}
                            />
                        )}
                    />
                </FieldSetWrapper>
            ))}
        </SectionWrapper>

        {/* Skills */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Skills</h2>
          <div className="p-6 bg-[#161b22] border border-gray-800 rounded-lg">
            <Controller
              name="skills"
              control={control}
              render={({ field }) => (
                <Textarea
                  placeholder="Skills (comma separated)"
                  className={`${inputStyles} min-h-[80px]`}
                  value={Array.isArray(field.value) ? field.value.join(", ") : ""}
                  onChange={(e) => field.onChange(e.target.value.split(",").map(s => s.trim()))}
                />
              )}
            />
          </div>
        </div>

        {/* Education */}
        <SectionWrapper title="Education" onAppend={() => appendEdu({ institution: "", degree: "", year: "" })}>
            {eduFields.map((field, index) => (
                <FieldSetWrapper key={field.id} onRemove={() => removeEdu(index)}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input placeholder="Institution" {...register(`education.${index}.institution`)} className={`${inputStyles} md:col-span-2`} />
                        <Input placeholder="Degree" {...register(`education.${index}.degree`)} className={inputStyles} />
                        <Input placeholder="Year" {...register(`education.${index}.year`)} className={inputStyles} />
                    </div>
                </FieldSetWrapper>
            ))}
        </SectionWrapper>
        </fieldset>

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading} className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}

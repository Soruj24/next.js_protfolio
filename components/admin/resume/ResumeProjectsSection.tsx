"use client";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ResumeFormSection from "./ResumeFormSection";
import ResumeFieldSet from "./ResumeFieldSet";
import type { ResumeFormData } from "@/lib/schemas/resume";

const inputStyles = "bg-transparent border-gray-700 border rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500";

export default function ResumeProjectsSection() {
  const { control, register } = useFormContext<ResumeFormData>();
  const { fields, append, remove } = useFieldArray({ control, name: "projects" });

  return (
    <ResumeFormSection title="Projects" onAppend={() => append({ title: "", description: "", technologies: [] })}>
      {fields.map((field, index) => (
        <ResumeFieldSet key={field.id} onRemove={() => remove(index)}>
          <Input placeholder="Project Title" {...register(`projects.${index}.title`)} className={inputStyles} />
          <Textarea placeholder="Description" {...register(`projects.${index}.description`)} className={`${inputStyles} min-h-[80px]`} />
          <Controller
            name={`projects.${index}.technologies`}
            control={control}
            render={({ field: cf }) => (
              <Input
                placeholder="Technologies (comma separated)"
                className={inputStyles}
                value={Array.isArray(cf.value) ? cf.value.join(", ") : ""}
                onChange={(e) => cf.onChange(e.target.value.split(",").map((s) => s.trim()))}
              />
            )}
          />
        </ResumeFieldSet>
      ))}
    </ResumeFormSection>
  );
}

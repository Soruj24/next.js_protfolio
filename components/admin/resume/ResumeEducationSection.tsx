"use client";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import ResumeFormSection from "./ResumeFormSection";
import ResumeFieldSet from "./ResumeFieldSet";
import type { ResumeFormData } from "@/lib/schemas/resume";

const inputStyles = "bg-transparent border-gray-700 border rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500";

export default function ResumeEducationSection() {
  const { control, register } = useFormContext<ResumeFormData>();
  const { fields, append, remove } = useFieldArray({ control, name: "education" });

  return (
    <ResumeFormSection title="Education" onAppend={() => append({ institution: "", degree: "", year: "" })}>
      {fields.map((field, index) => (
        <ResumeFieldSet key={field.id} onRemove={() => remove(index)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input placeholder="Institution" {...register(`education.${index}.institution`)} className={`${inputStyles} md:col-span-2`} />
            <Input placeholder="Degree" {...register(`education.${index}.degree`)} className={inputStyles} />
            <Input placeholder="Year" {...register(`education.${index}.year`)} className={inputStyles} />
          </div>
        </ResumeFieldSet>
      ))}
    </ResumeFormSection>
  );
}

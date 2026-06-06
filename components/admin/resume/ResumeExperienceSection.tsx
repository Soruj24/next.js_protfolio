"use client";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ResumeFormSection from "./ResumeFormSection";
import ResumeFieldSet from "./ResumeFieldSet";
import type { ResumeFormData } from "@/lib/schemas/resume";

const inputStyles = "bg-transparent border-gray-700 border rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500";

export default function ResumeExperienceSection() {
  const { control, register } = useFormContext<ResumeFormData>();
  const { fields, append, remove } = useFieldArray({ control, name: "experience" });

  return (
    <ResumeFormSection title="Experience" onAppend={() => append({ role: "", company: "", duration: "", responsibilities: [] })}>
      {fields.map((field, index) => (
        <ResumeFieldSet key={field.id} onRemove={() => remove(index)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input placeholder="Role" {...register(`experience.${index}.role`)} className={`${inputStyles} md:col-span-2`} />
            <Input placeholder="Duration" {...register(`experience.${index}.duration`)} className={inputStyles} />
          </div>
          <Input placeholder="Company" {...register(`experience.${index}.company`)} className={inputStyles} />
          <Controller
            name={`experience.${index}.responsibilities`}
            control={control}
            render={({ field: cf }) => (
              <Textarea
                placeholder="Responsibilities (one per line)"
                className={`${inputStyles} min-h-[80px]`}
                value={Array.isArray(cf.value) ? cf.value.join("\n") : ""}
                onChange={(e) => cf.onChange(e.target.value.split("\n"))}
              />
            )}
          />
        </ResumeFieldSet>
      ))}
    </ResumeFormSection>
  );
}

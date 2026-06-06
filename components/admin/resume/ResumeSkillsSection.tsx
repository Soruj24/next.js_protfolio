"use client";
import { useFormContext, Controller } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import type { ResumeFormData } from "@/lib/schemas/resume";

const inputStyles = "bg-transparent border-gray-700 border rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500";

export default function ResumeSkillsSection() {
  const { control } = useFormContext<ResumeFormData>();

  return (
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
              onChange={(e) => field.onChange(e.target.value.split(",").map((s) => s.trim()))}
            />
          )}
        />
      </div>
    </div>
  );
}

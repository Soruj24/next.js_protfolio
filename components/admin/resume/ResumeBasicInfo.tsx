"use client";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ResumeFormData } from "@/lib/schemas/resume";

const inputStyles = "bg-transparent border-gray-700 border rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500";

export default function ResumeBasicInfo() {
  const { register } = useFormContext<ResumeFormData>();

  return (
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
  );
}

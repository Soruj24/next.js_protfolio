"use client";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { SkillFormData } from "@/lib/schemas/skill";

export default function SkillBasicFields() {
  const { control } = useFormContext<SkillFormData>();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300 font-medium">Category Title</FormLabel>
            <FormControl>
              <Input
                placeholder="e.g. Frontend Development"
                {...field}
                className="bg-black/40 border-white/10 text-white focus:border-purple-500/50 transition-colors h-12"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="icon"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300 font-medium">Category Icon (Emoji)</FormLabel>
            <FormControl>
              <Input
                placeholder="e.g. 🎨"
                {...field}
                className="bg-black/40 border-white/10 text-white focus:border-purple-500/50 transition-colors h-12"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

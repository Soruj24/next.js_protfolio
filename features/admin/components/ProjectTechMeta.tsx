"use client";

import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProjectFormValues } from "@/lib/schemas/project";

export default function ProjectTechMeta() {
  const { control } = useFormContext<ProjectFormValues>();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField control={control} name="technologies" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300 font-medium">Technologies (comma separated)</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Next.js, TypeScript, Tailwind, OpenAI" className="bg-black/40 border-white/10 text-white focus:border-cyan-500/50 transition-colors h-12" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={control} name="features" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300 font-medium">Key Features (comma separated)</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Responsive Design, Real-time Data, Interactive UI" className="bg-black/40 border-white/10 text-white focus:border-cyan-500/50 transition-colors h-12" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField control={control} name="status" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300 font-medium">Development Status</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-black/40 border-white/10 text-white h-12">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-[#030712] border-white/10 text-white">
                <SelectItem value="completed">Production Ready</SelectItem>
                <SelectItem value="in-progress">In Development</SelectItem>
                <SelectItem value="planned">Beta / Planned</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={control} name="difficulty" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300 font-medium">Technical Complexity</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-black/40 border-white/10 text-white h-12">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-[#030712] border-white/10 text-white">
                <SelectItem value="beginner">Foundational</SelectItem>
                <SelectItem value="medium">Intermediate</SelectItem>
                <SelectItem value="intermediate">Advanced Logic</SelectItem>
                <SelectItem value="advanced">Expert Systems</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={control} name="duration" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300 font-medium">Development Time</FormLabel>
            <FormControl>
              <Input {...field} placeholder="e.g. 3 Months" className="bg-black/40 border-white/10 text-white focus:border-cyan-500/50 transition-colors h-12" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField control={control} name="teamSize" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300 font-medium">Core Team Size</FormLabel>
            <FormControl>
              <Input {...field} placeholder="1" className="bg-black/40 border-white/10 text-white focus:border-cyan-500/50 transition-colors h-12" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={control} name="screenshots" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300 font-medium">Gallery URLs (comma separated)</FormLabel>
            <FormControl>
              <Input {...field} placeholder="url1, url2, url3" className="bg-black/40 border-white/10 text-white focus:border-cyan-500/50 transition-colors h-12" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>
    </>
  );
}

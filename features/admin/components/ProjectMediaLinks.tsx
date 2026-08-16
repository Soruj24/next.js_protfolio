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
import { ProjectFormValues } from "@/lib/schemas/project";

export default function ProjectMediaLinks() {
  const { control } = useFormContext<ProjectFormValues>();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField control={control} name="image" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300 font-medium">Main Image URL</FormLabel>
            <FormControl>
              <Input {...field} placeholder="https://images.unsplash.com/..." className="bg-black/40 border-white/10 text-white focus:border-cyan-500/50 transition-colors h-12" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={control} name="emoji" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300 font-medium">Project Emoji</FormLabel>
            <FormControl>
              <Input {...field} placeholder="🚀" className="bg-black/40 border-white/10 text-white focus:border-cyan-500/50 transition-colors h-12" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField control={control} name="githubUrl" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300 font-medium">GitHub Repository URL</FormLabel>
            <FormControl>
              <Input {...field} placeholder="https://github.com/..." className="bg-black/40 border-white/10 text-white focus:border-cyan-500/50 transition-colors h-12" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={control} name="liveUrl" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300 font-medium">Live Deployment URL</FormLabel>
            <FormControl>
              <Input {...field} placeholder="https://vercel.app/..." className="bg-black/40 border-white/10 text-white focus:border-cyan-500/50 transition-colors h-12" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField control={control} name="documentationUrl" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300 font-medium">Documentation URL</FormLabel>
            <FormControl>
              <Input {...field} placeholder="https://docs.example.com/..." className="bg-black/40 border-white/10 text-white focus:border-cyan-500/50 transition-colors h-12" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={control} name="caseStudyUrl" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300 font-medium">Case Study URL</FormLabel>
            <FormControl>
              <Input {...field} placeholder="https://medium.com/..." className="bg-black/40 border-white/10 text-white focus:border-cyan-500/50 transition-colors h-12" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField control={control} name="demoVideoUrl" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300 font-medium">Demo Video URL</FormLabel>
            <FormControl>
              <Input {...field} placeholder="https://youtube.com/..." className="bg-black/40 border-white/10 text-white focus:border-cyan-500/50 transition-colors h-12" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>
    </>
  );
}

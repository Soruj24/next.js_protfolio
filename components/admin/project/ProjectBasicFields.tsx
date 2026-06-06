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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProjectFormValues } from "@/lib/schemas/project";
import { IProject } from "@/models/Project";

interface ProjectBasicFieldsProps {
  project?: IProject | null;
}

export default function ProjectBasicFields({ project }: ProjectBasicFieldsProps) {
  const { control, formState: { errors } } = useFormContext<ProjectFormValues>();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className="text-gray-300 font-medium">Project Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g. Luxe E-Commerce Platform"
                  className="bg-black/40 border-white/10 text-white focus:border-cyan-500/50 transition-colors h-12"
                  onChange={(e) => {
                    field.onChange(e);
                    if (!project) {
                      const slug = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                      const idField = document.querySelector<HTMLInputElement>('input[name="id"]');
                      if (idField) {
                        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
                        nativeInputValueSetter?.call(idField, slug);
                        idField.dispatchEvent(new Event('input', { bubbles: true }));
                      }
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300 font-medium">Slug (ID)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="luxe-ecommerce-platform" className="bg-black/40 border-white/10 text-white focus:border-cyan-500/50 transition-colors h-12" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField control={control} name="description" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300 font-medium">One-line Summary</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Briefly describe the project's core purpose" className="bg-black/40 border-white/10 text-white focus:border-cyan-500/50 transition-colors h-12" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={control} name="category" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300 font-medium">Category</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-black/40 border-white/10 text-white h-12">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-[#030712] border-white/10 text-white">
                <SelectItem value="SaaS">SaaS / Product</SelectItem>
                <SelectItem value="Fullstack">Fullstack Development</SelectItem>
                <SelectItem value="Mobile">Mobile Application</SelectItem>
                <SelectItem value="Frontend">Frontend / UI/UX</SelectItem>
                <SelectItem value="E-Commerce">E-Commerce</SelectItem>
                <SelectItem value="Portfolio">Portfolio</SelectItem>
                <SelectItem value="Analytics">Analytics</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <FormField control={control} name="fullDescription" render={({ field }) => (
        <FormItem>
          <FormLabel className="text-gray-300 font-medium">Detailed Case Study</FormLabel>
          <FormControl>
            <Textarea {...field} placeholder="Explain the problem, solution, and your specific role..." className="bg-black/40 border-white/10 text-white focus:border-cyan-500/50 transition-colors min-h-[150px] resize-none" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
    </>
  );
}

"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { SettingsFormInput } from "@/lib/schemas/settings";

export default function CaseStudiesTab() {
  const { control } = useFormContext<SettingsFormInput>();
  const { fields, append, remove } = useFieldArray({ control, name: "case_studies" });

  return (
    <Card className="bg-gray-800 border-gray-700 shadow-xl overflow-hidden">
      <CardHeader className="p-4 sm:p-6 border-b border-gray-700 bg-gray-800/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <CardTitle className="text-xl md:text-2xl text-white">Technical Case Studies</CardTitle>
          <CardDescription className="text-gray-400">Deep dives into complex architectural solutions</CardDescription>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ title: "", description: "", challenge: "", solution: "", impact: "", technologies: "", image: "" })}
          className="w-full sm:w-auto bg-gray-800 border-gray-700 text-white hover:bg-gray-700 min-h-[40px]"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Case Study
        </Button>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 sm:p-6 border border-gray-700 rounded-xl space-y-4 relative bg-gray-900/50 shadow-inner">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Case Study #{index + 1}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-full h-8 w-8 p-0"
                onClick={() => remove(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={control} name={`case_studies.${index}.title`} render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Project Title</FormLabel>
                  <FormControl><Input {...field} className="bg-gray-900 border-gray-700 text-white" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={control} name={`case_studies.${index}.image`} render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Image URL</FormLabel>
                  <FormControl><Input {...field} placeholder="/projects/image.jpg" className="bg-gray-900 border-gray-700 text-white" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={control} name={`case_studies.${index}.description`} render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200">Short Description</FormLabel>
                <FormControl><Input {...field} className="bg-gray-900 border-gray-700 text-white" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField control={control} name={`case_studies.${index}.challenge`} render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">The Challenge</FormLabel>
                  <FormControl><Textarea {...field} className="bg-gray-900 border-gray-700 text-white" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={control} name={`case_studies.${index}.solution`} render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">The Solution</FormLabel>
                  <FormControl><Textarea {...field} className="bg-gray-900 border-gray-700 text-white" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={control} name={`case_studies.${index}.impact`} render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">The Impact</FormLabel>
                  <FormControl><Textarea {...field} className="bg-gray-900 border-gray-700 text-white" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={control} name={`case_studies.${index}.technologies`} render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200">Technologies (comma separated)</FormLabel>
                <FormControl><Input {...field} className="bg-gray-900 border-gray-700 text-white" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

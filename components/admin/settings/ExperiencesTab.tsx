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
} from "@/components/ui/card";
import { SettingsFormInput } from "@/lib/schemas/settings";

export default function ExperiencesTab() {
  const { control } = useFormContext<SettingsFormInput>();
  const { fields, append, remove } = useFieldArray({ control, name: "experiences" });

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold text-white">Work Experiences</h2>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ year: "", role: "", company: "", description: "", technologies: "" })}
          className="w-full sm:w-auto bg-gray-800 border-gray-700 text-white hover:bg-gray-700 min-h-[40px]"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Experience
        </Button>
      </div>

      {fields.map((field, index) => (
        <Card key={field.id} className="bg-gray-800 border-gray-700 shadow-lg overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 border-b border-gray-700 bg-gray-800/50">
            <CardTitle className="text-sm font-bold text-cyan-400 uppercase tracking-wider">
              Experience Node #{index + 1}
            </CardTitle>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => remove(index)}
              className="text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-full h-8 w-8 p-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={control} name={`experiences.${index}.year`} render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200">Year (e.g., 2023 - Present)</FormLabel>
                <FormControl><Input {...field} className="bg-gray-900 border-gray-700 text-white" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={control} name={`experiences.${index}.role`} render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200">Role</FormLabel>
                <FormControl><Input {...field} className="bg-gray-900 border-gray-700 text-white" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={control} name={`experiences.${index}.company`} render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200">Company</FormLabel>
                <FormControl><Input {...field} className="bg-gray-900 border-gray-700 text-white" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={control} name={`experiences.${index}.technologies`} render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200">Technologies (comma separated)</FormLabel>
                <FormControl><Input {...field} className="bg-gray-900 border-gray-700 text-white" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={control} name={`experiences.${index}.description`} render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel className="text-gray-200">Description</FormLabel>
                <FormControl><Textarea {...field} className="bg-gray-900 border-gray-700 text-white min-h-[100px]" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </CardContent>
        </Card>
      ))}
    </>
  );
}

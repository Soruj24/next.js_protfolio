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
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { SettingsFormInput } from "@/lib/schemas/settings";

export default function SkillsTab() {
  const { control } = useFormContext<SettingsFormInput>();

  return (
    <Card className="bg-gray-800 border-gray-700 shadow-xl overflow-hidden">
      <CardHeader className="p-4 sm:p-6 border-b border-gray-700 bg-gray-800/50">
        <CardTitle className="text-xl md:text-2xl text-white">Technical Skills</CardTitle>
        <CardDescription className="text-gray-400">
          Manage your core competencies and focus.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 space-y-4">
        <FormField control={control} name="technical_skills.specializations" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-200">Specializations (comma separated)</FormLabel>
            <FormControl><Input {...field} className="bg-gray-900 border-gray-700 text-white" placeholder="React, Node.js, Python..." /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={control} name="technical_skills.core_technologies" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-200">Core Technologies (comma separated)</FormLabel>
            <FormControl><Input {...field} className="bg-gray-900 border-gray-700 text-white" placeholder="JavaScript, TypeScript, MongoDB..." /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={control} name="experience.focus" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-200">Current Focus</FormLabel>
            <FormControl><Input {...field} className="bg-gray-900 border-gray-700 text-white" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </CardContent>
    </Card>
  );
}

"use client";

import { useFormContext } from "react-hook-form";
import { Plus } from "lucide-react";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
  FormDescription,
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

export default function PersonalInfoTab() {
  const { control } = useFormContext<SettingsFormInput>();

  return (
    <>
      <Card className="bg-gray-800 border-gray-700 shadow-xl overflow-hidden">
        <CardHeader className="p-4 sm:p-6 border-b border-gray-700 bg-gray-800/50">
          <CardTitle className="text-xl md:text-2xl text-white flex items-center gap-2">
            <Plus className="w-5 h-5 text-cyan-400" />
            Personal Information
          </CardTitle>
          <CardDescription className="text-gray-400">
            Your public profile details.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={control} name="personal_info.full_name" render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-200">Full Name</FormLabel>
              <FormControl><Input {...field} className="bg-gray-900 border-gray-700 text-white" /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={control} name="personal_info.email" render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-200">Email</FormLabel>
              <FormControl><Input {...field} className="bg-gray-900 border-gray-700 text-white" /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={control} name="personal_info.phone" render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-200">Phone</FormLabel>
              <FormControl><Input {...field} className="bg-gray-900 border-gray-700 text-white" /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={control} name="personal_info.professional_title" render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-200">Professional Title</FormLabel>
              <FormControl><Input {...field} className="bg-gray-900 border-gray-700 text-white" /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={control} name="personal_info.location" render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-200">Location</FormLabel>
              <FormControl><Input {...field} className="bg-gray-900 border-gray-700 text-white" /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={control} name="personal_info.linkedin" render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-200">LinkedIn URL</FormLabel>
              <FormControl><Input {...field} placeholder="https://linkedin.com/in/username" className="bg-gray-900 border-gray-700 text-white" /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={control} name="personal_info.github" render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className="text-gray-200">GitHub URL</FormLabel>
              <FormControl><Input {...field} placeholder="https://github.com/username" className="bg-gray-900 border-gray-700 text-white" /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700 shadow-xl overflow-hidden">
        <CardHeader className="p-4 sm:p-6 border-b border-gray-700 bg-gray-800/50">
          <CardTitle className="text-xl md:text-2xl text-white">Education</CardTitle>
          <CardDescription className="text-gray-400">Update your educational background.</CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <FormField control={control} name="education.background" render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-200">Background</FormLabel>
              <FormControl><Input {...field} className="bg-gray-900 border-gray-700 text-white" /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={control} name="education.additional_info" render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-200">Additional Info</FormLabel>
              <FormControl><Textarea {...field} className="bg-gray-900 border-gray-700 text-white" /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </CardContent>
      </Card>
    </>
  );
}

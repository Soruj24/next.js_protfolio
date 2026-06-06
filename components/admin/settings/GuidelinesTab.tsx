"use client";

import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { SettingsFormInput } from "@/lib/schemas/settings";

export default function GuidelinesTab() {
  const { control } = useFormContext<SettingsFormInput>();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700">
        <FormField control={control} name="response_guidelines.be_concise" render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between w-full">
            <div>
              <FormLabel className="text-gray-200">Be Concise</FormLabel>
              <p className="text-sm text-gray-400">Keep responses brief and to the point</p>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )} />
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700">
        <FormField control={control} name="response_guidelines.be_informative" render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between w-full">
            <div>
              <FormLabel className="text-gray-200">Be Informative</FormLabel>
              <p className="text-sm text-gray-400">Provide detailed and helpful information</p>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )} />
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700">
        <FormField control={control} name="response_guidelines.professional_tone" render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between w-full">
            <div>
              <FormLabel className="text-gray-200">Professional Tone</FormLabel>
              <p className="text-sm text-gray-400">Maintain a professional communication style</p>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )} />
      </div>

      <FormField control={control} name="response_guidelines.redirect_uncertain_queries" render={({ field }) => (
        <FormItem className="p-4 bg-gray-800/50 rounded-xl border border-gray-700">
          <FormLabel className="text-gray-200">Uncertain Query Redirect</FormLabel>
          <FormControl>
            <Input {...field} placeholder="Contact form or email address" className="bg-gray-900 border-gray-700 text-white mt-2" />
          </FormControl>
          <FormDescription className="text-gray-500">
            Where to redirect users when the AI cannot answer their question.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )} />

      <FormField control={control} name="response_guidelines.language" render={({ field }) => (
        <FormItem className="p-4 bg-gray-800/50 rounded-xl border border-gray-700">
          <FormLabel className="text-gray-200">Preferred Language</FormLabel>
          <FormControl>
            <Input {...field} className="bg-gray-900 border-gray-700 text-white mt-2" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
    </div>
  );
}

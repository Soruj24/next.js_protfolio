"use client";

import { useFormContext } from "react-hook-form";
import { Save } from "lucide-react";
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

export default function AssistantTab() {
  const { control } = useFormContext<SettingsFormInput>();

  return (
    <Card className="bg-gray-800 border-gray-700 shadow-xl overflow-hidden">
      <CardHeader className="p-4 sm:p-6 border-b border-gray-700 bg-gray-800/50">
        <CardTitle className="text-xl md:text-2xl text-white flex items-center gap-2">
          <Save className="w-5 h-5 text-cyan-400" />
          Smart Guide Configuration
        </CardTitle>
        <CardDescription className="text-gray-400">
          Configure your portfolio&apos;s interactive guide and its purpose.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 space-y-4">
        <FormField
          control={control}
          name="assistant.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-200">Guide Name</FormLabel>
              <FormControl>
                <Input {...field} className="bg-gray-900 border-gray-700 text-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="assistant.purpose"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-200">Guide Purpose</FormLabel>
              <FormControl>
                <Textarea {...field} className="bg-gray-900 border-gray-700 text-white min-h-[100px]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="assistant.contact_recommendation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-200">Contact Recommendation</FormLabel>
              <FormControl>
                <Input {...field} className="bg-gray-900 border-gray-700 text-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}

"use client";

import { FileText } from "lucide-react";
import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  settingsSchema,
  SettingsFormInput,
} from "@/lib/schemas/settings";
import { getSettingsDefaultValues } from "@/lib/services/settings-defaults";
import AssistantTab from "@/features/admin/components/AssistantTab";
import PersonalInfoTab from "@/features/admin/components/PersonalInfoTab";
import SkillsTab from "@/features/admin/components/SkillsTab";
import ExperiencesTab from "@/features/admin/components/ExperiencesTab";
import InnovationTab from "@/features/admin/components/InnovationTab";
import ExpertiseTab from "@/features/admin/components/ExpertiseTab";
import StandardsTab from "@/features/admin/components/StandardsTab";
import CaseStudiesTab from "@/features/admin/components/CaseStudiesTab";
import TestimonialsTab from "@/features/admin/components/TestimonialsTab";
import GuidelinesTab from "@/features/admin/components/GuidelinesTab";
import { ISettings } from "@/models/Settings";

interface ContentSectionProps {
  initialData?: ISettings | Record<string, unknown> | null;
}

export default function ContentSection({ initialData }: ContentSectionProps) {
  const defaultValues = getSettingsDefaultValues(
    initialData as ISettings | null | undefined
  );

  const form = useForm<SettingsFormInput>({
    resolver: zodResolver(settingsSchema) as unknown as Resolver<SettingsFormInput>,
    defaultValues: defaultValues as unknown as SettingsFormInput,
  });

  return (
    <div className="space-y-6 animate-fade-in-up">
      <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-800 pb-5">
          <CardTitle className="text-white flex items-center gap-2 text-lg">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
              <FileText size={16} className="text-white" />
            </div>
            Portfolio Content
          </CardTitle>
          <CardDescription>
            Manage your portfolio content, skills, experiences, and more
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={(e) => e.preventDefault()}>
              <Tabs defaultValue="assistant" className="w-full">
                <TabsList className="bg-gray-800 border-gray-700 w-full justify-start overflow-x-auto overflow-y-hidden h-auto flex-nowrap p-1 mb-4">
                  <TabsTrigger value="assistant" className="flex-shrink-0">Smart Guide</TabsTrigger>
                  <TabsTrigger value="personal" className="flex-shrink-0">Personal Info</TabsTrigger>
                  <TabsTrigger value="skills" className="flex-shrink-0">Skills</TabsTrigger>
                  <TabsTrigger value="experiences" className="flex-shrink-0">Experiences</TabsTrigger>
                  <TabsTrigger value="innovation" className="flex-shrink-0">Innovation</TabsTrigger>
                  <TabsTrigger value="expertise" className="flex-shrink-0">Expertise</TabsTrigger>
                  <TabsTrigger value="standards" className="flex-shrink-0">Standards</TabsTrigger>
                  <TabsTrigger value="case_studies" className="flex-shrink-0">Case Studies</TabsTrigger>
                  <TabsTrigger value="testimonials" className="flex-shrink-0">Testimonials</TabsTrigger>
                  <TabsTrigger value="guidelines" className="flex-shrink-0">Guidelines</TabsTrigger>
                </TabsList>

                <TabsContent value="assistant" className="space-y-4 mt-4"><AssistantTab /></TabsContent>
                <TabsContent value="personal" className="space-y-4 mt-4"><PersonalInfoTab /></TabsContent>
                <TabsContent value="skills" className="space-y-4 mt-4"><SkillsTab /></TabsContent>
                <TabsContent value="experiences" className="space-y-4 mt-4"><ExperiencesTab /></TabsContent>
                <TabsContent value="innovation" className="space-y-4 mt-4"><InnovationTab /></TabsContent>
                <TabsContent value="expertise" className="space-y-4 mt-4"><ExpertiseTab /></TabsContent>
                <TabsContent value="standards" className="space-y-4 mt-4"><StandardsTab /></TabsContent>
                <TabsContent value="case_studies" className="space-y-4 mt-4"><CaseStudiesTab /></TabsContent>
                <TabsContent value="testimonials" className="space-y-4 mt-4"><TestimonialsTab /></TabsContent>
                <TabsContent value="guidelines" className="space-y-4 mt-4"><GuidelinesTab /></TabsContent>
              </Tabs>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useForm, useFieldArray, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Save, Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ISettings } from "@/models/Settings";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const settingsSchema = z.object({
  assistant: z.object({
    name: z.string().min(2, "Name is required"),
    purpose: z.string().min(10, "Purpose description is required"),
    contact_recommendation: z.string(),
  }),
  personal_info: z.object({
    full_name: z.string().min(2, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string(),
    location: z.string(),
    professional_title: z.string(),
  }),
  technical_skills: z.object({
    specializations: z.string().transform((val) =>
      val
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s !== "")
    ),
    core_technologies: z.string().transform((val) =>
      val
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s !== "")
    ),
  }),
  experience: z.object({
    professional_experience: z.string(),
    project_experience: z.string(),
    focus: z.string(),
  }),
  experiences: z.array(
    z.object({
      year: z.string(),
      role: z.string(),
      company: z.string(),
      description: z.string(),
      technologies: z.string(),
    })
  ),
  education: z.object({
    background: z.string(),
    additional_info: z.string(),
  }),
  response_guidelines: z.object({
    be_concise: z.boolean(),
    be_informative: z.boolean(),
    professional_tone: z.boolean(),
    redirect_uncertain_queries: z.string(),
    language: z.string(),
  }),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;
type SettingsFormInput = z.input<typeof settingsSchema>;

interface SettingsFormProps {
  initialData?: ISettings | null;
}

export default function SettingsForm({ initialData }: SettingsFormProps) {
  const [loading, setLoading] = useState(false);

  // Flatten array to comma-separated string for editing
  const defaultValues = initialData
    ? {
        assistant: initialData.assistant || {
          name: "",
          purpose: "",
          contact_recommendation: "",
        },
        personal_info: initialData.personal_info || {
          full_name: "",
          email: "",
          phone: "",
          location: "",
          professional_title: "",
        },
        technical_skills: {
          specializations:
            initialData.technical_skills?.specializations?.join(", ") || "",
          core_technologies:
            initialData.technical_skills?.core_technologies?.join(", ") || "",
        },
        experience: initialData.experience || {
          professional_experience: "",
          project_experience: "",
          focus: "",
        },
        experiences:
          initialData.experiences?.map((exp) => ({
            year: exp.year || "",
            role: exp.role || "",
            company: exp.company || "",
            description: exp.description || "",
            technologies: Array.isArray(exp.technologies)
              ? exp.technologies.join(", ")
              : (exp.technologies as unknown as string) || "",
          })) || [],
        education: initialData.education || {
          background: "",
          additional_info: "",
        },
        response_guidelines: initialData.response_guidelines || {
          be_concise: true,
          be_informative: true,
          professional_tone: true,
          redirect_uncertain_queries: "",
          language: "English",
        },
      }
    : {
        assistant: { name: "", purpose: "", contact_recommendation: "" },
        personal_info: {
          full_name: "",
          email: "",
          phone: "",
          location: "",
          professional_title: "",
        },
        technical_skills: { specializations: "", core_technologies: "" },
        experience: {
          professional_experience: "",
          project_experience: "",
          focus: "",
        },
        experiences: [],
        education: { background: "", additional_info: "" },
        response_guidelines: {
          be_concise: true,
          be_informative: true,
          professional_tone: true,
          redirect_uncertain_queries: "",
          language: "English",
        },
      };

  const form = useForm<SettingsFormInput>({
    resolver: zodResolver(
      settingsSchema
    ) as unknown as Resolver<SettingsFormInput>,
    defaultValues: defaultValues as SettingsFormInput,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "experiences",
  });

  const onSubmit = async (data: SettingsFormInput) => {
    // When using zodResolver with transform, the data passed to onSubmit
    // is already transformed to SettingsFormValues.
    const validatedData = data as unknown as SettingsFormValues;
    setLoading(true);
    try {
      // Transform technologies string back to array for each experience
      // (This is a safety check in case the schema transform didn't cover nested fields as expected)
      const formattedData = {
        ...validatedData,
        experiences: validatedData.experiences?.map((exp) => ({
          ...exp,
          technologies:
            typeof exp.technologies === "string"
              ? (exp.technologies as string)
                  .split(",")
                  .map((s) => s.trim())
                  .filter((s) => s !== "")
              : exp.technologies,
        })),
      };

      const response = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) throw new Error("Failed to update settings");

      toast.success("Settings updated successfully");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Settings</h1>
            <p className="text-gray-400">
              Manage your portfolio and assistant settings.
            </p>
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="bg-cyan-600 hover:bg-cyan-700"
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save Changes
          </Button>
        </div>

        <Tabs defaultValue="assistant" className="w-full">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="assistant">Assistant</TabsTrigger>
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="experiences">Experiences</TabsTrigger>
            <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
          </TabsList>

          <TabsContent value="assistant" className="space-y-4 mt-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">
                  Assistant Configuration
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Configure your AI assistant&apos;s personality and purpose.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="assistant.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">
                        Assistant Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-gray-900 border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="assistant.purpose"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Purpose</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="bg-gray-900 border-gray-700 text-white min-h-[100px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="assistant.contact_recommendation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">
                        Contact Recommendation
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-gray-900 border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="personal" className="space-y-4 mt-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">
                  Personal Information
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Your public profile details.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="personal_info.full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Full Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-gray-900 border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="personal_info.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-gray-900 border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="personal_info.phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Phone</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-gray-900 border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="personal_info.professional_title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">
                        Professional Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-gray-900 border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="personal_info.location"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="text-gray-200">Location</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-gray-900 border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-4 mt-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Technical Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="technical_skills.specializations"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">
                        Specializations (comma separated)
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-gray-900 border-gray-700 text-white"
                          placeholder="React, Node.js, Python..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="technical_skills.core_technologies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">
                        Core Technologies (comma separated)
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-gray-900 border-gray-700 text-white"
                          placeholder="JavaScript, TypeScript, MongoDB..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="experience.focus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">
                        Current Focus
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-gray-900 border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experiences" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">
                Work Experiences
              </h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  append({
                    year: "",
                    role: "",
                    company: "",
                    description: "",
                    technologies: "",
                  })
                }
                className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Experience
              </Button>
            </div>

            {fields.map((field, index) => (
              <Card key={field.id} className="bg-gray-800 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">
                    Experience #{index + 1}
                  </CardTitle>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`experiences.${index}.year`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-200">
                          Year (e.g., 2023 - Present)
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-gray-900 border-gray-700 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`experiences.${index}.role`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-200">Role</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-gray-900 border-gray-700 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`experiences.${index}.company`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-200">Company</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-gray-900 border-gray-700 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`experiences.${index}.technologies`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-200">
                          Technologies (comma separated)
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-gray-900 border-gray-700 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`experiences.${index}.description`}
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-gray-200">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="bg-gray-900 border-gray-700 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="guidelines" className="space-y-4 mt-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">
                  Response Guidelines
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Control how your assistant interacts with visitors.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-row items-center justify-between rounded-lg border border-gray-700 p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base text-white text-gray-200">
                      Be Concise
                    </FormLabel>
                    <FormDescription className="text-gray-400">
                      Keep responses short and to the point.
                    </FormDescription>
                  </div>
                  <FormField
                    control={form.control}
                    name="response_guidelines.be_concise"
                    render={({ field }) => (
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    )}
                  />
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border border-gray-700 p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base text-white text-gray-200">
                      Professional Tone
                    </FormLabel>
                    <FormDescription className="text-gray-400">
                      Always use a professional language.
                    </FormDescription>
                  </div>
                  <FormField
                    control={form.control}
                    name="response_guidelines.professional_tone"
                    render={({ field }) => (
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="response_guidelines.language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">
                        Primary Language
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-gray-900 border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="response_guidelines.redirect_uncertain_queries"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">
                        Uncertainty Redirect Message
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="bg-gray-900 border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  );
}

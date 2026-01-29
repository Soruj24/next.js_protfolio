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
    linkedin: z.string().optional(),
    github: z.string().optional(),
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
  innovation: z.array(
    z.object({
      title: z.string().min(1, "Title is required"),
      description: z.string().min(1, "Description is required"),
      icon: z.string().min(1, "Icon is required"),
      color: z.string().min(1, "Color is required"),
    })
  ),
  expertise: z.array(
    z.object({
      title: z.string().min(1, "Title is required"),
      description: z.string().min(1, "Description is required"),
      icon: z.string().min(1, "Icon is required"),
      skills: z.string().min(1, "Skills are required"),
      color: z.string().min(1, "Color is required"),
    })
  ),
  standards: z.array(
    z.object({
      title: z.string().min(1, "Title is required"),
      description: z.string().min(1, "Description is required"),
      icon: z.string().min(1, "Icon is required"),
      metrics: z.string().min(1, "Metrics are required"),
      features: z.string().min(1, "Features are required"),
    })
  ),
  testimonials: z.array(
    z.object({
      name: z.string().min(1, "Name is required"),
      role: z.string().min(1, "Role is required"),
      content: z.string().min(1, "Content is required"),
      avatar: z.string().min(1, "Avatar URL is required"),
      color: z.string().min(1, "Color is required"),
    })
  ),
  case_studies: z.array(
    z.object({
      title: z.string().min(1, "Title is required"),
      description: z.string().min(1, "Description is required"),
      challenge: z.string().min(1, "Challenge is required"),
      solution: z.string().min(1, "Solution is required"),
      impact: z.string().min(1, "Impact is required"),
      technologies: z.string().min(1, "Technologies are required"),
      image: z.string().min(1, "Image URL is required"),
    })
  ),
});

type SettingsFormInput = z.infer<typeof settingsSchema>;

interface SettingsFormValues extends Omit<ISettings, "experiences" | "expertise" | "standards" | "testimonials" | "case_studies"> {
  experiences: {
    year: string;
    role: string;
    company: string;
    description: string;
    technologies: string | string[];
  }[];
  expertise: {
    title: string;
    description: string;
    icon: string;
    skills: string | string[];
    color: string;
  }[];
  standards: {
    title: string;
    description: string;
    icon: string;
    metrics: string;
    features: string | string[];
  }[];
  testimonials: {
    name: string;
    role: string;
    content: string;
    avatar: string;
    color: string;
  }[];
  case_studies: {
    title: string;
    description: string;
    challenge: string;
    solution: string;
    impact: string;
    technologies: string | string[];
    image: string;
  }[];
}

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
        innovation: (initialData.innovation || []).map(item => ({
          title: item.title || "",
          description: item.description || "",
          icon: item.icon || "",
          color: item.color || ""
        })),
        expertise: (initialData.expertise || []).map(exp => ({
          title: exp.title || "",
          description: exp.description || "",
          icon: exp.icon || "",
          skills: Array.isArray(exp.skills) ? exp.skills.join(", ") : exp.skills || "",
          color: exp.color || ""
        })),
        standards: (initialData.standards || []).map(std => ({
          title: std.title || "",
          description: std.description || "",
          icon: std.icon || "",
          metrics: std.metrics || "",
          features: Array.isArray(std.features) ? std.features.join(", ") : std.features || ""
        })),
        testimonials: (initialData.testimonials || []).map(t => ({
          name: t.name || "",
          role: t.role || "",
          content: t.content || "",
          avatar: t.avatar || "",
          color: t.color || ""
        })),
        case_studies: (initialData.case_studies || []).map((cs) => ({
            title: cs.title || "",
            description: cs.description || "",
            challenge: cs.challenge || "",
            solution: cs.solution || "",
            impact: cs.impact || "",
            technologies: Array.isArray(cs.technologies)
              ? cs.technologies.join(", ")
              : (cs.technologies as unknown as string) || "",
            image: cs.image || ""
          })),
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
        innovation: [],
        expertise: [],
        standards: [],
        testimonials: [],
        case_studies: [],
      };

  const form = useForm<SettingsFormInput>({
    resolver: zodResolver(
      settingsSchema
    ) as unknown as Resolver<SettingsFormInput>,
    defaultValues: defaultValues as unknown as SettingsFormInput,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "experiences",
  });

  const { fields: innovationFields, append: appendInnovation, remove: removeInnovation } = useFieldArray({
    control: form.control,
    name: "innovation",
  });

  const { fields: expertiseFields, append: appendExpertise, remove: removeExpertise } = useFieldArray({
    control: form.control,
    name: "expertise",
  });

  const { fields: standardsFields, append: appendStandards, remove: removeStandards } = useFieldArray({
    control: form.control,
    name: "standards",
  });

  const { fields: testimonialsFields, append: appendTestimonials, remove: removeTestimonials } = useFieldArray({
    control: form.control,
    name: "testimonials",
  });

  const { fields: caseStudyFields, append: appendCaseStudy, remove: removeCaseStudy } = useFieldArray({
    control: form.control,
    name: "case_studies",
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
        expertise: validatedData.expertise?.map((exp) => ({
          ...exp,
          skills:
            typeof exp.skills === "string"
              ? (exp.skills as string)
                  .split(",")
                  .map((s) => s.trim())
                  .filter((s) => s !== "")
              : exp.skills,
        })),
        standards: validatedData.standards?.map((std) => ({
          ...std,
          features:
                typeof std.features === "string"
                  ? (std.features as string)
                      .split(",")
                      .map((s) => s.trim())
                      .filter((s) => s !== "")
                  : std.features,
            })),
            testimonials: validatedData.testimonials || [],
            case_studies: validatedData.case_studies?.map((cs) => ({
              ...cs,
              technologies:
                typeof cs.technologies === "string"
                  ? (cs.technologies as string)
                      .split(",")
                      .map((s) => s.trim())
                      .filter((s) => s !== "")
                  : cs.technologies,
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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Settings</h1>
            <p className="text-sm md:text-base text-gray-400">
              Manage your portfolio and assistant settings.
            </p>
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-700 min-h-[44px]"
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
          <TabsList className="bg-gray-800 border-gray-700 w-full justify-start overflow-x-auto overflow-y-hidden h-auto flex-nowrap p-1 mb-4 custom-scrollbar">
            <TabsTrigger value="assistant" className="flex-shrink-0">Smart Guide</TabsTrigger>
            <TabsTrigger value="personal" className="flex-shrink-0">Personal Info</TabsTrigger>
            <TabsTrigger value="skills" className="flex-shrink-0">Skills</TabsTrigger>
            <TabsTrigger value="experiences" className="flex-shrink-0">Experiences</TabsTrigger>
            <TabsTrigger value="education" className="flex-shrink-0">Education</TabsTrigger>
            <TabsTrigger value="innovation" className="flex-shrink-0">Innovation</TabsTrigger>
            <TabsTrigger value="expertise" className="flex-shrink-0">Expertise</TabsTrigger>
            <TabsTrigger value="standards" className="flex-shrink-0">Standards</TabsTrigger>
            <TabsTrigger value="case_studies" className="flex-shrink-0">Case Studies</TabsTrigger>
            <TabsTrigger value="testimonials" className="flex-shrink-0">Testimonials</TabsTrigger>
            <TabsTrigger value="guidelines" className="flex-shrink-0">Guidelines</TabsTrigger>
          </TabsList>

          <TabsContent value="assistant" className="space-y-4 mt-4">
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
                  control={form.control}
                  name="assistant.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">
                        Guide Name
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
                      <FormLabel className="text-gray-200">Guide Purpose</FormLabel>
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
                    <FormItem>
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
                <FormField
                  control={form.control}
                  name="personal_info.linkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">LinkedIn URL</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="https://linkedin.com/in/username"
                          className="bg-gray-900 border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="personal_info.github"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="text-gray-200">GitHub URL</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="https://github.com/username"
                          className="bg-gray-900 border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 shadow-xl overflow-hidden">
              <CardHeader className="p-4 sm:p-6 border-b border-gray-700 bg-gray-800/50">
                <CardTitle className="text-xl md:text-2xl text-white">Education</CardTitle>
                <CardDescription className="text-gray-400">
                  Update your educational background.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <FormField
                  control={form.control}
                  name="education.background"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">
                        Background
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
                  name="education.additional_info"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">
                        Additional Info
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

          <TabsContent value="skills" className="space-y-4 mt-4">
            <Card className="bg-gray-800 border-gray-700 shadow-xl overflow-hidden">
              <CardHeader className="p-4 sm:p-6 border-b border-gray-700 bg-gray-800/50">
                <CardTitle className="text-xl md:text-2xl text-white">Technical Skills</CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your core competencies and focus.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
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
                            className="bg-gray-900 border-gray-700 text-white min-h-[100px]"
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

          <TabsContent value="education" className="space-y-4 mt-4">
            <Card className="bg-gray-800 border-gray-700 shadow-xl overflow-hidden">
              <CardHeader className="p-4 sm:p-6 border-b border-gray-700 bg-gray-800/50">
                <CardTitle className="text-xl md:text-2xl text-white">Education Details</CardTitle>
                <CardDescription className="text-gray-400">Your educational background and achievements</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <FormField
                  control={form.control}
                  name="education.background"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Educational Background</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="B.Sc in Computer Science..." 
                          className="bg-gray-900 border-gray-700 text-white min-h-[120px]" 
                        />
                      </FormControl>
                      <FormDescription className="text-gray-500">Mention your degrees, institutions, and years.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="education.additional_info"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Additional Information</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="Certifications, workshops, or other achievements..." 
                          className="bg-gray-900 border-gray-700 text-white min-h-[120px]" 
                        />
                      </FormControl>
                      <FormDescription className="text-gray-500">Any extra courses or certificates you have earned.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="innovation" className="space-y-4 mt-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-semibold text-white">Innovation Cards</h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendInnovation({ title: "", description: "", icon: "", color: "" })}
                className="w-full sm:w-auto bg-gray-800 border-gray-700 text-white hover:bg-gray-700 min-h-[40px]"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Innovation
              </Button>
            </div>
            {innovationFields.map((field, index) => (
              <Card key={field.id} className="bg-gray-800 border-gray-700 shadow-lg overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 border-b border-gray-700 bg-gray-800/50">
                  <CardTitle className="text-sm font-bold text-cyan-400 uppercase tracking-wider">
                    Innovation Card #{index + 1}
                  </CardTitle>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeInnovation(index)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-full h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name={`innovation.${index}.title`} render={({ field }) => (
                    <FormItem><FormLabel className="text-gray-200">Title</FormLabel><FormControl><Input {...field} className="bg-gray-900 border-gray-700 text-white" /></FormControl></FormItem>
                  )} />
                  <FormField control={form.control} name={`innovation.${index}.icon`} render={({ field }) => (
                    <FormItem><FormLabel className="text-gray-200">Icon (Emoji)</FormLabel><FormControl><Input {...field} className="bg-gray-900 border-gray-700 text-white" /></FormControl></FormItem>
                  )} />
                  <FormField control={form.control} name={`innovation.${index}.color`} render={({ field }) => (
                    <FormItem><FormLabel className="text-gray-200">Color Class (e.g. cyan, blue, purple)</FormLabel><FormControl><Input {...field} className="bg-gray-900 border-gray-700 text-white" /></FormControl></FormItem>
                  )} />
                  <FormField control={form.control} name={`innovation.${index}.description`} render={({ field }) => (
                    <FormItem className="md:col-span-2"><FormLabel className="text-gray-200">Description</FormLabel><FormControl><Textarea {...field} className="bg-gray-900 border-gray-700 text-white" /></FormControl></FormItem>
                  )} />
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="expertise" className="space-y-4 mt-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-semibold text-white">Expertise Categories</h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendExpertise({ title: "", description: "", icon: "", skills: "", color: "" })}
                className="w-full sm:w-auto bg-gray-800 border-gray-700 text-white hover:bg-gray-700 min-h-[40px]"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Expertise
              </Button>
            </div>
            {expertiseFields.map((field, index) => (
              <Card key={field.id} className="bg-gray-800 border-gray-700 shadow-lg overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 border-b border-gray-700 bg-gray-800/50">
                  <CardTitle className="text-sm font-bold text-cyan-400 uppercase tracking-wider">
                    Expertise Node #{index + 1}
                  </CardTitle>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeExpertise(index)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-full h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name={`expertise.${index}.title`} render={({ field }) => (
                    <FormItem><FormLabel className="text-gray-200">Title</FormLabel><FormControl><Input {...field} className="bg-gray-900 border-gray-700 text-white" /></FormControl></FormItem>
                  )} />
                  <FormField control={form.control} name={`expertise.${index}.icon`} render={({ field }) => (
                    <FormItem><FormLabel className="text-gray-200">Icon (Emoji)</FormLabel><FormControl><Input {...field} className="bg-gray-900 border-gray-700 text-white" /></FormControl></FormItem>
                  )} />
                  <FormField control={form.control} name={`expertise.${index}.color`} render={({ field }) => (
                    <FormItem><FormLabel className="text-gray-200">Color Class</FormLabel><FormControl><Input {...field} className="bg-gray-900 border-gray-700 text-white" /></FormControl></FormItem>
                  )} />
                  <FormField control={form.control} name={`expertise.${index}.skills`} render={({ field }) => (
                    <FormItem><FormLabel className="text-gray-200">Skills (comma separated)</FormLabel><FormControl><Input {...field} className="bg-gray-900 border-gray-700 text-white" /></FormControl></FormItem>
                  )} />
                  <FormField control={form.control} name={`expertise.${index}.description`} render={({ field }) => (
                    <FormItem className="md:col-span-2"><FormLabel className="text-gray-200">Description</FormLabel><FormControl><Textarea {...field} className="bg-gray-900 border-gray-700 text-white" /></FormControl></FormItem>
                  )} />
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="standards" className="space-y-4 mt-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-semibold text-white">Engineering Standards</h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendStandards({ title: "", description: "", icon: "", metrics: "", features: "" })}
                className="w-full sm:w-auto bg-gray-800 border-gray-700 text-white hover:bg-gray-700 min-h-[40px]"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Standard
              </Button>
            </div>
            {standardsFields.map((field, index) => (
              <Card key={field.id} className="bg-gray-800 border-gray-700 shadow-lg overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 border-b border-gray-700 bg-gray-800/50">
                  <CardTitle className="text-sm font-bold text-cyan-400 uppercase tracking-wider">
                    Standard Node #{index + 1}
                  </CardTitle>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeStandards(index)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-full h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name={`standards.${index}.title`} render={({ field }) => (
                    <FormItem><FormLabel className="text-gray-200">Title</FormLabel><FormControl><Input {...field} className="bg-gray-900 border-gray-700 text-white" /></FormControl></FormItem>
                  )} />
                  <FormField control={form.control} name={`standards.${index}.icon`} render={({ field }) => (
                    <FormItem><FormLabel className="text-gray-200">Icon (Emoji)</FormLabel><FormControl><Input {...field} className="bg-gray-900 border-gray-700 text-white" /></FormControl></FormItem>
                  )} />
                  <FormField control={form.control} name={`standards.${index}.metrics`} render={({ field }) => (
                    <FormItem><FormLabel className="text-gray-200">Metrics (e.g. 90% coverage)</FormLabel><FormControl><Input {...field} className="bg-gray-900 border-gray-700 text-white" /></FormControl></FormItem>
                  )} />
                  <FormField control={form.control} name={`standards.${index}.features`} render={({ field }) => (
                    <FormItem><FormLabel className="text-gray-200">Features (comma separated)</FormLabel><FormControl><Input {...field} className="bg-gray-900 border-gray-700 text-white" /></FormControl></FormItem>
                  )} />
                  <FormField control={form.control} name={`standards.${index}.description`} render={({ field }) => (
                    <FormItem className="md:col-span-2"><FormLabel className="text-gray-200">Description</FormLabel><FormControl><Textarea {...field} className="bg-gray-900 border-gray-700 text-white" /></FormControl></FormItem>
                  )} />
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="case_studies" className="space-y-4 mt-4">
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
                  onClick={() => appendCaseStudy({ title: "", description: "", challenge: "", solution: "", impact: "", technologies: "", image: "" })}
                  className="w-full sm:w-auto bg-gray-800 border-gray-700 text-white hover:bg-gray-700 min-h-[40px]"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Case Study
                </Button>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-6">
                {caseStudyFields.map((field, index) => (
                  <div key={field.id} className="p-4 sm:p-6 border border-gray-700 rounded-xl space-y-4 relative bg-gray-900/50 shadow-inner">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Case Study #{index + 1}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-full h-8 w-8 p-0"
                        onClick={() => removeCaseStudy(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`case_studies.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-200">Project Title</FormLabel>
                            <FormControl><Input {...field} className="bg-gray-900 border-gray-700 text-white" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`case_studies.${index}.image`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-200">Image URL</FormLabel>
                            <FormControl><Input {...field} placeholder="/projects/image.jpg" className="bg-gray-900 border-gray-700 text-white" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name={`case_studies.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-200">Short Description</FormLabel>
                          <FormControl><Input {...field} className="bg-gray-900 border-gray-700 text-white" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name={`case_studies.${index}.challenge`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-200">The Challenge</FormLabel>
                            <FormControl><Textarea {...field} className="bg-gray-900 border-gray-700 text-white" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`case_studies.${index}.solution`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-200">The Solution</FormLabel>
                            <FormControl><Textarea {...field} className="bg-gray-900 border-gray-700 text-white" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`case_studies.${index}.impact`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-200">The Impact</FormLabel>
                            <FormControl><Textarea {...field} className="bg-gray-900 border-gray-700 text-white" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name={`case_studies.${index}.technologies`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-200">Technologies (comma separated)</FormLabel>
                          <FormControl><Input {...field} placeholder="React, Node.js, LangChain" className="bg-gray-900 border-gray-700 text-white" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testimonials" className="space-y-4 mt-4">
            <Card className="bg-gray-800 border-gray-700 shadow-xl overflow-hidden">
              <CardHeader className="p-4 sm:p-6 border-b border-gray-700 bg-gray-800/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-xl md:text-2xl text-white">Testimonials</CardTitle>
                  <CardDescription className="text-gray-400">Industry leader feedback</CardDescription>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendTestimonials({ name: "", role: "", content: "", avatar: "", color: "from-cyan-500 to-blue-500" })}
                  className="w-full sm:w-auto bg-gray-800 border-gray-700 text-white hover:bg-gray-700 min-h-[40px]"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Testimonial
                </Button>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-6">
                {testimonialsFields.map((field, index) => (
                  <div key={field.id} className="p-4 sm:p-6 border border-gray-700 rounded-xl space-y-4 relative bg-gray-900/50 shadow-inner">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Testimonial #{index + 1}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-full h-8 w-8 p-0"
                        onClick={() => removeTestimonials(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`testimonials.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-200">Name</FormLabel>
                            <FormControl><Input {...field} className="bg-gray-900 border-gray-700 text-white" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`testimonials.${index}.role`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-200">Role</FormLabel>
                            <FormControl><Input {...field} className="bg-gray-900 border-gray-700 text-white" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name={`testimonials.${index}.content`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-200">Content</FormLabel>
                          <FormControl><Textarea {...field} className="bg-gray-900 border-gray-700 text-white" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`testimonials.${index}.avatar`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-200">Avatar Initials</FormLabel>
                            <FormControl><Input {...field} placeholder="e.g. AM" className="bg-gray-900 border-gray-700 text-white" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`testimonials.${index}.color`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-200">Gradient Color</FormLabel>
                            <FormControl><Input {...field} placeholder="from-blue-500 to-cyan-500" className="bg-gray-900 border-gray-700 text-white" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guidelines" className="space-y-4 mt-4">
            <Card className="bg-gray-800 border-gray-700 shadow-xl overflow-hidden">
              <CardHeader className="p-4 sm:p-6 border-b border-gray-700 bg-gray-800/50">
                <CardTitle className="text-xl md:text-2xl text-white">
                  Response Guidelines
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Control how your assistant interacts with visitors.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-6">
                <div className="flex flex-row items-center justify-between rounded-xl border border-gray-700 p-4 bg-gray-900/50 shadow-inner">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base font-semibold text-white">
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
                <div className="flex flex-row items-center justify-between rounded-xl border border-gray-700 p-4 bg-gray-900/50 shadow-inner">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base font-semibold text-white">
                      Professional Tone
                    </FormLabel>
                    <FormDescription className="text-gray-400">
                      Always use professional language.
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
                          className="bg-gray-900 border-gray-700 text-white min-h-[100px]"
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

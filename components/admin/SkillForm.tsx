"use client";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { ISkillCategory } from "@/models/Skill";

const skillSchema = z.object({
  title: z.string().min(2, "Title is required"),
  icon: z.string().min(1, "Icon is required"),
  skills: z
    .array(
      z.object({
        name: z.string().min(1, "Skill name is required"),
        level: z.number().min(0).max(100),
        icon: z.string().min(1, "Icon is required"),
        color: z.string().min(1, "Color is required"),
        description: z.string().optional(),
      })
    )
    .min(1, "At least one skill is required"),
});

interface SkillFormProps {
  category?: ISkillCategory | null;
  onSuccess: () => void;
}

export default function SkillForm({ category, onSuccess }: SkillFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ISkillCategory>({
    resolver: zodResolver(skillSchema),
    defaultValues: category || {
      title: "",
      icon: "💻",
      skills: [
        { name: "", level: 80, icon: "⚡", color: "#3B82F6", description: "" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "skills",
  });

  const onSubmit = async (data: ISkillCategory) => {
    setIsLoading(true);
    try {
      const url = category ? `/api/skills/${category._id}` : "/api/skills";
      const method = category ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success(
          category ? "Skill category updated" : "Skill category created"
        );
        onSuccess();
      } else {
        const err = await res.json();
        toast.error(err.error || "Something went wrong");
      }
    } catch (error) {
      toast.error("Error saving skills");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Category Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Frontend Development"
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
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">
                  Category Icon (Emoji)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. 🎨"
                    {...field}
                    className="bg-gray-900 border-gray-700 text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">Skills</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                append({
                  name: "",
                  level: 80,
                  icon: "⚡",
                  color: "#3B82F6",
                  description: "",
                })
              }
              className="border-gray-700 hover:bg-gray-700"
            >
              <Plus size={16} className="mr-1" /> Add Skill
            </Button>
          </div>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg space-y-4"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-400">
                  Skill #{index + 1}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                >
                  <Trash2 size={16} />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name={`skills.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-gray-400">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="React"
                          {...field}
                          className="bg-gray-950 border-gray-700 text-white h-8 text-sm"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`skills.${index}.level`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-gray-400">
                        Level (%)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                          className="bg-gray-950 border-gray-700 text-white h-8 text-sm"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`skills.${index}.icon`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-gray-400">
                        Icon (Emoji)
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-gray-950 border-gray-700 text-white h-8 text-sm"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`skills.${index}.color`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-gray-400">
                        Color (Hex)
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-gray-950 border-gray-700 text-white h-8 text-sm"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`skills.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-gray-400">
                        Description (Optional)
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-gray-950 border-gray-700 text-white h-8 text-sm"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-cyan-600 hover:bg-cyan-700"
        >
          {isLoading
            ? "Saving..."
            : category
              ? "Update Category"
              : "Create Category"}
        </Button>
      </form>
    </Form>
  );
}

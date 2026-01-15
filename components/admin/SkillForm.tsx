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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 font-medium">Category Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Frontend Development"
                    {...field}
                    className="bg-black/40 border-white/10 text-white focus:border-purple-500/50 transition-colors h-12"
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
                <FormLabel className="text-gray-300 font-medium">
                  Category Icon (Emoji)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. 🎨"
                    {...field}
                    className="bg-black/40 border-white/10 text-white focus:border-purple-500/50 transition-colors h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Plus className="text-purple-400" size={20} />
              Skill Nodes
            </h3>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                append({
                  name: "",
                  level: 80,
                  icon: "⚡",
                  color: "#3B82F6",
                  description: "",
                })
              }
              className="border-purple-500/30 hover:bg-purple-500/10 text-purple-300 rounded-xl px-6"
            >
              <Plus size={18} className="mr-2" /> Add Skill Node
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="p-6 bg-black/40 border border-white/5 rounded-2xl space-y-6 relative group transition-all duration-300 hover:border-purple-500/20"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 text-xs font-bold border border-purple-500/20">
                      {index + 1}
                    </div>
                    <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                      Configuration
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    className="text-red-400/50 hover:text-red-400 hover:bg-red-400/10 rounded-full transition-colors"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <FormField
                    control={form.control}
                    name={`skills.${index}.name`}
                    render={({ field }) => (
                      <FormItem className="md:col-span-1">
                        <FormLabel className="text-xs font-bold text-gray-500 uppercase">
                          Skill Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="React"
                            {...field}
                            className="bg-black/40 border-white/10 text-white h-10 text-sm focus:border-purple-500/30"
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
                        <FormLabel className="text-xs font-bold text-gray-500 uppercase">
                          Proficiency (%)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                            className="bg-black/40 border-white/10 text-white h-10 text-sm focus:border-purple-500/30"
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
                        <FormLabel className="text-xs font-bold text-gray-500 uppercase">
                          Node Icon
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-black/40 border-white/10 text-white h-10 text-sm focus:border-purple-500/30"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`skills.${index}.color`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold text-gray-500 uppercase">
                          Node Color
                        </FormLabel>
                        <FormControl>
                          <div className="flex gap-2">
                            <Input
                              {...field}
                              className="bg-black/40 border-white/10 text-white h-10 text-sm focus:border-purple-500/30 flex-1"
                            />
                            <div 
                              className="w-10 h-10 rounded-lg border border-white/10"
                              style={{ backgroundColor: field.value }}
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name={`skills.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold text-gray-500 uppercase">
                        Technical Details
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Briefly describe your expertise with this skill"
                          {...field}
                          className="bg-black/40 border-white/10 text-white h-10 text-sm focus:border-purple-500/30"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-8">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-purple-600 to-pink-700 hover:from-purple-500 hover:to-pink-600 text-white px-10 py-6 rounded-2xl font-bold text-lg shadow-lg shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Synchronizing...</span>
              </div>
            ) : category ? (
              "Update Skill Matrix"
            ) : (
              "Initialize Category"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

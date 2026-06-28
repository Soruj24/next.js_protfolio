"use client";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Plus, Trash2 } from "lucide-react";
import type { SkillFormData } from "@/lib/schemas/skill";

export default function SkillNodesArray() {
  const { control } = useFormContext<SkillFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Plus className="text-purple-400" size={20} />
          Skill Nodes
        </h3>
        <Button
          type="button"
          variant="outline"
          onClick={() => append({ name: "", level: 80, icon: "⚡", color: "#3B82F6", description: "" })}
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 text-xs font-bold border border-purple-500/20">
                  {index + 1}
                </div>
                <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Configuration</span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => remove(index)}
                className="text-red-400/50 hover:text-red-400 hover:bg-red-400/10 rounded-full transition-colors self-end sm:self-auto"
              >
                <Trash2 size={18} />
                <span className="ml-2 sm:hidden">Remove</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <FormField
                control={control}
                name={`skills.${index}.name`}
                render={({ field }) => (
                  <FormItem className="md:col-span-1">
                    <FormLabel className="text-xs font-bold text-gray-500 uppercase">Skill Name</FormLabel>
                    <FormControl>
                      <Input placeholder="React" {...field} className="bg-black/40 border-white/10 text-white h-10 text-sm focus:border-purple-500/30" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`skills.${index}.level`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold text-gray-500 uppercase">Proficiency (%)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} className="bg-black/40 border-white/10 text-white h-10 text-sm focus:border-purple-500/30" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`skills.${index}.icon`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold text-gray-500 uppercase">Node Icon</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-black/40 border-white/10 text-white h-10 text-sm focus:border-purple-500/30" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`skills.${index}.color`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold text-gray-500 uppercase">Node Color</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input {...field} className="bg-black/40 border-white/10 text-white h-10 text-sm focus:border-purple-500/30 flex-1" />
                        <div className="w-10 h-10 rounded-lg border border-white/10" style={{ backgroundColor: field.value }} />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={control}
              name={`skills.${index}.description`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold text-gray-500 uppercase">Technical Details</FormLabel>
                  <FormControl>
                    <Input placeholder="Briefly describe your expertise with this skill" {...field} className="bg-black/40 border-white/10 text-white h-10 text-sm focus:border-purple-500/30" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

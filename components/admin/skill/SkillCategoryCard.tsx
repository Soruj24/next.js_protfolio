"use client";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ISkillCategory } from "@/models/Skill";

interface SkillCategoryCardProps {
  category: ISkillCategory;
  onDelete: (id: string) => void;
}

export default function SkillCategoryCard({ category, onDelete }: SkillCategoryCardProps) {
  return (
    <div className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden flex flex-col backdrop-blur-xl transition-all duration-500 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-3xl border border-purple-500/20 group-hover:scale-110 transition-transform duration-500">
              {category.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">{category.title}</h2>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">
                  {category.skills.length} Technical Nodes
                </span>
                {(category as any).isLocal && (
                  <span className="text-[8px] px-2 py-0.5 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-full font-black uppercase tracking-tighter">
                    Static
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button asChild size="sm" variant="ghost" className="h-10 w-10 p-0 text-gray-400 hover:text-purple-400 hover:bg-purple-400/10 rounded-xl">
              <Link href={`/admin/skills/edit/${category._id}`}>
                <Pencil size={18} />
              </Link>
            </Button>
            {!(category as any).isLocal && (
              <Button size="sm" variant="ghost" className="h-10 w-10 p-0 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl" onClick={() => category._id && onDelete(category._id)}>
                <Trash2 size={18} />
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {category.skills.map((skill, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group/node hover:border-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-xl group-hover/node:scale-125 transition-transform duration-300">{skill.icon}</span>
                <div>
                  <div className="text-sm font-bold text-white">{skill.name}</div>
                  <div className="text-[10px] text-gray-500 font-medium">{skill.description || "Core Technology"}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden hidden sm:block">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: `${skill.level}%` }} />
                </div>
                <span className="text-xs font-black text-purple-400 w-8">{skill.level}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

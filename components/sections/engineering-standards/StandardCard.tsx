"use client";
import { Code2 } from "lucide-react";
import { iconMap } from "@/lib/sections/engineering-standards";

interface StandardCardProps {
  std: { title: string; description: string; icon: string; metrics: string; features: string[] };
}

export default function StandardCard({ std }: StandardCardProps) {
  return (
    <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-cyan-500/50 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-6">
        <div className="p-3 rounded-xl bg-zinc-800 group-hover:bg-cyan-500/10 transition-colors">
          {iconMap[std.icon] || <Code2 className="w-6 h-6 text-cyan-400" />}
        </div>
        <span className="text-xs font-bold tracking-widest text-zinc-500 uppercase bg-zinc-800/50 px-3 py-1 rounded-full border border-zinc-700">{std.metrics}</span>
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">{std.title}</h3>
      <p className="text-zinc-400 mb-6 leading-relaxed">{std.description}</p>
      <div className="flex flex-wrap gap-3">
        {std.features.map((feature: string, fIndex: number) => (
          <div key={fIndex} className="flex items-center text-xs text-zinc-500">
            <div className="w-1 h-1 rounded-full bg-cyan-500 mr-2" />
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
}

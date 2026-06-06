"use client";
import { Lightbulb } from "lucide-react";
import { iconMap, colorMap } from "@/lib/sections/tech-innovation";

interface InnovationCardProps {
  item: { title: string; description: string; icon: string; color: string };
  index: number;
  cardRef: (el: HTMLDivElement | null) => void;
}

export default function InnovationCard({ item, index, cardRef }: InnovationCardProps) {
  const theme = colorMap[item.color] || colorMap.cyan;

  return (
    <div
      ref={cardRef}
      onClick={() => { const el = document.getElementById("case-studies"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
      className={`p-8 rounded-2xl bg-gradient-to-br ${theme.color} border ${theme.border} backdrop-blur-xl transition-all duration-300 group cursor-pointer`}
    >
      <div className="mb-6 p-4 rounded-xl bg-gray-900/50 w-fit group-hover:scale-110 transition-transform duration-300">
        {iconMap[item.icon] || <Lightbulb className="w-8 h-8 text-cyan-400" />}
      </div>
      <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">{item.title}</h3>
      <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{item.description}</p>
      <div className="mt-8 flex items-center text-sm font-semibold text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity hover:text-cyan-400">
        <span>Explore More</span>
        <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </div>
  );
}

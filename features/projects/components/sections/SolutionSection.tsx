"use client";
import { Sparkles } from "lucide-react";

interface SolutionSectionProps {
  solutions: string[];
}

export default function SolutionSection({ solutions }: SolutionSectionProps) {
  if (!solutions?.length) return null;

  return (
    <section id="solution" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Solution</h2>
          <p className="text-sm text-gray-500 mt-0.5">How the problem was solved</p>
        </div>
      </div>
      <div className="space-y-4">
        {solutions.map((solution, i) => (
          <div
            key={i}
            className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-emerald-500/20 transition-all duration-300"
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-bold shrink-0 mt-0.5">
              {i + 1}
            </span>
            <p className="text-gray-300 leading-relaxed">{solution}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

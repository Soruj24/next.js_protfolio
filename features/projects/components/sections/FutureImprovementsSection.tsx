"use client";
import { Rocket } from "lucide-react";

interface FutureImprovementsSectionProps {
  improvements: string[];
}

export default function FutureImprovementsSection({ improvements }: FutureImprovementsSectionProps) {
  if (!improvements?.length) return null;

  return (
    <section id="future-improvements" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
          <Rocket className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Future Improvements</h2>
          <p className="text-sm text-gray-500 mt-0.5">Planned enhancements and roadmap</p>
        </div>
      </div>
      <div className="space-y-3">
        {improvements.map((improvement, i) => (
          <div
            key={i}
            className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-cyan-500/20 transition-all duration-300"
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 text-xs font-bold shrink-0 mt-0.5">
              {i + 1}
            </span>
            <p className="text-gray-300 leading-relaxed">{improvement}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";
import { Lightbulb } from "lucide-react";
import { ITechDecision } from "@/types";

interface TechnologyDecisionsSectionProps {
  decisions: ITechDecision[];
}

export default function TechnologyDecisionsSection({ decisions }: TechnologyDecisionsSectionProps) {
  if (!decisions?.length) return null;

  return (
    <section id="tech-decisions" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
          <Lightbulb className="w-5 h-5 text-violet-400" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Technology Decisions</h2>
          <p className="text-sm text-gray-500 mt-0.5">Why each tool was chosen</p>
        </div>
      </div>
      <div className="space-y-3">
        {decisions.map((decision, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-violet-500/20 transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 text-gray-400 uppercase tracking-wider">
                  {decision.category}
                </span>
                <h4 className="text-white font-semibold text-sm">{decision.tech}</h4>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-2">{decision.reason}</p>
            {decision.alternatives && (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="text-gray-600">Alternatives considered:</span>
                <span className="text-gray-400">{decision.alternatives}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

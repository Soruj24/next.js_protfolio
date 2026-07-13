"use client";
import { Shield } from "lucide-react";
import { IDevelopmentHighlight } from "@/models/Project";

interface TechnicalChallengesSectionProps {
  highlights: IDevelopmentHighlight[];
}

export default function TechnicalChallengesSection({ highlights }: TechnicalChallengesSectionProps) {
  if (!highlights?.length) return null;

  return (
    <section id="technical-challenges" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
          <Shield className="w-5 h-5 text-orange-400" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Technical Challenges</h2>
          <p className="text-sm text-gray-500 mt-0.5">Difficult problems solved during development</p>
        </div>
      </div>
      <div className="space-y-4">
        {highlights.map((item, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-orange-500/20 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-orange-500/10 text-orange-400 text-xs font-bold">
                {i + 1}
              </span>
              <h4 className="text-white font-semibold text-sm">{item.title}</h4>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed pl-9">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

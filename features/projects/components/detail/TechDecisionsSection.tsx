"use client";
import { motion } from "framer-motion";
import { GitBranch } from "lucide-react";
import type { ITechDecision } from "@/types";

interface TechDecisionsSectionProps {
  techDecisions: ITechDecision[];
}

const categoryColors: Record<string, string> = {
  framework: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  ui: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  state: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  data: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  animation: "text-pink-400 bg-pink-500/10 border-pink-500/20",
  tooling: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  deployment: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  other: "text-gray-400 bg-gray-500/10 border-gray-500/20",
};

export default function TechDecisionsSection({ techDecisions }: TechDecisionsSectionProps) {
  return (
    <section id="tech-decisions" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <GitBranch className="w-4 h-4 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Technology Decisions
          </h2>
        </div>

        <div className="space-y-3">
          {techDecisions.map((decision, i) => (
            <motion.div
              key={decision.tech}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="rounded-2xl bg-white/[0.02] border border-white/[0.05] p-5 hover:border-white/[0.1] transition-colors"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-sm font-bold text-white">{decision.tech}</span>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${categoryColors[decision.category] || categoryColors.other}`}>
                    {decision.category}
                  </span>
                </div>
              </div>
              <p className="text-gray-500 text-[13px] leading-relaxed mb-3">
                {decision.reason}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Alternatives:
                </span>
                <span className="text-[11px] text-gray-400">{decision.alternatives}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

"use client";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface ProblemSectionProps {
  problem: string;
}

export default function ProblemSection({ problem }: ProblemSectionProps) {
  return (
    <section id="problem" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            The Problem
          </h2>
        </div>

        <div className="relative pl-6 border-l-2 border-amber-500/20">
          <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
          <p className="text-gray-400 text-[15px] leading-[1.8]">
            {problem}
          </p>
        </div>
      </motion.div>
    </section>
  );
}

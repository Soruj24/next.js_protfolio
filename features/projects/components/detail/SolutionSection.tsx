"use client";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

interface SolutionSectionProps {
  solution: string;
}

export default function SolutionSection({ solution }: SolutionSectionProps) {
  return (
    <section id="solution" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
            <Lightbulb className="w-4 h-4 text-cyan-400" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            The Solution
          </h2>
        </div>

        <div className="relative pl-6 border-l-2 border-cyan-500/20">
          <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
          <p className="text-gray-400 text-[15px] leading-[1.8]">
            {solution}
          </p>
        </div>
      </motion.div>
    </section>
  );
}

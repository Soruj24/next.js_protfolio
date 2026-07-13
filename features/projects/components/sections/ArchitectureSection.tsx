"use client";
import { GitBranch } from "lucide-react";
import { motion } from "framer-motion";

interface ArchitectureSectionProps {
  architecture: string;
}

export default function ArchitectureSection({ architecture }: ArchitectureSectionProps) {
  if (!architecture) return null;

  return (
    <section id="architecture" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
          <GitBranch className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Architecture</h2>
          <p className="text-sm text-gray-500 mt-0.5">System design and data flow</p>
        </div>
      </div>
      <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 leading-relaxed whitespace-pre-line font-mono text-sm">
              {architecture}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

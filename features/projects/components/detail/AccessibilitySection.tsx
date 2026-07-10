"use client";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import type { IAccessibilityItem } from "@/types";

interface AccessibilitySectionProps {
  accessibility: IAccessibilityItem[];
}

export default function AccessibilitySection({ accessibility }: AccessibilitySectionProps) {
  return (
    <section id="accessibility" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
            <Eye className="w-4 h-4 text-indigo-400" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Accessibility
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {accessibility.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                {item.wcag && (
                  <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold text-indigo-400">
                    {item.wcag}
                  </span>
                )}
              </div>
              <p className="text-[13px] text-gray-500 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

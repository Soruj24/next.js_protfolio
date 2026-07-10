"use client";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

interface FutureSectionProps {
  futureImprovements: string[];
}

export default function FutureSection({ futureImprovements }: FutureSectionProps) {
  return (
    <section id="future" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
            <Rocket className="w-4 h-4 text-rose-400" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Future Improvements
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {futureImprovements.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-[13px] text-gray-400 hover:border-white/[0.1] transition-colors"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

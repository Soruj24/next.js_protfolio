"use client";
import { ListChecks } from "lucide-react";
import { motion } from "framer-motion";

interface FeaturesSectionProps {
  features: string[];
}

export default function FeaturesSection({ features }: FeaturesSectionProps) {
  if (!features?.length) return null;

  return (
    <section id="features" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
          <ListChecks className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Features</h2>
          <p className="text-sm text-gray-500 mt-0.5">Key capabilities and functionality</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-cyan-500/20 transition-all duration-300"
          >
            <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

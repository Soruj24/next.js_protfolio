"use client";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import type { ISEOItem } from "@/types";

interface SEOSectionProps {
  seo: ISEOItem[];
}

export default function SEOSection({ seo }: SEOSectionProps) {
  return (
    <section id="seo" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
            <Search className="w-4 h-4 text-sky-400" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            SEO Strategy
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {seo.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] transition-colors"
            >
              <h4 className="text-sm font-semibold text-white mb-2">{item.title}</h4>
              <p className="text-[13px] text-gray-500 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

"use client";
import { Search } from "lucide-react";
import { ISEOItem } from "@/types";

interface SEOSectionProps {
  items: ISEOItem[];
}

export default function SEOSection({ items }: SEOSectionProps) {
  if (!items?.length) return null;

  return (
    <section id="seo" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
          <Search className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">SEO</h2>
          <p className="text-sm text-gray-500 mt-0.5">Search engine optimization strategy</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-blue-500/20 transition-all duration-300"
          >
            <h4 className="text-white font-semibold text-sm mb-1">{item.title}</h4>
            <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

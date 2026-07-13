"use client";
import { Eye } from "lucide-react";
import { IAccessibilityItem } from "@/types";

interface AccessibilitySectionProps {
  items: IAccessibilityItem[];
}

export default function AccessibilitySection({ items }: AccessibilitySectionProps) {
  if (!items?.length) return null;

  return (
    <section id="accessibility" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
          <Eye className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Accessibility</h2>
          <p className="text-sm text-gray-500 mt-0.5">Inclusive design for all users</p>
        </div>
      </div>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-emerald-500/20 transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h4 className="text-white font-semibold text-sm mb-1">{item.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
              {item.wcag && (
                <span className="shrink-0 px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-medium border border-emerald-500/20">
                  {item.wcag}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

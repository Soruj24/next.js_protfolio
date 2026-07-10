"use client";
import { motion } from "framer-motion";
import { Network } from "lucide-react";

interface ArchitectureSectionProps {
  architecture: string;
}

const layers = [
  { label: "Client", color: "cyan", items: ["React Components", "Custom Hooks", "UI Library"] },
  { label: "State", color: "purple", items: ["Redux / Zustand", "TanStack Query", "Local State"] },
  { label: "Logic", color: "blue", items: ["Business Logic", "Validation", "Animation Engine"] },
  { label: "Data", color: "amber", items: ["REST API", "WebSockets", "Cache Layer"] },
  { label: "Infrastructure", color: "emerald", items: ["CDN", "Edge Functions", "Database"] },
];

const colorMap: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  cyan: { bg: "bg-cyan-500/[0.04]", border: "border-cyan-500/15", text: "text-cyan-400", dot: "bg-cyan-500" },
  purple: { bg: "bg-purple-500/[0.04]", border: "border-purple-500/15", text: "text-purple-400", dot: "bg-purple-500" },
  blue: { bg: "bg-blue-500/[0.04]", border: "border-blue-500/15", text: "text-blue-400", dot: "bg-blue-500" },
  amber: { bg: "bg-amber-500/[0.04]", border: "border-amber-500/15", text: "text-amber-400", dot: "bg-amber-500" },
  emerald: { bg: "bg-emerald-500/[0.04]", border: "border-emerald-500/15", text: "text-emerald-400", dot: "bg-emerald-500" },
};

export default function ArchitectureSection({ architecture }: ArchitectureSectionProps) {
  return (
    <section id="architecture" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
            <Network className="w-4 h-4 text-purple-400" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Architecture
          </h2>
        </div>

        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          {architecture}
        </p>

        {/* Visual Diagram */}
        <div className="space-y-3">
          {layers.map((layer, i) => {
            const colors = colorMap[layer.color];
            return (
              <motion.div
                key={layer.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className={`relative ${colors.bg} ${colors.border} border rounded-2xl p-4`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
                  <span className={`text-xs font-bold uppercase tracking-widest ${colors.text}`}>
                    {layer.label}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 ml-5">
                  {layer.items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.05] text-[11px] font-medium text-gray-500"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                {i < layers.length - 1 && (
                  <div className="absolute -bottom-3 left-8 w-px h-3 bg-gradient-to-b from-white/10 to-transparent" />
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

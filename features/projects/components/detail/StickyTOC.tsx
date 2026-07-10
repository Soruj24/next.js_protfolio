"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { List } from "lucide-react";

interface TOCItem {
  id: string;
  label: string;
}

interface StickyTOCProps {
  items: TOCItem[];
  activeId: string;
}

export default function StickyTOC({ items, activeId }: StickyTOCProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop TOC */}
      <nav className="hidden xl:block sticky top-24 w-56 flex-shrink-0" aria-label="Table of contents">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">
            On this page
          </span>
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`relative w-full text-left px-3 py-1.5 rounded-lg text-[13px] transition-all duration-200 ${
                  isActive
                    ? "text-cyan-400 font-medium"
                    : "text-gray-400 hover:text-gray-400"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="toc-indicator"
                    className="absolute inset-0 bg-cyan-500/[0.06] rounded-lg border border-cyan-500/10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile TOC FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="xl:hidden fixed bottom-6 left-6 z-50 w-12 h-12 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-white transition-colors shadow-lg"
        aria-label="Toggle table of contents"
      >
        <List className="w-5 h-5" />
      </button>

      {/* Mobile TOC Panel */}
      {isOpen && (
        <>
          <div className="xl:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setIsOpen(false)} />
          <motion.nav
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="xl:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a0f1a]/98 backdrop-blur-2xl border-t border-white/[0.06] rounded-t-3xl p-6 max-h-[60vh] overflow-y-auto"
            aria-label="Table of contents"
          >
            <div className="w-10 h-1 rounded-full bg-white/10 mx-auto mb-5" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">
              On this page
            </span>
            <div className="space-y-1">
              {items.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleClick(item.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "text-cyan-400 bg-cyan-500/[0.06]"
                        : "text-gray-500 hover:text-white hover:bg-white/[0.03]"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </motion.nav>
        </>
      )}
    </>
  );
}

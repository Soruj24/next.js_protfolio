"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ListOrdered } from "lucide-react";

interface TocItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 },
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  };

  return (
    <nav className="hidden lg:block sticky top-28 w-56 shrink-0 self-start" style={{ height: "fit-content" }}>
      <div className="space-y-1">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-gray-300 transition-colors mb-3 w-full"
        >
          <ListOrdered className="w-3.5 h-3.5" />
          On this page
          <svg
            className={`w-3 h-3 ml-auto transition-transform ${isCollapsed ? "rotate-180" : ""}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-0.5"
          >
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`text-left text-sm py-1.5 px-3 rounded-lg transition-all duration-200 ${
                  activeId === item.id
                    ? "text-cyan-400 bg-cyan-500/10 font-medium"
                    : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.03]"
                }`}
              >
                <span className="truncate block">{item.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-white/[0.06]">
        <div className="relative h-1 bg-white/5 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-150"
            id="toc-progress-bar"
            style={{ width: "0%" }}
          />
        </div>
      </div>
    </nav>
  );
}

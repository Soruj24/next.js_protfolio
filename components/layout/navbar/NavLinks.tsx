"use client";
import { motion } from "framer-motion";

interface NavLinksProps {
  items: Array<{ id: string; label: string }>;
  activeSection: string;
  onSelect: (id: string) => void;
}

export default function NavLinks({ items, activeSection, onSelect }: NavLinksProps) {
  return (
    <div className="hidden lg:flex items-center gap-0.5 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06]">
      {items.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`relative px-3.5 py-2 rounded-lg text-[13px] font-medium transition-colors duration-200 outline-none ${
              isActive
                ? "text-white"
                : "text-gray-500 hover:text-gray-300"
            }`}
            aria-current={isActive ? "true" : undefined}
          >
            {isActive && (
              <motion.div
                layoutId="nav-active-pill"
                className="absolute inset-0 bg-white/[0.08] rounded-lg border border-white/[0.08]"
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 30,
                }}
              />
            )}
            <span className="relative z-10">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

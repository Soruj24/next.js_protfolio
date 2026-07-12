"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/features/admin/contexts/SidebarContext";
import { allPages } from "@/features/admin/data/navigation";

export default function SidebarSearch({ collapsed: isCollapsed }: { collapsed: boolean }) {
  const router = useRouter();
  const { setMobileOpen } = useSidebar();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof allPages>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    setResults(
      allPages.filter(
        (p) => p.name.toLowerCase().includes(q) || p.href.toLowerCase().includes(q)
      )
    );
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      router.push(results[selectedIndex].href);
      setQuery("");
      setIsOpen(false);
      setMobileOpen(false);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setQuery("");
    }
  };

  if (isCollapsed) {
    return (
      <button
        onClick={() => {
          setIsOpen(true);
          setTimeout(() => inputRef.current?.focus(), 50);
        }}
        className="flex items-center justify-center w-full py-2 rounded-lg text-gray-600 hover:text-gray-300 hover:bg-white/[0.04] transition-all duration-200 group"
        title="Search (⌘K)"
      >
        <Search size={18} />
      </button>
    );
  }

  return (
    <>
      <div className="relative">
        <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search..."
          className="w-full h-9 pl-8 pr-14 rounded-lg bg-white/[0.04] border border-white/[0.06] text-sm text-white placeholder-gray-600 outline-none focus:border-cyan-500/30 focus:bg-white/[0.06] transition-all duration-200 font-medium"
        />
        <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-gray-600 font-mono bg-white/5 border border-white/[0.08] rounded px-1.5 py-0.5 pointer-events-none">
          ⌘K
        </kbd>
      </div>

      {isOpen && (query.trim() ? results.length > 0 : false) && (
        <div className="absolute left-3 right-3 top-full mt-1 rounded-xl border border-white/10 bg-[#0a0a0f]/95 backdrop-blur-2xl shadow-2xl shadow-black/50 overflow-hidden z-50 animate-fade-in-up">
          <div className="p-1.5">
            {results.map((page, i) => (
              <Link
                key={page.href}
                href={page.href}
                onClick={() => {
                  setQuery("");
                  setIsOpen(false);
                  setMobileOpen(false);
                }}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-100",
                  i === selectedIndex
                    ? "bg-cyan-500/10 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                <page.icon size={15} className="text-gray-500" />
                {page.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

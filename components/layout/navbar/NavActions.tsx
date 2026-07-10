"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, LogIn } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";

function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") as "dark" | "light" | null;
    const initial = stored || "dark";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
    document.documentElement.classList.toggle("light", initial === "light");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(next);
  };

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06]" />
    );
  }

  return (
    <button
      onClick={toggle}
      className="relative w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="w-4 h-4" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="w-4 h-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

export default function NavActions() {
  const { data: session } = useSession();

  return (
    <div className="hidden lg:flex items-center gap-2">
      <ThemeToggle />
      {session ? (
        <Link
          href="/admin"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[13px] font-medium text-gray-500 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50"
        >
          Dashboard
        </Link>
      ) : (
        <Link
          href="/login"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[13px] font-medium text-gray-500 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50"
        >
          <LogIn className="w-3.5 h-3.5" />
          Login
        </Link>
      )}
    </div>
  );
}

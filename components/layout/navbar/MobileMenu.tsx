"use client";
import { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, LogIn, LayoutDashboard, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: Array<{ id: string; label: string }>;
  activeSection: string;
  onSelect: (id: string) => void;
}

export default function MobileMenu({
  isOpen,
  onClose,
  items,
  activeSection,
  onSelect,
}: MobileMenuProps) {
  const { data: session } = useSession();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  const handleSelect = (id: string) => {
    onSelect(id);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
            className="fixed top-0 right-0 h-full w-[min(360px,85vw)] bg-[#080c15]/98 backdrop-blur-2xl border-l border-white/[0.06] z-[70] lg:hidden flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
              <span className="text-sm font-semibold text-white/80 tracking-tight">
                Navigation
              </span>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/[0.08] transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Mobile navigation">
              <div className="space-y-1">
                {items.map((item, i) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.3 }}
                      onClick={() => handleSelect(item.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 ${
                        isActive
                          ? "text-white bg-white/[0.06] border border-white/[0.08]"
                          : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.03] border border-transparent"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.label}
                    </motion.button>
                  );
                })}
              </div>
            </nav>

            {/* Footer */}
            <div className="px-6 py-5 border-t border-white/[0.06]">
              {session ? (
                <div className="space-y-3">
                  {session.user?.role === "admin" && (
                    <Link
                      href="/admin"
                      onClick={onClose}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      signOut();
                      onClose();
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors w-full outline-none focus-visible:ring-2 focus-visible:ring-red-500/50"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-sm font-medium text-white hover:bg-white/[0.1] transition-all outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

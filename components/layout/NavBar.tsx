"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useNavScroll } from "@/hooks/useNavScroll";
import NavLogo from "./navbar/NavLogo";
import NavLinks from "./navbar/NavLinks";
import NavActions from "./navbar/NavActions";
import MobileMenu from "./navbar/MobileMenu";
import ScrollProgress from "./navbar/ScrollProgressBar";
import { usePortfolioSettings } from "@/hooks/usePortfolioSettings";

const DEFAULT_NAV = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "about", label: "About", icon: "👨‍💻" },
  { id: "skills", label: "Skills", icon: "⚡" },
  { id: "projects", label: "Projects", icon: "🚀" },
  { id: "experience", label: "Experience", icon: "💼" },
  { id: "services", label: "Services", icon: "🎯" },
  { id: "testimonials", label: "Testimonials", icon: "💬" },
  { id: "faq", label: "FAQ", icon: "❓" },
  { id: "contact", label: "Contact", icon: "📞" },
];

interface NavBarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function NavBar({ activeSection, setActiveSection }: NavBarProps) {
  const { isVisible, isAtTop, scrollProgress } = useNavScroll();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { settings } = usePortfolioSettings();

  const navItems = settings?.nav_items?.length
    ? settings.nav_items.filter((n) => n.visible)
    : DEFAULT_NAV;

  const handleSelect = useCallback(
    (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    },
    [setActiveSection]
  );

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Sync active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = navItems.map((item) => item.id);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [setActiveSection]);

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{
          y: isVisible ? 0 : -100,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
          isAtTop
            ? "bg-transparent"
            : "bg-[#030712]/70 backdrop-blur-xl border-b border-white/[0.04]"
        }`}
      >
        <ScrollProgress progress={scrollProgress} />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <NavLogo />

            {/* Desktop */}
            <NavLinks
              items={navItems}
              activeSection={activeSection}
              onSelect={handleSelect}
            />

            {/* Actions */}
            <div className="flex items-center gap-2">
              <NavActions />

              {/* Mobile toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        items={navItems}
        activeSection={activeSection}
        onSelect={handleSelect}
      />
    </>
  );
}

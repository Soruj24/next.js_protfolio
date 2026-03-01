"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useSession } from "next-auth/react";
import personalData from "../../data/Parsonal.json";
import NavLogo from "./navbar/NavLogo";
import DesktopMenu from "./navbar/DesktopMenu";
import MobileMenu from "./navbar/MobileMenu";
import ScrollProgressBar from "./navbar/ScrollProgressBar";

interface NavBarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

function NavBar({ activeSection, setActiveSection }: NavBarProps) {
  const { data: session } = useSession();
  const navRef = useRef<HTMLElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navItems = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "about", label: "About", icon: "👨‍💻" },
    { id: "skills", label: "Skills", icon: "⚡" },
    { id: "innovation", label: "Innovation", icon: "💡" },
    { id: "projects", label: "Projects", icon: "🚀" },
    { id: "contact", label: "Contact", icon: "📞" },
  ];

  // Scroll logic
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initial Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".nav-item",
        { y: -100, opacity: 0, rotationX: 90 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 0.5,
        }
      );

      gsap.fromTo(
        ".nav-logo",
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 1.5, ease: "elastic.out(1, 0.8)" }
      );

      gsap.fromTo(
        ".hamburger-line",
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 0.6, stagger: 0.1, delay: 1 }
      );
    });
    return () => ctx.revert();
  }, []);

  // Mobile Menu Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isMobileMenuOpen) {
        gsap.fromTo(
          backdropRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: "power2.out" }
        );

        gsap.fromTo(
          mobileMenuRef.current,
          { x: "100%", scale: 0.95 },
          { x: 0, scale: 1, duration: 0.6, ease: "back.out(1.4)" }
        );

        gsap.fromTo(
          ".mobile-nav-item",
          { x: 100, opacity: 0, rotationY: 45 },
          {
            x: 0,
            opacity: 1,
            rotationY: 0,
            duration: 0.8,
            stagger: 0.08,
            delay: 0.3,
            ease: "elastic.out(1, 0.7)",
          }
        );

        gsap.fromTo(
          ".mobile-profile-item",
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            delay: 0.9,
            ease: "power4.out",
          }
        );
      } else {
        gsap.to(backdropRef.current, { opacity: 0, duration: 0.3 });
        gsap.to(mobileMenuRef.current, {
          x: "100%",
          duration: 0.4,
          ease: "power3.in",
        });
      }
    });

    return () => ctx.revert();
  }, [isMobileMenuOpen]);

  useEffect(() => {
    try {
      document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
      document.documentElement.style.overscrollBehavior = isMobileMenuOpen ? "none" : "";
    } catch {}
    return () => {
      try {
        document.body.style.overflow = "";
        document.documentElement.style.overscrollBehavior = "";
      } catch {}
    };
  }, [isMobileMenuOpen]);

  const updateUnderline = (element: HTMLElement) => {
    if (underlineRef.current && navRef.current) {
      const { left, width } = element.getBoundingClientRect();
      const navLeft = navRef.current.getBoundingClientRect().left;
      gsap.to(underlineRef.current, {
        left: left - navLeft,
        width,
        duration: 0.4,
        ease: "elastic.out(1, 0.5)",
      });
    }
  };

  const handleNavClick = (id: string, isLink?: boolean) => {
    if (isLink) {
      window.location.href = `/${id}`;
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "py-2 sm:py-3 bg-[#030712]/80 backdrop-blur-2xl border-b border-white/10 shadow-2xl"
          : "py-4 sm:py-6 bg-transparent"
      }`}
    >
      <ScrollProgressBar progress={scrollProgress} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <NavLogo />

          <DesktopMenu
            navItems={navItems}
            activeSection={activeSection}
            handleNavClick={handleNavClick}
            underlineRef={underlineRef}
            updateUnderline={updateUnderline}
          />

          <div className="flex items-center space-x-2 sm:space-x-4">

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden relative z-[80] p-2 group"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="w-6 h-5 flex flex-col justify-between overflow-hidden">
                <span
                  className={`hamburger-line h-0.5 w-full bg-cyan-500 rounded-full transition-all duration-300 origin-left ${
                    isMobileMenuOpen ? "rotate-45 translate-x-1" : ""
                  }`}
                ></span>
                <span
                  className={`hamburger-line h-0.5 w-full bg-blue-500 rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0 -translate-x-full" : ""
                  }`}
                ></span>
                <span
                  className={`hamburger-line h-0.5 w-full bg-purple-500 rounded-full transition-all duration-300 origin-left ${
                    isMobileMenuOpen ? "-rotate-45 translate-x-1" : ""
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        ref={mobileMenuRef}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
        activeSection={activeSection}
        handleNavClick={handleNavClick}
        session={session}
        backdropRef={backdropRef}
      />
    </nav>
  );
}

export default NavBar;

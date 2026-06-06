"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { useSession } from "next-auth/react";
import { useNavScroll } from "@/hooks/useNavScroll";
import { useNavAnimation } from "@/hooks/useNavAnimation";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import NavLogo from "./navbar/NavLogo";
import DesktopMenu from "./navbar/DesktopMenu";
import MobileMenu from "./navbar/MobileMenu";
import ScrollProgressBar from "./navbar/ScrollProgressBar";
import UserDropdown from "./navbar/UserDropdown";
import { navItems } from "@/services";

interface NavBarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function NavBar({ activeSection, setActiveSection }: NavBarProps) {
  const { data: session } = useSession();
  const navRef = useRef<HTMLElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const { isScrolled, scrollProgress } = useNavScroll();
  useNavAnimation(navRef);
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useMobileMenu(mobileMenuRef, backdropRef);

  const updateUnderline = (element: HTMLElement) => {
    if (underlineRef.current && navRef.current) {
      const { left, width } = element.getBoundingClientRect();
      const navLeft = navRef.current.getBoundingClientRect().left;
      gsap.to(underlineRef.current, { left: left - navLeft, width, duration: 0.4, ease: "elastic.out(1, 0.5)" });
    }
  };

  const handleNavClick = (id: string, isLink?: boolean) => {
    if (isLink) { window.location.href = `/${id}`; return; }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "py-2 sm:py-3 bg-[#030712]/80 backdrop-blur-2xl border-b border-white/10 shadow-2xl" : "py-4 sm:py-6 bg-transparent"
      }`}
    >
      <ScrollProgressBar progress={scrollProgress} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <NavLogo />
          <DesktopMenu navItems={navItems} activeSection={activeSection} handleNavClick={handleNavClick} underlineRef={underlineRef} updateUnderline={updateUnderline} />

          <div className="flex items-center space-x-2 sm:space-x-4">
            <UserDropdown session={session} />
            <button className="lg:hidden relative z-[80] p-2 group" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <div className="w-6 h-5 flex flex-col justify-between overflow-hidden">
                <span className={`hamburger-line h-0.5 w-full bg-cyan-500 rounded-full transition-all duration-300 origin-left ${isMobileMenuOpen ? "rotate-45 translate-x-1" : ""}`} />
                <span className={`hamburger-line h-0.5 w-full bg-blue-500 rounded-full transition-all duration-300 ${isMobileMenuOpen ? "opacity-0 -translate-x-full" : ""}`} />
                <span className={`hamburger-line h-0.5 w-full bg-purple-500 rounded-full transition-all duration-300 origin-left ${isMobileMenuOpen ? "-rotate-45 translate-x-1" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      <MobileMenu ref={mobileMenuRef} isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} navItems={navItems} activeSection={activeSection} handleNavClick={handleNavClick} session={session} backdropRef={backdropRef} />
    </nav>
  );
}

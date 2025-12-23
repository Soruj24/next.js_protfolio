"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import NavItem from "../ui/NavItem";
import Link from "next/link";

interface NavBarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

function NavBar({ activeSection, setActiveSection }: NavBarProps) {
  const navRef = useRef<HTMLElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<SVGSVGElement>(null);
  const mobileProfileRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const registerLinkRef = useRef<HTMLAnchorElement>(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Chevron animation
  useEffect(() => {
    if (!chevronRef.current) return;

    if (isMobileMenuOpen) {
      gsap.to(chevronRef.current, {
        rotation: 180,
        duration: 0.5,
        ease: "elastic.out(1.2, 0.5)",
      });
    } else {
      gsap.to(chevronRef.current, {
        rotation: 0,
        duration: 0.4,
        ease: "power3.out",
      });
    }
  }, [isMobileMenuOpen]);

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

        if (mobileProfileRef.current) {
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
        }
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

  // Scroll & Initial Animations
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

      // Animate register link
      gsap.fromTo(
        ".register-link",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, delay: 1.2, ease: "power3.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  const navItems = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "about", label: "About", icon: "👨‍💻" },
    { id: "skills", label: "Skills", icon: "⚡" },
    { id: "journey", label: "Journey", icon: "📈" },
    { id: "projects", label: "Projects", icon: "🚀" },
    { id: "contact", label: "Contact", icon: "📞" },
  ];

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

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleNavClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    closeMobileMenu();
  };

  // Test if the link is clickable
  const handleRegisterClick = (e: React.MouseEvent) => {
    console.log("Register link clicked!");
    // Add any additional logic here
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out
        ${
          isScrolled
            ? "bg-black/80 backdrop-blur-2xl py-2 shadow-lg border-b border-white/20"
            : "bg-black/20 backdrop-blur-xl py-4 border-b border-white/10"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href={"/"}>
            <div
              className={`nav-logo font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent 
              hover:scale-110 transition-all duration-500 cursor-pointer
              ${isScrolled ? "text-xl" : "text-2xl"}`}
              onClick={() => handleNavClick("home")}
            >
              Soruj Mahmud
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 relative">
            <div className="flex space-x-1 relative">
              <div
                ref={underlineRef}
                className="absolute bottom-0 h-0.5 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"
                style={{ width: "0px", left: "0px" }}
              />
              {navItems.map((item) => (
                <NavItem
                  key={item.id}
                  item={item}
                  isActive={activeSection === item.id}
                  onClick={() => handleNavClick(item.id)}
                  onHover={updateUnderline}
                />
              ))}
            </div>
          </div>

          {/* Mobile: Register Link + Hamburger */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Mobile Hamburger */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="flex flex-col justify-center items-center w-10 h-10 space-y-1.5 relative z-50"
              aria-label="Toggle menu"
            >
              <span
                className={`hamburger-line block w-8 h-0.5 bg-cyan-400 rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`hamburger-line block w-8 h-0.5 bg-cyan-400 rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`hamburger-line block w-8 h-0.5 bg-cyan-400 rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-y-0 right-0 w-80 bg-black/95 backdrop-blur-3xl border-l border-cyan-500/30 
          shadow-2xl shadow-cyan-600/30 transform translate-x-full md:hidden z-40"
      >
        <div className="flex flex-col items-start space-y-8 pt-32 px-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`mobile-nav-item flex items-center space-x-4 text-3xl font-medium 
                transition-all duration-500 ${
                  activeSection === item.id ? "text-cyan-400" : "text-white"
                } 
                hover:text-cyan-300 hover:translate-x-4`}
            >
              <span className="text-4xl">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div
          ref={backdropRef}
          onClick={closeMobileMenu}
          className="fixed inset-0 bg-black/70 z-30 md:hidden backdrop-blur-sm"
        />
      )}
    </nav>
  );
}

export default NavBar;

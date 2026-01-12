"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import NavItem from "../ui/NavItem";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { LogOut, User as UserIcon, LayoutDashboard, LogIn } from "lucide-react";
import DynamicResume from "../ui/DynamicResume";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NavBarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

function NavBar({ activeSection, setActiveSection }: NavBarProps) {
  const { data: session } = useSession();
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
  const [scrollProgress, setScrollProgress] = useState(0);

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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    
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
    <>
      <nav
        ref={navRef}
        className={`fixed top-6 left-1/2 -translate-x-1/2 transition-all duration-500 ease-out w-[95%] max-w-5xl
          ${isMobileMenuOpen ? "z-[70]" : "z-50"}
          ${
            isScrolled
              ? "bg-black/40 backdrop-blur-2xl py-2 px-6 rounded-full border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
              : "bg-transparent py-4 px-4"
          }`}
      >
        <div className="w-full">
          <div className="flex justify-between items-center">
            <Link href={"/"}>
              <div
                className={`nav-logo font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent 
                hover:scale-105 transition-all duration-500 cursor-pointer flex items-center gap-2
                drop-shadow-[0_0_8px_rgba(34,211,238,0.4)] hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]
                ${isScrolled ? "text-xl" : "text-2xl"}`}
                onClick={() => handleNavClick("home")}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  SM
                </div>
                <span className="hidden sm:block tracking-tighter">Soruj </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 relative">
              <div className="flex space-x-1 relative">
                <div
                  ref={underlineRef}
                  className="absolute bottom-0 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)]"
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

              {/* Auth Button / User Menu */}
              <div className="flex items-center ml-4 space-x-4">
                {session ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none">
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                        <Avatar className="h-10 w-10 border-2 border-white/10 relative">
                          <AvatarImage src={session.user?.image || ""} alt={session.user?.name || "User"} />
                          <AvatarFallback className="bg-gray-800 text-cyan-400">
                            {session.user?.name?.charAt(0) || <UserIcon size={20} />}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-black/90 backdrop-blur-xl border-white/10 text-white" align="end">
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{session.user?.name}</p>
                          <p className="text-xs leading-none text-gray-400">{session.user?.email}</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-white/10" />
                      {(session.user as { role?: string }).role === "admin" && (
                        <Link href="/admin">
                          <DropdownMenuItem className="cursor-pointer hover:bg-white/5 focus:bg-white/5 text-white">
                            <LayoutDashboard className="mr-2 h-4 w-4 text-cyan-400" />
                            <span>Admin Dashboard</span>
                          </DropdownMenuItem>
                        </Link>
                      )}
                      <DropdownMenuItem 
                        className="cursor-pointer text-red-400 hover:bg-red-400/10 focus:bg-red-400/10"
                        onClick={() => signOut()}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link href="/login">
                    <button className="relative group px-6 py-2 rounded-full overflow-hidden transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-20 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute inset-[1px] bg-black rounded-full group-hover:bg-transparent transition-colors duration-500"></div>
                      <span className="relative flex items-center gap-2 text-sm font-medium text-cyan-400 group-hover:text-white transition-colors duration-300">
                        <LogIn size={16} />
                        Login
                      </span>
                    </button>
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile: Hamburger */}
            <div className="md:hidden flex items-center space-x-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
                className="flex flex-col justify-center items-center w-10 h-10 space-y-1.5 relative z-[60]"
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

        {/* Scroll Progress Bar */}
        <div 
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 transition-all duration-150 ease-out rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </nav>

      {/* Mobile Menu Portal Area (Outside transformed container) */}
      <div className="md:hidden">
        {/* Backdrop Overlay */}
        <div
          ref={backdropRef}
          onClick={closeMobileMenu}
          className={`fixed inset-0 bg-black/80 backdrop-blur-md z-[55] transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        />

        {/* Sliding Menu */}
        <div
          ref={mobileMenuRef}
          className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-black/95 backdrop-blur-2xl border-l border-white/10 
            shadow-2xl z-[60] flex flex-col pt-32 px-10 overflow-y-auto"
        >
          <div className="flex flex-col space-y-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`mobile-nav-item flex items-center space-x-4 text-2xl font-bold 
                  transition-all duration-300 ${
                    activeSection === item.id 
                      ? "text-cyan-400" 
                      : "text-white/70"
                  } 
                  hover:text-cyan-300`}
              >
                <span className="text-2xl">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}

            {/* Mobile Auth Section */}
            <div className="mobile-nav-item pt-10 mt-6 border-t border-white/10 w-full">
              {session ? (
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12 border-2 border-cyan-500/50">
                      <AvatarImage src={session.user?.image || ""} />
                      <AvatarFallback>{session.user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-lg font-bold text-white leading-tight">{session.user?.name}</p>
                      <p className="text-xs text-gray-400">{session.user?.email}</p>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-4">
                    {(session.user as { role?: string })?.role === "admin" && (
                      <Link href="/admin" onClick={closeMobileMenu} className="flex items-center space-x-3 text-lg text-cyan-400">
                        <LayoutDashboard size={20} />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}
                    <button 
                      onClick={() => { signOut(); closeMobileMenu(); }}
                      className="flex items-center space-x-3 text-lg text-red-400"
                    >
                      <LogOut size={20} />
                      <span>Log out</span>
                    </button>
                  </div>
                </div>
              ) : (
                <Link href="/login" onClick={closeMobileMenu}>
                  <button className="flex items-center space-x-3 text-2xl font-bold text-white hover:text-cyan-400 transition-colors">
                    <LogIn size={24} className="text-cyan-400" />
                    <span>Login</span>
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import NavItem from "../ui/NavItem";

interface NavBarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

function NavBar({ activeSection, setActiveSection }: NavBarProps) {
  const navRef = useRef<HTMLElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);

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
        {
          scale: 1,
          rotation: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.8)",
        }
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
      const navLeft = navRef.current.getBoundingClientRect().left || 0;

      gsap.to(underlineRef.current, {
        left: left - navLeft,
        width: width,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-xl border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="nav-logo text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent hover:scale-110 transition-transform cursor-pointer">
            Soruj Mahmud
          </div>

          <div className="hidden md:flex space-x-1 relative">
            <div
              ref={underlineRef}
              className="absolute bottom-0 h-0.5 bg-cyan-400 rounded-full transition-all duration-300"
              style={{ width: "0px", left: "0px" }}
            />

            {navItems.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                isActive={activeSection === item.id}
                onClick={() => {
                  document
                    .getElementById(item.id)
                    ?.scrollIntoView({ behavior: "smooth" });
                  setActiveSection(item.id);
                }}
                onHover={updateUnderline}
              />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

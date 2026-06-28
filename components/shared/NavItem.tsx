import { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface NavItemProps {
  item: {
    id: string;
    label: string;
    icon: string;
  };
  isActive: boolean;
  onClick: () => void;
  onHover: (element: HTMLElement) => void;
}

function NavItem({ item, isActive, onClick, onHover }: NavItemProps) {
  const item_ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isActive && item_ref.current) {
      onHover(item_ref.current);
    }
  }, [isActive, onHover]);

  const handleMouseEnter = () => {
    if (item_ref.current) {
      onHover(item_ref.current);
      gsap.to(item_ref.current, {
        y: -2,
        duration: 0.4,
        ease: "power2.out",
      });
      // Icon bounce animation
      gsap.fromTo(
        item_ref.current.querySelector(".nav-icon"),
        { y: 0 },
        { y: -3, duration: 0.3, yoyo: true, repeat: 1, ease: "power2.inOut" }
      );
    }
  };

  const handleMouseLeave = () => {
    if (item_ref.current) {
      gsap.to(item_ref.current, {
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  return (
    <button
      ref={item_ref}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`nav-item relative px-4 py-2 rounded-md font-medium transition-all duration-300 group flex items-center gap-2
        ${
          isActive 
            ? "text-cyan-500 bg-cyan-500/5" 
            : "text-gray-400 hover:text-white hover:bg-white/5"
        }`}
    >
      <span className="nav-icon text-sm transition-transform duration-300 group-hover:scale-125">
        {item.icon}
      </span>
      <span className="text-xs uppercase tracking-wider font-semibold group-hover:tracking-[0.15em] transition-all duration-300">
        {item.label}
      </span>
      
      {/* Subtle Dot Indicator on Hover */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
    </button>
  );
}

export default NavItem;
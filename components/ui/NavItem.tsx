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
  const itemRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isActive && itemRef.current) {
      onHover(itemRef.current);
    }
  }, [isActive, onHover]);

  const handleMouseEnter = () => {
    if (itemRef.current) {
      onHover(itemRef.current);
      gsap.to(itemRef.current, {
        y: -2,
        scale: 1.05,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    }
  };

  const handleMouseLeave = () => {
    if (itemRef.current) {
      gsap.to(itemRef.current, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <button
      ref={itemRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`nav-item relative px-4 py-2 rounded-lg font-medium transition-all group ${
        isActive ? "text-cyan-400" : "text-gray-300 hover:text-white"
      }`}
    >
      <span className="mr-2">{item.icon}</span>
      {item.label}

      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {isActive && (
        <div className="absolute inset-0 rounded-lg bg-cyan-500/10 animate-pulse" />
      )}
    </button>
  );
}

export default NavItem;
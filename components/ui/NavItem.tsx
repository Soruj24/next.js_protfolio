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
      className={`nav-item relative px-4 py-1.5 rounded-full font-medium transition-all group flex items-center gap-1.5
        ${
          isActive ? "text-cyan-400" : "text-gray-400 hover:text-white"
        }`}
    >
      <span className="text-sm transition-transform duration-300 group-hover:scale-120 group-hover:rotate-12">
        {item.icon}
      </span>
      <span className="text-sm tracking-wide">{item.label}</span>

      {isActive && (
        <div className="absolute inset-0 rounded-full bg-cyan-500/10 border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.2)]" />
      )}
    </button>
  );
}

export default NavItem;
import React from "react";
import NavItem from "../../ui/NavItem";

interface DesktopMenuProps {
  navItems: Array<{ id: string; label: string; icon: string; isLink?: boolean }>;
  activeSection: string;
  handleNavClick: (id: string, isLink?: boolean) => void;
  underlineRef: React.RefObject<HTMLDivElement | null>;
  updateUnderline: (element: HTMLElement) => void;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({
  navItems,
  activeSection,
  handleNavClick,
  underlineRef,
  updateUnderline,
}) => {
  return (
    <div className="hidden lg:flex items-center space-x-2 relative px-2 py-1 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
      {navItems.map((item) => (
        <NavItem
          key={item.id}
          item={item}
          isActive={activeSection === item.id}
          onClick={() => handleNavClick(item.id, item.isLink)}
          onHover={updateUnderline}
        />
      ))}
      {/* Active Underline */}
      <div
        ref={underlineRef}
        className="absolute bottom-1 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full z-0 pointer-events-none"
      ></div>
    </div>
  );
};

export default DesktopMenu;

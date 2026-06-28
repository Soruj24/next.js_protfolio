import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationNavProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  activeColor: {
    bg: string;
    hover: string;
    shadow: string;
  };
  getPageNumbers: () => (number | string)[];
}

const PaginationNav: React.FC<PaginationNavProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  activeColor,
  getPageNumbers,
}) => {
  const NavButton = ({ 
    onClick, 
    disabled, 
    children 
  }: { 
    onClick: () => void; 
    disabled: boolean; 
    children: React.ReactNode 
  }) => (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      disabled={disabled}
      className={`w-12 h-12 rounded-2xl border border-white/5 text-gray-500 ${activeColor.hover} disabled:opacity-10 transition-all duration-300 hover:scale-110 active:scale-95`}
    >
      {children}
    </Button>
  );

  return (
    <div className="flex items-center gap-2 p-2 bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-2xl">
      <NavButton onClick={() => onPageChange(1)} disabled={currentPage === 1}>
        <ChevronsLeft size={20} />
      </NavButton>

      <NavButton onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
        <ChevronLeft size={20} />
      </NavButton>

      <div className="flex items-center gap-2 px-2">
        {getPageNumbers().map((page, index) => (
          typeof page === "number" ? (
            <Button
              key={index}
              variant="ghost"
              onClick={() => onPageChange(page)}
              className={`w-12 h-12 rounded-2xl font-black transition-all duration-500 text-sm ${
                currentPage === page
                  ? `${activeColor.bg} text-white shadow-[0_0_30px_rgba(255,255,255,0.1)] ${activeColor.shadow} scale-110 border-white/20`
                  : `text-gray-500 hover:text-white hover:bg-white/5 border border-white/5 hover:border-white/10`
              }`}
            >
              {page.toString().padStart(2, '0')}
            </Button>
          ) : (
            <span key={index} className="text-gray-700 px-2 font-black tracking-widest">
              {page}
            </span>
          )
        ))}
      </div>

      <NavButton onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>
        <ChevronRight size={20} />
      </NavButton>

      <NavButton onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>
        <ChevronsRight size={20} />
      </NavButton>
    </div>
  );
};

export default PaginationNav;

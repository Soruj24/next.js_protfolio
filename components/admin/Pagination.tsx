"use client";

import PaginationNav from "@/components/ui/pagination/PaginationNav";
import PaginationInfo from "@/components/ui/pagination/PaginationInfo";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  color?: "cyan" | "purple";
}

export default function ProfessionalPagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  color = "cyan",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const colorClasses = {
    cyan: {
      text: "text-cyan-400",
      bg: "bg-cyan-500",
      hover: "hover:text-cyan-400 hover:bg-cyan-400/10",
      border: "border-cyan-500/30",
      shadow: "shadow-cyan-500/20",
      accent: "bg-cyan-500/20",
    },
    purple: {
      text: "text-purple-400",
      bg: "bg-purple-500",
      hover: "hover:text-purple-400 hover:bg-purple-400/10",
      border: "border-purple-500/30",
      shadow: "shadow-purple-500/20",
      accent: "bg-purple-500/20",
    },
  };

  const activeColor = colorClasses[color];

  const getPageNumbers = () => {
    const pages = [];
    const showMax = 5;

    if (totalPages <= showMax) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 mt-24 mb-12">
      <PaginationNav
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        activeColor={activeColor}
        getPageNumbers={getPageNumbers}
      />

      <PaginationInfo
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        activeColor={activeColor}
      />
    </div>
  );
}

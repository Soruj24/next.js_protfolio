import React from "react";

interface PaginationInfoProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  activeColor: {
    text: string;
  };
}

const PaginationInfo: React.FC<PaginationInfoProps> = ({
  currentPage,
  totalPages,
  totalItems,
  activeColor,
}) => {
  return (
    <div className="flex items-center gap-6 px-8 py-3 bg-white/[0.03] border border-white/5 rounded-full backdrop-blur-xl">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Page</span>
        <span className={`text-sm font-black ${activeColor.text}`}>
          {currentPage.toString().padStart(2, '0')}
        </span>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-700">of</span>
        <span className="text-sm font-black text-white">
          {totalPages.toString().padStart(2, '0')}
        </span>
      </div>
      
      <div className="w-px h-4 bg-white/10" />

      <div className="flex items-center gap-2">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Results</span>
        <span className="text-sm font-black text-white">
          {totalItems.toString().padStart(2, '0')}
        </span>
      </div>
    </div>
  );
};

export default PaginationInfo;

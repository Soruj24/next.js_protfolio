"use client";

interface AdminCategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (cat: string) => void;
  accentColor?: string;
}

export default function AdminCategoryFilter({ categories, selected, onSelect, accentColor = "cyan" }: AdminCategoryFilterProps) {
  const activeBg = accentColor === "purple" ? "bg-purple-500 border-purple-500 shadow-purple-500/20" : "bg-cyan-500 border-cyan-500 shadow-cyan-500/20";

  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap border ${
            selected === cat
              ? `${activeBg} text-white shadow-lg`
              : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20 hover:text-white"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface AdminSearchBarProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  accentColor?: string;
}

export default function AdminSearchBar({ value, onChange, placeholder, accentColor = "cyan" }: AdminSearchBarProps) {
  const focusColor = accentColor === "purple" ? "purple" : "cyan";

  return (
    <div className="flex-1 w-full max-w-xl relative group">
      <Search className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-${focusColor}-400 transition-colors`} size={18} />
      <Input
        placeholder={placeholder || "Search..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-white/5 border-white/10 pl-12 h-14 rounded-2xl text-white placeholder:text-gray-500 focus:border-${focusColor}-500/50 focus:ring-${focusColor}-500/20 transition-all`}
      />
    </div>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface ResumeFieldSetProps {
  onRemove: () => void;
  children: React.ReactNode;
}

export default function ResumeFieldSet({ onRemove, children }: ResumeFieldSetProps) {
  return (
    <div className="p-6 bg-[#161b22] border border-gray-800 rounded-lg space-y-4 relative">
      <Button type="button" variant="ghost" onClick={onRemove} className="absolute top-3 right-3 text-gray-500 hover:text-red-500 p-1 h-auto">
        <Trash2 size={18} />
      </Button>
      {children}
    </div>
  );
}

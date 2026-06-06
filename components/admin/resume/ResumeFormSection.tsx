"use client";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface ResumeFormSectionProps {
  title: string;
  onAppend: () => void;
  children: React.ReactNode;
}

export default function ResumeFormSection({ title, onAppend, children }: ResumeFormSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        <Button type="button" onClick={onAppend} className="bg-gray-800 border border-gray-700 hover:bg-gray-700 text-sm font-semibold py-2 px-4 rounded-lg flex items-center gap-2">
          <PlusCircle size={16} />
          Add {title}
        </Button>
      </div>
      <div className="space-y-6">{children}</div>
    </div>
  );
}

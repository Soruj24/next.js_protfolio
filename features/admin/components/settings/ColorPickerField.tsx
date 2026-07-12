"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function ColorPickerField({
  label, value, onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-gray-300 text-sm">{label}</Label>
      <div className="flex gap-2">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="w-10 h-10 rounded-lg border border-gray-700 cursor-pointer bg-transparent" />
        <Input value={value} onChange={(e) => onChange(e.target.value)} className="bg-gray-800/60 border-gray-700/60 text-white font-mono text-sm" />
      </div>
    </div>
  );
}

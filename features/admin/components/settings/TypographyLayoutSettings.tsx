"use client";

import { Type } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const FONTS = ["Inter", "Fira Code", "JetBrains Mono", "Space Grotesk", "Poppins", "Outfit"];
const BORDER_RADIUS = [
  { value: "0rem", label: "None" },
  { value: "0.25rem", label: "Small" },
  { value: "0.5rem", label: "Medium" },
  { value: "0.75rem", label: "Large" },
  { value: "1rem", label: "Extra Large" },
];

export default function TypographyLayoutSettings({
  fontFamily, borderRadius, onFontChange, onBorderRadiusChange,
}: {
  fontFamily: string;
  borderRadius: string;
  onFontChange: (v: string) => void;
  onBorderRadiusChange: (v: string) => void;
}) {
  return (
    <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm">
      <CardHeader className="border-b border-gray-800 pb-5">
        <CardTitle className="text-white flex items-center gap-2 text-lg">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center">
            <Type size={16} className="text-white" />
          </div>
          Typography & Layout
        </CardTitle>
        <CardDescription>Font and layout preferences</CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Font Family</Label>
            <Select value={fontFamily} onValueChange={onFontChange}>
              <SelectTrigger className="bg-gray-800/60 border-gray-700/60 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {FONTS.map((f) => (
                  <SelectItem key={f} value={f}>
                    <span style={{ fontFamily: f }}>{f}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Border Radius</Label>
            <Select value={borderRadius} onValueChange={onBorderRadiusChange}>
              <SelectTrigger className="bg-gray-800/60 border-gray-700/60 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {BORDER_RADIUS.map((r) => (
                  <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

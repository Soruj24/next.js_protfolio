"use client";

import { Monitor } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ThemePreview({
  primaryColor, accentColor, borderRadius, fontFamily,
}: {
  primaryColor: string;
  accentColor: string;
  borderRadius: string;
  fontFamily: string;
}) {
  return (
    <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm">
      <CardHeader className="border-b border-gray-800 pb-5">
        <CardTitle className="text-white flex items-center gap-2 text-lg">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center">
            <Monitor size={16} className="text-white" />
          </div>
          Live Preview
        </CardTitle>
        <CardDescription>See how your settings look</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="p-4 rounded-xl border border-gray-700 bg-gray-800/50 space-y-3">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`, borderRadius }}
            >
              P
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ fontFamily, color: primaryColor }}>Preview Card</p>
              <p className="text-xs text-gray-500">This is how your theme looks</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs text-white font-medium" style={{ backgroundColor: primaryColor, borderRadius }}>
              Primary Button
            </button>
            <button className="px-3 py-1.5 text-xs font-medium border" style={{ borderColor: accentColor, color: accentColor, borderRadius }}>
              Accent Button
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

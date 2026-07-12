"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const THEME_MODES = [
  { value: "dark", label: "Dark", icon: Moon, desc: "Easy on the eyes" },
  { value: "light", label: "Light", icon: Sun, desc: "Bright and clean" },
  { value: "system", label: "System", icon: Monitor, desc: "Match your OS" },
] as const;

export default function ThemeModeSelector({
  value, onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm">
      <CardHeader className="border-b border-gray-800 pb-5">
        <CardTitle className="text-white flex items-center gap-2 text-lg">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center">
            <PaletteIcon />
          </div>
          Theme Mode
        </CardTitle>
        <CardDescription>Choose your preferred color scheme</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-3 gap-3">
          {THEME_MODES.map((mode) => {
            const Icon = mode.icon;
            const isActive = value === mode.value;
            return (
              <button
                key={mode.value}
                onClick={() => onChange(mode.value)}
                className={cn(
                  "relative flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition-all",
                  isActive
                    ? "border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/10"
                    : "border-gray-800 bg-gray-800/30 hover:border-gray-700 hover:bg-gray-800/50"
                )}
              >
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-all", isActive ? "bg-cyan-500/20 text-cyan-400" : "bg-gray-800 text-gray-500")}>
                  <Icon size={22} />
                </div>
                <div className="text-center">
                  <p className={cn("text-sm font-medium", isActive ? "text-cyan-300" : "text-gray-300")}>{mode.label}</p>
                  <p className="text-[11px] text-gray-600 mt-0.5">{mode.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function PaletteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.5-.57 1.5-1.5 0-.4-.16-.75-.42-1-.26-.26-.42-.6-.42-1 0-.83.67-1.5 1.5-1.5H16c3.31 0 6-2.69 6-6 0-5.5-4.5-10-10-10z" />
    </svg>
  );
}

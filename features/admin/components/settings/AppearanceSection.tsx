"use client";

import {
  Palette,
  Sun,
  Moon,
  Monitor,
  Type,
  Square,
  Sparkles,
  Layers,
  Circle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { SettingsState } from "@/features/admin/hooks/useSettingsManager";

interface AppearanceSectionProps {
  settings: SettingsState;
  updateSettings: (section: keyof SettingsState, key: string, value: unknown) => void;
}

const THEME_MODES = [
  { value: "dark", label: "Dark", icon: Moon, desc: "Easy on the eyes" },
  { value: "light", label: "Light", icon: Sun, desc: "Bright and clean" },
  { value: "system", label: "System", icon: Monitor, desc: "Match your OS" },
] as const;

const FONTS = ["Inter", "Fira Code", "JetBrains Mono", "Space Grotesk", "Poppins", "Outfit"];

const BORDER_RADIUS = [
  { value: "0rem", label: "None" },
  { value: "0.25rem", label: "Small" },
  { value: "0.5rem", label: "Medium" },
  { value: "0.75rem", label: "Large" },
  { value: "1rem", label: "Extra Large" },
];

export default function AppearanceSection({ settings, updateSettings }: AppearanceSectionProps) {
  const { theme } = settings;

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Theme Mode */}
      <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-800 pb-5">
          <CardTitle className="text-white flex items-center gap-2 text-lg">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center">
              <Palette size={16} className="text-white" />
            </div>
            Theme Mode
          </CardTitle>
          <CardDescription>Choose your preferred color scheme</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-3 gap-3">
            {THEME_MODES.map((mode) => {
              const Icon = mode.icon;
              const isActive = theme.mode === mode.value;
              return (
                <button
                  key={mode.value}
                  onClick={() => updateSettings("theme", "mode", mode.value)}
                  className={cn(
                    "relative flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition-all",
                    isActive
                      ? "border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/10"
                      : "border-gray-800 bg-gray-800/30 hover:border-gray-700 hover:bg-gray-800/50"
                  )}
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                      isActive
                        ? "bg-cyan-500/20 text-cyan-400"
                        : "bg-gray-800 text-gray-500"
                    )}
                  >
                    <Icon size={22} />
                  </div>
                  <div className="text-center">
                    <p
                      className={cn(
                        "text-sm font-medium",
                        isActive ? "text-cyan-300" : "text-gray-300"
                      )}
                    >
                      {mode.label}
                    </p>
                    <p className="text-[11px] text-gray-600 mt-0.5">{mode.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Colors */}
      <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-800 pb-5">
          <CardTitle className="text-white flex items-center gap-2 text-lg">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <Circle size={16} className="text-white" />
            </div>
            Colors
          </CardTitle>
          <CardDescription>Customize your color palette</CardDescription>
        </CardHeader>
        <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Primary Color</Label>
            <div className="flex gap-2">
              <input
                type="color"
                value={theme.primary_color}
                onChange={(e) => updateSettings("theme", "primary_color", e.target.value)}
                className="w-10 h-10 rounded-lg border border-gray-700 cursor-pointer bg-transparent"
              />
              <Input
                value={theme.primary_color}
                onChange={(e) => updateSettings("theme", "primary_color", e.target.value)}
                className="bg-gray-800/60 border-gray-700/60 text-white font-mono text-sm"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Accent Color</Label>
            <div className="flex gap-2">
              <input
                type="color"
                value={theme.accent_color}
                onChange={(e) => updateSettings("theme", "accent_color", e.target.value)}
                className="w-10 h-10 rounded-lg border border-gray-700 cursor-pointer bg-transparent"
              />
              <Input
                value={theme.accent_color}
                onChange={(e) => updateSettings("theme", "accent_color", e.target.value)}
                className="bg-gray-800/60 border-gray-700/60 text-white font-mono text-sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Typography & Layout */}
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
              <Select
                value={theme.font_family}
                onValueChange={(v) => updateSettings("theme", "font_family", v)}
              >
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
              <Select
                value={theme.border_radius}
                onValueChange={(v) => updateSettings("theme", "border_radius", v)}
              >
                <SelectTrigger className="bg-gray-800/60 border-gray-700/60 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {BORDER_RADIUS.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Effects */}
      <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-800 pb-5">
          <CardTitle className="text-white flex items-center gap-2 text-lg">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            Effects & Enhancements
          </CardTitle>
          <CardDescription>Visual effects and display options</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30 border border-gray-800">
            <div className="flex items-center gap-3">
              <Sparkles size={16} className="text-cyan-400" />
              <div>
                <p className="text-sm text-gray-200">Animations</p>
                <p className="text-xs text-gray-600">Enable smooth transitions</p>
              </div>
            </div>
            <Switch
              checked={theme.animations_enabled}
              onCheckedChange={(v) => updateSettings("theme", "animations_enabled", v)}
              className="data-[state=checked]:bg-cyan-600"
            />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30 border border-gray-800">
            <div className="flex items-center gap-3">
              <Layers size={16} className="text-violet-400" />
              <div>
                <p className="text-sm text-gray-200">Glassmorphism</p>
                <p className="text-xs text-gray-600">Frosted glass effect on cards</p>
              </div>
            </div>
            <Switch
              checked={theme.glassmorphism}
              onCheckedChange={(v) => updateSettings("theme", "glassmorphism", v)}
              className="data-[state=checked]:bg-cyan-600"
            />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30 border border-gray-800">
            <div className="flex items-center gap-3">
              <Square size={16} className="text-amber-400" />
              <div>
                <p className="text-sm text-gray-200">Compact Mode</p>
                <p className="text-xs text-gray-600">Reduce spacing and padding</p>
              </div>
            </div>
            <Switch
              checked={theme.compact_mode}
              onCheckedChange={(v) => updateSettings("theme", "compact_mode", v)}
              className="data-[state=checked]:bg-cyan-600"
            />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30 border border-gray-800">
            <div className="flex items-center gap-3">
              <Circle size={16} className="text-rose-400" />
              <div>
                <p className="text-sm text-gray-200">Gradient Background</p>
                <p className="text-xs text-gray-600">Subtle gradient on main background</p>
              </div>
            </div>
            <Switch
              checked={theme.gradient_background}
              onCheckedChange={(v) => updateSettings("theme", "gradient_background", v)}
              className="data-[state=checked]:bg-cyan-600"
            />
          </div>
        </CardContent>
      </Card>

      {/* Live Preview */}
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
                style={{
                  background: `linear-gradient(135deg, ${theme.primary_color}, ${theme.accent_color})`,
                  borderRadius: theme.border_radius,
                }}
              >
                P
              </div>
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ fontFamily: theme.font_family, color: theme.primary_color }}
                >
                  Preview Card
                </p>
                <p className="text-xs text-gray-500">This is how your theme looks</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="px-3 py-1.5 text-xs text-white font-medium"
                style={{
                  backgroundColor: theme.primary_color,
                  borderRadius: theme.border_radius,
                }}
              >
                Primary Button
              </button>
              <button
                className="px-3 py-1.5 text-xs font-medium border"
                style={{
                  borderColor: theme.accent_color,
                  color: theme.accent_color,
                  borderRadius: theme.border_radius,
                }}
              >
                Accent Button
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

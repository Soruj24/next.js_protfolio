"use client";

import { Circle, Sparkles, Layers, Square } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { SettingsState } from "@/features/admin/hooks/useSettingsManager";
import ThemeModeSelector from "./ThemeModeSelector";
import ColorPickerField from "./ColorPickerField";
import TypographyLayoutSettings from "./TypographyLayoutSettings";
import EffectToggle from "./EffectToggle";
import ThemePreview from "./ThemePreview";

interface AppearanceSectionProps {
  settings: SettingsState;
  updateSettings: (section: keyof SettingsState, key: string, value: unknown) => void;
}

export default function AppearanceSection({ settings, updateSettings }: AppearanceSectionProps) {
  const { theme } = settings;

  return (
    <div className="space-y-6 animate-fade-in-up">
      <ThemeModeSelector value={theme.mode} onChange={(v) => updateSettings("theme", "mode", v)} />

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
          <ColorPickerField label="Primary Color" value={theme.primary_color} onChange={(v) => updateSettings("theme", "primary_color", v)} />
          <ColorPickerField label="Accent Color" value={theme.accent_color} onChange={(v) => updateSettings("theme", "accent_color", v)} />
        </CardContent>
      </Card>

      <TypographyLayoutSettings
        fontFamily={theme.font_family}
        borderRadius={theme.border_radius}
        onFontChange={(v) => updateSettings("theme", "font_family", v)}
        onBorderRadiusChange={(v) => updateSettings("theme", "border_radius", v)}
      />

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
          <EffectToggle icon={Sparkles} iconColor="text-cyan-400" label="Animations" description="Enable smooth transitions" checked={theme.animations_enabled} onChange={(v) => updateSettings("theme", "animations_enabled", v)} />
          <EffectToggle icon={Layers} iconColor="text-violet-400" label="Glassmorphism" description="Frosted glass effect on cards" checked={theme.glassmorphism} onChange={(v) => updateSettings("theme", "glassmorphism", v)} />
          <EffectToggle icon={Square} iconColor="text-amber-400" label="Compact Mode" description="Reduce spacing and padding" checked={theme.compact_mode} onChange={(v) => updateSettings("theme", "compact_mode", v)} />
          <EffectToggle icon={Circle} iconColor="text-rose-400" label="Gradient Background" description="Subtle gradient on main background" checked={theme.gradient_background} onChange={(v) => updateSettings("theme", "gradient_background", v)} />
        </CardContent>
      </Card>

      <ThemePreview primaryColor={theme.primary_color} accentColor={theme.accent_color} borderRadius={theme.border_radius} fontFamily={theme.font_family} />
    </div>
  );
}

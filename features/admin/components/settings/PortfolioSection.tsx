"use client";

import { Globe, Search, LayoutTemplate, Image, Palette } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { SettingsState } from "@/features/admin/hooks/useSettingsManager";

interface PortfolioSectionProps {
  settings: SettingsState;
  updateSettings: (section: keyof SettingsState, key: string, value: unknown) => void;
}

export default function PortfolioSection({ settings, updateSettings }: PortfolioSectionProps) {
  const { portfolio } = settings;

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Portfolio Info */}
      <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-800 pb-5">
          <CardTitle className="text-white flex items-center gap-2 text-lg">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
              <LayoutTemplate size={16} className="text-white" />
            </div>
            Portfolio Information
          </CardTitle>
          <CardDescription>Basic portfolio identity and description</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-5">
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Portfolio Title</Label>
            <Input
              value={portfolio.title}
              onChange={(e) => updateSettings("portfolio", "title", e.target.value)}
              placeholder="e.g. John's Portfolio"
              className="bg-gray-800/60 border-gray-700/60 text-white placeholder:text-gray-600 focus:border-cyan-500/50 focus:ring-cyan-500/20"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Description</Label>
            <Textarea
              value={portfolio.description}
              onChange={(e) => updateSettings("portfolio", "description", e.target.value)}
              placeholder="Brief description of your portfolio..."
              rows={3}
              className="bg-gray-800/60 border-gray-700/60 text-white placeholder:text-gray-600 resize-none focus:border-cyan-500/50 focus:ring-cyan-500/20"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Keywords (comma-separated)</Label>
            <Input
              value={(portfolio.keywords || []).join(", ")}
              onChange={(e) =>
                updateSettings(
                  "portfolio",
                  "keywords",
                  e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                )
              }
              placeholder="react, frontend, portfolio, developer"
              className="bg-gray-800/60 border-gray-700/60 text-white placeholder:text-gray-600 focus:border-cyan-500/50 focus:ring-cyan-500/20"
            />
          </div>
        </CardContent>
      </Card>

      {/* Branding */}
      <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-800 pb-5">
          <CardTitle className="text-white flex items-center gap-2 text-lg">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <Palette size={16} className="text-white" />
            </div>
            Branding
          </CardTitle>
          <CardDescription>Brand colors and visual identity</CardDescription>
        </CardHeader>
        <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Primary Color</Label>
            <div className="flex gap-2">
              <input
                type="color"
                value={portfolio.primary_color}
                onChange={(e) => updateSettings("portfolio", "primary_color", e.target.value)}
                className="w-10 h-10 rounded-lg border border-gray-700 cursor-pointer bg-transparent"
              />
              <Input
                value={portfolio.primary_color}
                onChange={(e) => updateSettings("portfolio", "primary_color", e.target.value)}
                className="bg-gray-800/60 border-gray-700/60 text-white font-mono text-sm"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Accent Color</Label>
            <div className="flex gap-2">
              <input
                type="color"
                value={portfolio.accent_color}
                onChange={(e) => updateSettings("portfolio", "accent_color", e.target.value)}
                className="w-10 h-10 rounded-lg border border-gray-700 cursor-pointer bg-transparent"
              />
              <Input
                value={portfolio.accent_color}
                onChange={(e) => updateSettings("portfolio", "accent_color", e.target.value)}
                className="bg-gray-800/60 border-gray-700/60 text-white font-mono text-sm"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm flex items-center gap-1">
              <Image size={13} /> Favicon URL
            </Label>
            <Input
              value={portfolio.favicon}
              onChange={(e) => updateSettings("portfolio", "favicon", e.target.value)}
              placeholder="https://.../favicon.ico"
              className="bg-gray-800/60 border-gray-700/60 text-white placeholder:text-gray-600 focus:border-cyan-500/50 focus:ring-cyan-500/20"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm flex items-center gap-1">
              <Image size={13} /> OG Image URL
            </Label>
            <Input
              value={portfolio.og_image}
              onChange={(e) => updateSettings("portfolio", "og_image", e.target.value)}
              placeholder="https://.../og-image.png"
              className="bg-gray-800/60 border-gray-700/60 text-white placeholder:text-gray-600 focus:border-cyan-500/50 focus:ring-cyan-500/20"
            />
          </div>
        </CardContent>
      </Card>

      {/* Color Preview */}
      <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-800 pb-5">
          <CardTitle className="text-white flex items-center gap-2 text-lg">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center">
              <Globe size={16} className="text-white" />
            </div>
            Color Preview
          </CardTitle>
          <CardDescription>Live preview of your brand colors</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex gap-3">
            <div
              className="w-16 h-16 rounded-xl border border-gray-700 shadow-lg"
              style={{ backgroundColor: portfolio.primary_color }}
            />
            <div
              className="w-16 h-16 rounded-xl border border-gray-700 shadow-lg"
              style={{ backgroundColor: portfolio.accent_color }}
            />
            <div
              className="flex-1 h-16 rounded-xl border border-gray-700 shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${portfolio.primary_color}, ${portfolio.accent_color})`,
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

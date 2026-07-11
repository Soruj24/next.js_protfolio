"use client";

import {
  Search,
  Globe,
  MapPin,
  Twitter,
  Hash,
  FileCode,
  MessageCircle,
  Eye,
  EyeOff,
  Gauge,
} from "lucide-react";
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import type { SettingsState } from "@/features/admin/hooks/useSettingsManager";

interface SEOSectionProps {
  settings: SettingsState;
  updateSettings: (section: keyof SettingsState, key: string, value: unknown) => void;
}

export default function SEOSection({ settings, updateSettings }: SEOSectionProps) {
  const { seo } = settings;

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Basic SEO */}
      <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-800 pb-5">
          <CardTitle className="text-white flex items-center gap-2 text-lg">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
              <Search size={16} className="text-white" />
            </div>
            Basic SEO
          </CardTitle>
          <CardDescription>Core search engine optimization settings</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-5">
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Meta Title</Label>
            <div className="relative">
              <Input
                value={seo.meta_title}
                onChange={(e) => updateSettings("seo", "meta_title", e.target.value)}
                placeholder="Your portfolio title for search engines"
                className="bg-gray-800/60 border-gray-700/60 text-white placeholder:text-gray-600 focus:border-cyan-500/50 focus:ring-cyan-500/20 pr-16"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-gray-600">
                {(seo.meta_title || "").length}/60
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Meta Description</Label>
            <div className="relative">
              <Textarea
                value={seo.meta_description}
                onChange={(e) => updateSettings("seo", "meta_description", e.target.value)}
                placeholder="Brief description of your portfolio for search results"
                rows={3}
                className="bg-gray-800/60 border-gray-700/60 text-white placeholder:text-gray-600 resize-none focus:border-cyan-500/50 focus:ring-cyan-500/20 pr-16"
              />
              <span className="absolute right-3 bottom-3 text-[11px] text-gray-600">
                {(seo.meta_description || "").length}/160
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Meta Keywords (comma-separated)</Label>
            <Input
              value={(seo.meta_keywords || []).join(", ")}
              onChange={(e) =>
                updateSettings(
                  "seo",
                  "meta_keywords",
                  e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                )
              }
              placeholder="frontend, react, portfolio, developer"
              className="bg-gray-800/60 border-gray-700/60 text-white placeholder:text-gray-600 focus:border-cyan-500/50 focus:ring-cyan-500/20"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm flex items-center gap-1">
              <MapPin size={13} /> Canonical URL
            </Label>
            <Input
              value={seo.canonical_url}
              onChange={(e) => updateSettings("seo", "canonical_url", e.target.value)}
              placeholder="https://yoursite.com"
              className="bg-gray-800/60 border-gray-700/60 text-white placeholder:text-gray-600 focus:border-cyan-500/50 focus:ring-cyan-500/20"
            />
          </div>
        </CardContent>
      </Card>

      {/* Open Graph */}
      <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-800 pb-5">
          <CardTitle className="text-white flex items-center gap-2 text-lg">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <Globe size={16} className="text-white" />
            </div>
            Open Graph & Social
          </CardTitle>
          <CardDescription>How your site appears when shared on social media</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-5">
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">OG Title</Label>
            <Input
              value={seo.og_title}
              onChange={(e) => updateSettings("seo", "og_title", e.target.value)}
              placeholder="Title shown when shared on social"
              className="bg-gray-800/60 border-gray-700/60 text-white placeholder:text-gray-600 focus:border-cyan-500/50 focus:ring-cyan-500/20"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">OG Description</Label>
            <Textarea
              value={seo.og_description}
              onChange={(e) => updateSettings("seo", "og_description", e.target.value)}
              placeholder="Description shown when shared on social"
              rows={2}
              className="bg-gray-800/60 border-gray-700/60 text-white placeholder:text-gray-600 resize-none focus:border-cyan-500/50 focus:ring-cyan-500/20"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">OG Image URL</Label>
            <Input
              value={seo.og_image}
              onChange={(e) => updateSettings("seo", "og_image", e.target.value)}
              placeholder="https://.../og-image.png (recommended: 1200x630)"
              className="bg-gray-800/60 border-gray-700/60 text-white placeholder:text-gray-600 focus:border-cyan-500/50 focus:ring-cyan-500/20"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label className="text-gray-300 text-sm">Twitter Card Type</Label>
              <Select
                value={seo.twitter_card}
                onValueChange={(v) => updateSettings("seo", "twitter_card", v)}
              >
                <SelectTrigger className="bg-gray-800/60 border-gray-700/60 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="summary">Summary</SelectItem>
                  <SelectItem value="summary_large_image">Summary Large Image</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300 text-sm">Robots Directive</Label>
              <Input
                value={seo.robots}
                onChange={(e) => updateSettings("seo", "robots", e.target.value)}
                placeholder="index, follow"
                className="bg-gray-800/60 border-gray-700/60 text-white placeholder:text-gray-600 focus:border-cyan-500/50 focus:ring-cyan-500/20"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analytics */}
      <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-800 pb-5">
          <CardTitle className="text-white flex items-center gap-2 text-lg">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
              <Gauge size={16} className="text-white" />
            </div>
            Analytics
          </CardTitle>
          <CardDescription>Tracking and analytics configuration</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Google Analytics ID</Label>
            <Input
              value={seo.google_analytics_id}
              onChange={(e) => updateSettings("seo", "google_analytics_id", e.target.value)}
              placeholder="G-XXXXXXXXXX"
              className="bg-gray-800/60 border-gray-700/60 text-white placeholder:text-gray-600 focus:border-cyan-500/50 focus:ring-cyan-500/20 max-w-sm"
            />
            <p className="text-xs text-gray-600">
              Find this in your Google Analytics dashboard under Property Settings.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

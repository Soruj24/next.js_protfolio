"use client";

import {
  Globe,
  Clock,
  Calendar,
  Timer,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { SettingsState } from "@/features/admin/hooks/useSettingsManager";

interface LanguageSectionProps {
  settings: SettingsState;
  updateSettings: (section: keyof SettingsState, key: string, value: unknown) => void;
}

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "es", label: "Espa\u00f1ol" },
  { value: "fr", label: "Fran\u00e7ais" },
  { value: "de", label: "Deutsch" },
  { value: "pt", label: "Portugu\u00eas" },
  { value: "ja", label: "\u65e5\u672c\u8a9e" },
  { value: "ko", label: "\ud55c\uad6d\uc5b4" },
  { value: "zh", label: "\u4e2d\u6587" },
  { value: "ar", label: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629" },
  { value: "hi", label: "\u0939\u093f\u0928\u094d\u0926\u0940" },
  { value: "bn", label: "\u09ac\u09be\u0982\u09b2\u09be" },
];

const TIMEZONES = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Asia/Kolkata",
  "Asia/Dubai",
  "Australia/Sydney",
  "Pacific/Auckland",
];

const DATE_FORMATS = [
  "MM/DD/YYYY",
  "DD/MM/YYYY",
  "YYYY-MM-DD",
  "DD.MM.YYYY",
  "DD MMM YYYY",
];

export default function LanguageSection({ settings, updateSettings }: LanguageSectionProps) {
  const { language } = settings;

  return (
    <div className="space-y-6 animate-fade-in-up">
      <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-800 pb-5">
          <CardTitle className="text-white flex items-center gap-2 text-lg">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
              <Globe size={16} className="text-white" />
            </div>
            Language & Region
          </CardTitle>
          <CardDescription>Localization and regional preferences</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label className="text-gray-300 text-sm flex items-center gap-1">
                <Globe size={13} /> Language
              </Label>
              <Select
                value={language.primary}
                onValueChange={(v) => updateSettings("language", "primary", v)}
              >
                <SelectTrigger className="bg-gray-800/60 border-gray-700/60 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {LANGUAGES.map((l) => (
                    <SelectItem key={l.value} value={l.value}>
                      {l.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300 text-sm flex items-center gap-1">
                <Clock size={13} /> Timezone
              </Label>
              <Select
                value={language.timezone}
                onValueChange={(v) => updateSettings("language", "timezone", v)}
              >
                <SelectTrigger className="bg-gray-800/60 border-gray-700/60 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {TIMEZONES.map((tz) => (
                    <SelectItem key={tz} value={tz}>
                      {tz.replace("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300 text-sm flex items-center gap-1">
                <Calendar size={13} /> Date Format
              </Label>
              <Select
                value={language.date_format}
                onValueChange={(v) => updateSettings("language", "date_format", v)}
              >
                <SelectTrigger className="bg-gray-800/60 border-gray-700/60 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {DATE_FORMATS.map((f) => (
                    <SelectItem key={f} value={f}>
                      {f}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300 text-sm flex items-center gap-1">
                <Timer size={13} /> Time Format
              </Label>
              <Select
                value={language.time_format}
                onValueChange={(v) => updateSettings("language", "time_format", v)}
              >
                <SelectTrigger className="bg-gray-800/60 border-gray-700/60 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                  <SelectItem value="24h">24-hour</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-800 pb-5">
          <CardTitle className="text-white flex items-center gap-2 text-lg">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
              <Calendar size={16} className="text-white" />
            </div>
            Format Preview
          </CardTitle>
          <CardDescription>See how dates and times will appear</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-gray-800/30 border border-gray-800 space-y-1">
              <p className="text-xs text-gray-500 mb-2">Date</p>
              <p className="text-sm text-white font-mono">
                {new Date().toLocaleDateString(
                  language.primary === "en" ? "en-US" : language.primary,
                  {
                    year: "numeric",
                    month: language.date_format.startsWith("MM")
                      ? "2-digit"
                      : language.date_format.startsWith("DD")
                      ? "2-digit"
                      : "numeric",
                    day: "2-digit",
                  }
                )}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-gray-800/30 border border-gray-800 space-y-1">
              <p className="text-xs text-gray-500 mb-2">Time</p>
              <p className="text-sm text-white font-mono">
                {new Date().toLocaleTimeString(
                  language.primary === "en" ? "en-US" : language.primary,
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: language.time_format === "12h",
                  }
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

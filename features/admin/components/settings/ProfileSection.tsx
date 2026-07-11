"use client";

import { useState, useRef } from "react";
import { Camera, Upload, X, User, Briefcase, MapPin, Clock, DollarSign, AtSign } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SettingsState } from "@/features/admin/hooks/useSettingsManager";

interface ProfileSectionProps {
  settings: SettingsState;
  updateSettings: (section: keyof SettingsState, key: string, value: unknown) => void;
}

const AVATAR_COLORS = [
  "from-cyan-400 to-blue-500",
  "from-violet-400 to-purple-500",
  "from-emerald-400 to-teal-500",
  "from-amber-400 to-orange-500",
  "from-rose-400 to-pink-500",
  "from-indigo-400 to-blue-600",
];

export default function ProfileSection({ settings, updateSettings }: ProfileSectionProps) {
  const { profile, personal_info } = settings;
  const [avatarPreview, setAvatarPreview] = useState(profile.avatar || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setAvatarPreview(result);
      updateSettings("profile", "avatar", result);
    };
    reader.readAsDataURL(file);
  };

  const removeAvatar = () => {
    setAvatarPreview("");
    updateSettings("profile", "avatar", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Avatar Card */}
      <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-800 pb-5">
          <CardTitle className="text-white flex items-center gap-2 text-lg">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <Camera size={16} className="text-white" />
            </div>
            Profile Photo
          </CardTitle>
          <CardDescription>Your avatar appears across the portfolio</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="relative group">
              <div
                className={cn(
                  "w-24 h-24 rounded-2xl overflow-hidden border-2 border-gray-700",
                  "bg-gradient-to-br shadow-lg shadow-cyan-500/10",
                  avatarPreview ? "" : AVATAR_COLORS[0]
                )}
              >
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User size={32} className="text-white/80" />
                  </div>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={removeAvatar}
                  className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center shadow-lg"
                >
                  <X size={12} className="text-white" />
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-3">
              <p className="text-sm text-gray-400">
                Upload a professional photo. Recommended size: 256x256px. Max 5MB.
              </p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-200"
                >
                  <Upload size={14} className="mr-2" />
                  Upload Photo
                </Button>
                {avatarPreview && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={removeAvatar}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    Remove
                  </Button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Info Card */}
      <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-800 pb-5">
          <CardTitle className="text-white flex items-center gap-2 text-lg">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            Personal Information
          </CardTitle>
          <CardDescription>Your basic profile details</CardDescription>
        </CardHeader>
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm flex items-center gap-1.5">
              <User size={13} className="text-gray-500" /> Full Name
            </Label>
            <Input
              value={personal_info.full_name}
              onChange={(e) => updateSettings("personal_info", "full_name", e.target.value)}
              placeholder="Your full name"
              className="bg-gray-800/60 border-gray-700/60 text-white placeholder:text-gray-600 focus:border-cyan-500/50 focus:ring-cyan-500/20"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm flex items-center gap-1.5">
              <AtSign size={13} className="text-gray-500" /> Email
            </Label>
            <Input
              type="email"
              value={personal_info.email}
              onChange={(e) => updateSettings("personal_info", "email", e.target.value)}
              placeholder="you@example.com"
              className="bg-gray-800/60 border-gray-700/60 text-white placeholder:text-gray-600 focus:border-cyan-500/50 focus:ring-cyan-500/20"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm flex items-center gap-1.5">
              <Briefcase size={13} className="text-gray-500" /> Professional Title
            </Label>
            <Input
              value={personal_info.professional_title}
              onChange={(e) =>
                updateSettings("personal_info", "professional_title", e.target.value)
              }
              placeholder="e.g. Senior Frontend Developer"
              className="bg-gray-800/60 border-gray-700/60 text-white placeholder:text-gray-600 focus:border-cyan-500/50 focus:ring-cyan-500/20"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm flex items-center gap-1.5">
              <MapPin size={13} className="text-gray-500" /> Location
            </Label>
            <Input
              value={personal_info.location}
              onChange={(e) => updateSettings("personal_info", "location", e.target.value)}
              placeholder="City, Country"
              className="bg-gray-800/60 border-gray-700/60 text-white placeholder:text-gray-600 focus:border-cyan-500/50 focus:ring-cyan-500/20"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm flex items-center gap-1.5">
              <AtSign size={13} className="text-gray-500" /> Phone
            </Label>
            <Input
              value={personal_info.phone}
              onChange={(e) => updateSettings("personal_info", "phone", e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="bg-gray-800/60 border-gray-700/60 text-white placeholder:text-gray-600 focus:border-cyan-500/50 focus:ring-cyan-500/20"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm flex items-center gap-1.5">
              <Globe size={13} className="text-gray-500" /> Website
            </Label>
            <Input
              value={personal_info.website || ""}
              onChange={(e) => updateSettings("personal_info", "website", e.target.value)}
              placeholder="https://yoursite.com"
              className="bg-gray-800/60 border-gray-700/60 text-white placeholder:text-gray-600 focus:border-cyan-500/50 focus:ring-cyan-500/20"
            />
          </div>
        </CardContent>
      </Card>

      {/* Bio & Availability Card */}
      <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-800 pb-5">
          <CardTitle className="text-white flex items-center gap-2 text-lg">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
              <Briefcase size={16} className="text-white" />
            </div>
            Professional Details
          </CardTitle>
          <CardDescription>Your bio and work availability</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-5">
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Tagline</Label>
            <Input
              value={profile.tagline}
              onChange={(e) => updateSettings("profile", "tagline", e.target.value)}
              placeholder="e.g. Building the web, one pixel at a time"
              className="bg-gray-800/60 border-gray-700/60 text-white placeholder:text-gray-600 focus:border-cyan-500/50 focus:ring-cyan-500/20"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Bio</Label>
            <Textarea
              value={profile.bio}
              onChange={(e) => updateSettings("profile", "bio", e.target.value)}
              placeholder="Tell us about yourself..."
              rows={3}
              className="bg-gray-800/60 border-gray-700/60 text-white placeholder:text-gray-600 resize-none focus:border-cyan-500/50 focus:ring-cyan-500/20"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="space-y-2">
              <Label className="text-gray-300 text-sm">Availability</Label>
              <Select
                value={profile.availability}
                onValueChange={(v) => updateSettings("profile", "availability", v)}
              >
                <SelectTrigger className="bg-gray-800/60 border-gray-700/60 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="busy">Busy</SelectItem>
                  <SelectItem value="unavailable">Unavailable</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300 text-sm flex items-center gap-1">
                <DollarSign size={13} /> Hourly Rate
              </Label>
              <Input
                value={profile.hourly_rate}
                onChange={(e) => updateSettings("profile", "hourly_rate", e.target.value)}
                placeholder="e.g. 50"
                className="bg-gray-800/60 border-gray-700/60 text-white placeholder:text-gray-600 focus:border-cyan-500/50 focus:ring-cyan-500/20"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300 text-sm flex items-center gap-1">
                <Clock size={13} /> Response Time
              </Label>
              <Select
                value={profile.response_time}
                onValueChange={(v) => updateSettings("profile", "response_time", v)}
              >
                <SelectTrigger className="bg-gray-800/60 border-gray-700/60 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="Within 1 hour">Within 1 hour</SelectItem>
                  <SelectItem value="Within 4 hours">Within 4 hours</SelectItem>
                  <SelectItem value="Within 24 hours">Within 24 hours</SelectItem>
                  <SelectItem value="Within 48 hours">Within 48 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Globe({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

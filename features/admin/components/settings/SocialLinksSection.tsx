"use client";

import { Link2, Plus, Trash2, GripVertical, ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { SettingsState } from "@/features/admin/hooks/useSettingsManager";

interface SocialLinksSectionProps {
  settings: SettingsState;
  addSocialLink: () => void;
  removeSocialLink: (index: number) => void;
  updateSocialLink: (index: number, key: string, value: unknown) => void;
}

const PLATFORMS = [
  "GitHub",
  "LinkedIn",
  "Twitter",
  "Instagram",
  "YouTube",
  "Dribbble",
  "Behance",
  "Figma",
  "CodePen",
  "Stack Overflow",
  "Dev.to",
  "Hashnode",
  "Medium",
  "Discord",
  "Telegram",
  "Email",
  "Other",
];

export default function SocialLinksSection({
  settings,
  addSocialLink,
  removeSocialLink,
  updateSocialLink,
}: SocialLinksSectionProps) {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-800 pb-5">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center gap-2 text-lg">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center">
                  <Link2 size={16} className="text-white" />
                </div>
                Social Links
              </CardTitle>
              <CardDescription className="mt-1">
                Manage your social media profiles
              </CardDescription>
            </div>
            <Button
              type="button"
              onClick={addSocialLink}
              size="sm"
              className="bg-cyan-600 hover:bg-cyan-700 text-white"
            >
              <Plus size={14} className="mr-1" /> Add Link
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {settings.social_links.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-gray-800/50 flex items-center justify-center mx-auto mb-4">
                <Link2 size={24} className="text-gray-600" />
              </div>
              <p className="text-gray-500 text-sm">No social links added yet</p>
              <p className="text-gray-600 text-xs mt-1">
                Click &quot;Add Link&quot; to get started
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {settings.social_links.map((link, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-3 p-4 rounded-xl bg-gray-800/40 border border-gray-800 hover:border-gray-700 transition-all"
                >
                  <div className="pt-2 text-gray-600">
                    <GripVertical size={14} />
                  </div>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <Label className="text-gray-400 text-xs">Platform</Label>
                      <Select
                        value={link.platform}
                        onValueChange={(v) => updateSocialLink(index, "platform", v)}
                      >
                        <SelectTrigger className="bg-gray-900/60 border-gray-700/60 text-white h-9">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          {PLATFORMS.map((p) => (
                            <SelectItem key={p} value={p}>
                              {p}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-gray-400 text-xs">URL</Label>
                      <Input
                        value={link.url}
                        onChange={(e) => updateSocialLink(index, "url", e.target.value)}
                        placeholder="https://..."
                        className="bg-gray-900/60 border-gray-700/60 text-white text-sm h-9"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-gray-400 text-xs">Username</Label>
                      <Input
                        value={link.username}
                        onChange={(e) =>
                          updateSocialLink(index, "username", e.target.value)
                        }
                        placeholder="@username"
                        className="bg-gray-900/60 border-gray-700/60 text-white text-sm h-9"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-5">
                    <div className="flex items-center gap-1.5">
                      <Switch
                        checked={link.visible}
                        onCheckedChange={(v) => updateSocialLink(index, "visible", v)}
                        className="data-[state=checked]:bg-cyan-600"
                      />
                      <span className="text-[11px] text-gray-500">
                        {link.visible ? "Visible" : "Hidden"}
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSocialLink(index)}
                      className="text-gray-600 hover:text-red-400 hover:bg-red-500/10 h-8 w-8 p-0"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

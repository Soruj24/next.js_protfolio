"use client";

import { useState, useRef } from "react";
import { Camera, Upload, X, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const AVATAR_COLORS = [
  "from-cyan-400 to-blue-500",
  "from-violet-400 to-purple-500",
  "from-emerald-400 to-teal-500",
  "from-amber-400 to-orange-500",
  "from-rose-400 to-pink-500",
  "from-indigo-400 to-blue-600",
];

export default function ProfileAvatarUpload({
  initialAvatar, onAvatarChange,
}: {
  initialAvatar: string;
  onAvatarChange: (dataUrl: string) => void;
}) {
  const [preview, setPreview] = useState(initialAvatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || file.size > 5 * 1024 * 1024) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setPreview(result);
      onAvatarChange(result);
    };
    reader.readAsDataURL(file);
  };

  const removeAvatar = () => {
    setPreview("");
    onAvatarChange("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
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
            <div className={cn("w-24 h-24 rounded-2xl overflow-hidden border-2 border-gray-700 bg-gradient-to-br shadow-lg shadow-cyan-500/10", preview ? "" : AVATAR_COLORS[0])}>
              {preview ? (
                <img src={preview} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User size={32} className="text-white/80" />
                </div>
              )}
            </div>
            {preview && (
              <div className="absolute -bottom-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={removeAvatar} className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center shadow-lg">
                  <X size={12} className="text-white" />
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 space-y-3">
            <p className="text-sm text-gray-400">Upload a professional photo. Recommended size: 256x256px. Max 5MB.</p>
            <div className="flex gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-200">
                <Upload size={14} className="mr-2" /> Upload Photo
              </Button>
              {preview && (
                <Button type="button" variant="ghost" size="sm" onClick={removeAvatar} className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                  Remove
                </Button>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import type { LucideIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function EffectToggle({
  icon: Icon, iconColor, label, description, checked, onChange,
}: {
  icon: LucideIcon;
  iconColor: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30 border border-gray-800">
      <div className="flex items-center gap-3">
        <Icon size={16} className={iconColor} />
        <div>
          <p className="text-sm text-gray-200">{label}</p>
          <p className="text-xs text-gray-600">{description}</p>
        </div>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} className="data-[state=checked]:bg-cyan-600" />
    </div>
  );
}

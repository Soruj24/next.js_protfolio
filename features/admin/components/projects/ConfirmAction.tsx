"use client";

import { useEffect, useRef } from "react";
import { AlertTriangle, Trash2, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConfirmActionProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  variant?: "danger" | "warning" | "info";
  confirmLabel?: string;
  loading?: boolean;
}

const variantConfig = {
  danger: {
    icon: Trash2,
    iconBg: "bg-red-500/10",
    iconColor: "text-red-400",
    confirmBg: "bg-red-500 hover:bg-red-600",
    border: "border-red-500/20",
  },
  warning: {
    icon: AlertTriangle,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    confirmBg: "bg-amber-500 hover:bg-amber-600",
    border: "border-amber-500/20",
  },
  info: {
    icon: Info,
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
    confirmBg: "bg-cyan-500 hover:bg-cyan-600",
    border: "border-cyan-500/20",
  },
};

export default function ConfirmAction({
  open,
  onClose,
  onConfirm,
  title,
  description,
  variant = "danger",
  confirmLabel,
  loading,
}: ConfirmActionProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const config = variantConfig[variant];
  const Icon = config.icon;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0a0f]/95 backdrop-blur-2xl shadow-2xl shadow-black/50 animate-fade-in-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X size={16} />
        </button>

        <div className="p-6">
          <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4", config.iconBg)}>
            <Icon size={22} className={config.iconColor} />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
          <p className="text-sm text-gray-400 font-medium leading-relaxed">{description}</p>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/[0.06]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              await onConfirm();
              onClose();
            }}
            disabled={loading}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 disabled:opacity-50",
              config.confirmBg,
            )}
          >
            {loading ? "Processing..." : confirmLabel || (variant === "danger" ? "Delete" : "Confirm")}
          </button>
        </div>
      </div>
    </div>
  );
}

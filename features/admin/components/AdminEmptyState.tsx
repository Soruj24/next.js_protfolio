"use client";
import { Button } from "@/components/ui/button";

interface AdminEmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  accentColor?: string;
}

export default function AdminEmptyState({ icon, title, description, actionLabel, onAction, accentColor = "cyan" }: AdminEmptyStateProps) {
  const btnColor = accentColor === "purple" ? "text-purple-400" : "text-cyan-400";

  return (
    <div className="flex flex-col items-center justify-center py-24 bg-white/5 border border-white/10 rounded-[40px]">
      <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-6 border border-white/10">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-500 font-medium max-w-xs text-center">{description}</p>
      {actionLabel && onAction && (
        <Button variant="link" onClick={onAction} className={`${btnColor} font-bold mt-4`}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

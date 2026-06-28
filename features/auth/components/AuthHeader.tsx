import React from "react";
import { LucideIcon, Sparkles } from "lucide-react";

interface AuthHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  subtitleIcon?: LucideIcon;
  iconClassName?: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({
  icon: Icon,
  title,
  subtitle,
  subtitleIcon: SubtitleIcon = Sparkles,
  iconClassName = "bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]",
}) => {
  return (
    <div className="text-center mb-8">
      <div className={`inline-flex p-3 rounded-2xl mb-4 animate-item ${iconClassName}`}>
        <Icon size={32} />
      </div>
      <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent animate-item tracking-tight">
        {title}
      </h1>
      <p className="text-gray-400 mt-2 animate-item flex items-center justify-center gap-2 text-sm">
        <SubtitleIcon size={14} className={iconClassName.split(" ")[1]} />
        {subtitle}
      </p>
    </div>
  );
};

export default AuthHeader;

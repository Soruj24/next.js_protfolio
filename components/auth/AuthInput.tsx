import React from "react";
import { LucideIcon, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";

interface AuthInputProps {
  label: string;
  icon: LucideIcon;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  showPasswordToggle?: boolean;
  isPasswordVisible?: boolean;
  onPasswordToggle?: () => void;
  accentColor?: "cyan" | "purple" | "orange" | "emerald";
}

const AuthInput: React.FC<AuthInputProps> = ({
  label,
  icon: Icon,
  type,
  value,
  onChange,
  placeholder,
  required = true,
  showPasswordToggle = false,
  isPasswordVisible = false,
  onPasswordToggle,
  accentColor = "cyan",
}) => {
  const accentClasses = accentColor === "cyan" 
    ? "group-focus-within:text-cyan-400 focus:ring-cyan-500/20 focus:border-cyan-500/50 hover:text-cyan-400"
    : accentColor === "purple"
    ? "group-focus-within:text-purple-400 focus:ring-purple-500/20 focus:border-purple-500/50 hover:text-purple-400"
    : accentColor === "orange"
    ? "group-focus-within:text-orange-400 focus:ring-orange-500/20 focus:border-orange-500/50 hover:text-orange-400"
    : "group-focus-within:text-emerald-400 focus:ring-emerald-500/20 focus:border-emerald-500/50 hover:text-emerald-400";

  return (
    <div className="space-y-1.5 animate-item">
      <label className="text-xs font-medium text-gray-500 uppercase tracking-widest ml-1">{label}</label>
      <div className="relative group">
        <Icon className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 transition-colors ${accentClasses.split(" ")[0]}`} size={18} />
        <Input
          type={showPasswordToggle ? (isPasswordVisible ? "text" : "password") : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`bg-white/5 border-white/10 text-white pl-10 h-12 transition-all rounded-xl ${accentClasses.split(" ").slice(1, 3).join(" ")} ${showPasswordToggle ? "pr-10" : ""}`}
        />
        {showPasswordToggle && onPasswordToggle && (
          <button
            type="button"
            onClick={onPasswordToggle}
            className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition-colors ${accentClasses.split(" ").pop()}`}
          >
            {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthInput;

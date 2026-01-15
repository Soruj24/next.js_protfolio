import React from "react";
import { ArrowRight, LucideIcon } from "lucide-react";

interface AuthSubmitButtonProps {
  isLoading: boolean;
  loadingText: string;
  buttonText: string;
  icon?: LucideIcon;
  variant?: "cyan" | "purple" | "orange" | "emerald";
}

const AuthSubmitButton: React.FC<AuthSubmitButtonProps> = ({
  isLoading,
  loadingText,
  buttonText,
  icon: Icon = ArrowRight,
  variant = "cyan",
}) => {
  const variantClasses = variant === "cyan"
    ? "from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 shadow-cyan-900/20"
    : variant === "purple"
    ? "from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-purple-900/20"
    : variant === "orange"
    ? "from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 shadow-orange-500/20"
    : "from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-500/20";

  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`w-full h-12 bg-gradient-to-r ${variantClasses} text-white font-bold rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center mt-2`}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          {loadingText}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {buttonText} <Icon size={18} />
        </div>
      )}
    </button>
  );
};

export default AuthSubmitButton;

import React from "react";
import Link from "next/link";

interface AuthFooterProps {
  text: string;
  linkText: string;
  linkHref: string;
  accentColor?: "cyan" | "purple";
}

const AuthFooter: React.FC<AuthFooterProps> = ({
  text,
  linkText,
  linkHref,
  accentColor = "cyan",
}) => {
  const accentClasses = accentColor === "cyan"
    ? "text-cyan-400 hover:text-cyan-300"
    : "text-purple-400 hover:text-purple-300";

  return (
    <p className="text-center text-sm text-gray-500 animate-item pt-4">
      {text}{" "}
      <Link 
        href={linkHref} 
        className={`${accentClasses} font-bold transition-colors underline-offset-4 hover:underline`}
      >
        {linkText}
      </Link>
    </p>
  );
};

export default AuthFooter;

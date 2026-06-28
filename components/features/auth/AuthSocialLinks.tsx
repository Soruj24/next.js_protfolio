import React from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";

interface AuthSocialLinksProps {
  label?: string;
}

const AuthSocialLinks: React.FC<AuthSocialLinksProps> = ({ label = "Multi-Channel Auth" }) => {
  return (
    <div className="animate-item">
      <div className="relative w-full py-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-white/5"></span>
        </div>
        <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em]">
          <span className="bg-[#0c0c0c] px-4 text-gray-500">{label}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => signIn("github", { callbackUrl: "/admin" })}
          className="flex items-center justify-center gap-2 h-11 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-sm font-medium"
        >
          <FaGithub size={18} /> GitHub
        </button>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/admin" })}
          className="flex items-center justify-center gap-2 h-11 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-sm font-medium"
        >
          <FaGoogle size={16} className="text-red-500" /> Google
        </button>
      </div>
    </div>
  );
};

export default AuthSocialLinks;

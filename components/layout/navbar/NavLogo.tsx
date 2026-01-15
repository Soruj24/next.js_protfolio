import React from "react";
import Link from "next/link";

const NavLogo: React.FC = () => {
  return (
    <Link href="/" className="nav-logo group flex items-center space-x-2">
      <div className="relative w-10 h-10 flex items-center justify-center">
        <div className="absolute inset-0 bg-cyan-500/20 rounded-lg blur-sm group-hover:bg-cyan-500/40 transition-colors duration-500"></div>
        <div className="relative w-full h-full bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg border border-white/20">
          S
        </div>
      </div>
      <span className="hidden sm:block text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 group-hover:from-cyan-400 group-hover:to-blue-500 transition-all duration-500">
        Soruj<span className="text-cyan-500">.</span>AI
      </span>
    </Link>
  );
};

export default NavLogo;

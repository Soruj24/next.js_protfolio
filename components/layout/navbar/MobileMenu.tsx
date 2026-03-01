import React, { forwardRef } from "react";
import { LogOut, User as UserIcon, LayoutDashboard, LogIn, X } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{ id: string; label: string; icon: string; isLink?: boolean }>;
  activeSection: string;
  handleNavClick: (id: string, isLink?: boolean) => void;
  session: any;
  backdropRef: React.RefObject<HTMLDivElement | null>;
}

const MobileMenu = forwardRef<HTMLDivElement, MobileMenuProps>(
  ({ isOpen, onClose, navItems, activeSection, handleNavClick, session, backdropRef }, ref) => {
    return (
      <>
        {/* Mobile Menu Backdrop */}
        <div
          ref={backdropRef}
          className={`fixed inset-0 bg-black/60 backdrop-blur-md z-[60] lg:hidden ${
            isOpen ? "block" : "hidden"
          }`}
          onClick={onClose}
        ></div>

        {/* Mobile Menu Drawer */}
        <div
          ref={ref}
          className={`fixed top-0 right-0 h-full w-screen sm:w-[360px] bg-[#0a0a0a] border-l border-white/10 z-[70] lg:hidden p-6 sm:p-8 flex flex-col shadow-2xl overflow-y-auto overscroll-contain ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-500`}
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="flex justify-between items-center mb-8 sm:mb-12">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Navigation
            </span>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          <div className="space-y-4 flex-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id, item.isLink)}
                className={`mobile-nav-item w-full flex items-center justify-between p-3 sm:p-4 rounded-xl border transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-white/5 border-cyan-500/30 text-white"
                    : "bg-transparent border-white/10 hover:bg-white/5 text-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xl sm:text-2xl">
                    {item.icon}
                  </div>
                  <span className="text-base sm:text-lg font-semibold">{item.label}</span>
                </div>
                <div className={`h-6 w-1 rounded-full ${activeSection === item.id ? "bg-gradient-to-b from-cyan-500 to-blue-500" : "bg-transparent"}`} />
              </button>
            ))}
          </div>

          <div className="pt-8 border-t border-white/10 space-y-4">
            {session ? (
              <div className="space-y-4">
                <div className="mobile-profile-item flex items-center space-x-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <Avatar className="h-12 w-12 border-2 border-cyan-500">
                    <AvatarImage src={session.user?.image || ""} />
                    <AvatarFallback className="bg-cyan-900 text-cyan-100">
                      {session.user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-bold text-white leading-none">
                      {session.user?.name}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">
                      {session.user?.role || "User"}
                    </p>
                  </div>
                </div>

                {session.user?.role === "admin" && (
                  <Link
                    href="/admin"
                    onClick={onClose}
                    className="mobile-profile-item w-full flex items-center space-x-4 p-4 hover:bg-cyan-500/10 rounded-2xl transition-colors text-cyan-400"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    <span className="font-medium">Admin Dashboard</span>
                  </Link>
                )}

                <button
                  onClick={() => {
                    signOut();
                    onClose();
                  }}
                  className="mobile-profile-item w-full flex items-center space-x-4 p-4 hover:bg-red-500/10 rounded-2xl transition-colors text-red-400"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={onClose}
                className="mobile-profile-item w-full flex items-center justify-center space-x-3 p-5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl text-white font-bold shadow-lg shadow-cyan-500/20"
              >
                <LogIn className="w-5 h-5" />
                <span>Access Terminal</span>
              </Link>
            )}
          </div>
        </div>
      </>
    );
  }
);

MobileMenu.displayName = "MobileMenu";

export default MobileMenu;

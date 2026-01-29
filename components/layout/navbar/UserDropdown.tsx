import React from "react";
import Link from "next/link";
import { LogOut, User as UserIcon, LayoutDashboard, LogIn } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";

interface UserDropdownProps {
  session: any;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ session }) => {
  if (!session) {
    return (
      <Link
        href="/login"
        className="nav-item group p-2.5 sm:px-5 sm:py-2.5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 hover:from-cyan-500 hover:to-blue-500 rounded-xl border border-cyan-500/20 hover:border-transparent transition-all duration-500 flex items-center space-x-2"
      >
        <LogIn className="w-5 h-5 sm:w-4 sm:h-4 group-hover:text-white text-cyan-400" />
        <span className="hidden sm:block font-semibold text-sm group-hover:text-white text-cyan-400">
          Login
        </span>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <div className="nav-item group flex items-center space-x-3 bg-white/5 hover:bg-white/10 p-1.5 sm:pr-4 rounded-2xl border border-white/10 transition-all duration-300">
          <Avatar className="h-8 w-8 sm:h-9 sm:w-9 border-2 border-cyan-500/50 group-hover:border-cyan-400 transition-colors">
            <AvatarImage src={session.user?.image || ""} />
            <AvatarFallback className="bg-cyan-900 text-cyan-100">
              {session.user?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-white leading-none">
              {session.user?.name}
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5 capitalize">
              {session.user?.role || "User"} Account
            </p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 mt-2 bg-[#0a0a0a]/95 backdrop-blur-xl border-white/10 text-white p-2 rounded-2xl"
        align="end"
      >
        <DropdownMenuLabel className="px-3 py-2">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">
            Identity Verified
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/5" />
        {session.user?.role === "admin" && (
          <DropdownMenuItem asChild>
            <Link
              href="/admin"
              className="flex items-center px-3 py-2.5 rounded-xl hover:bg-cyan-500/10 group transition-colors cursor-pointer"
            >
              <LayoutDashboard className="w-4 h-4 mr-3 text-cyan-400 group-hover:text-cyan-300" />
              <span className="text-sm font-medium">Dashboard</span>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <Link
            href="/profile"
            className="flex items-center px-3 py-2.5 rounded-xl hover:bg-purple-500/10 group transition-colors cursor-pointer"
          >
            <UserIcon className="w-4 h-4 mr-3 text-purple-400 group-hover:text-purple-300" />
            <span className="text-sm font-medium">Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/5" />
        <DropdownMenuItem
          onClick={() => signOut()}
          className="flex items-center px-3 py-2.5 rounded-xl hover:bg-red-500/10 group transition-colors cursor-pointer text-red-400 hover:text-red-300"
        >
          <LogOut className="w-4 h-4 mr-3" />
          <span className="text-sm font-medium">Terminate Session</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;

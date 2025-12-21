import {
  ChevronDown,
  User,
  Info,
  MapPin,
  Briefcase,
  Mail,
  LogOut,
} from "lucide-react";
import React, { Ref } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import Link from "next/link";

interface AdminProfileProps {
  avatarRef: Ref<HTMLDivElement>;
  chevronRef: Ref<SVGSVGElement>;
  handleLogout: () => void;
}

const AdminProfile: React.FC<AdminProfileProps> = ({
  avatarRef,
  chevronRef,
  handleLogout,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center space-x-3 text-white    p-0 h-auto"
        >
          <div
            ref={avatarRef}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 
                      flex items-center justify-center text-white font-bold shadow-lg 
                      hover:shadow-cyan-400/50 transition-shadow duration-500"
          >
            SM
          </div>
          <div className="text-left hidden lg:block">
            <p className="text-sm font-medium">Soruj Mahmud</p>
            <p className="text-xs text-gray-400">soruj@example.com</p>
          </div>
          <ChevronDown ref={chevronRef} className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64 bg-black/95 backdrop-blur-2xl border border-cyan-500/20 
                  rounded-2xl shadow-2xl shadow-cyan-500/20"
        align="end"
      >
        <DropdownMenuLabel className="text-white flex items-center gap-2">
          <User className="w-4 h-4" />
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />

        <Link href="/admin/profile">
          <DropdownMenuItem className="text-white hover:bg-cyan-500/10 focus:bg-cyan-500/10 cursor-pointer">
            <User className="w-4 h-4 mr-3" />
            <span>Profile</span>
          </DropdownMenuItem>
        </Link>
        <Link href="/admin/about">
          <DropdownMenuItem className="text-white hover:bg-cyan-500/10 focus:bg-cyan-500/10 cursor-pointer">
            <Info className="w-4 h-4 mr-3" />
            <span>About</span>
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator className="bg-white/10" />

        <Link href="/admin/journey">
          <DropdownMenuItem className="text-white hover:bg-cyan-500/10 focus:bg-cyan-500/10 cursor-pointer">
            <MapPin className="w-4 h-4 mr-3" />
            <span>Journey</span>
          </DropdownMenuItem>
        </Link>
        <Link href="/admin/projects">
          <DropdownMenuItem className="text-white hover:bg-cyan-500/10 focus:bg-cyan-500/10 cursor-pointer">
            <Briefcase className="w-4 h-4 mr-3" />
            <span>Projects</span>
          </DropdownMenuItem>
        </Link>
        <Link href="/admin/contact">
          <DropdownMenuItem className="text-white hover:bg-cyan-500/10 focus:bg-cyan-500/10 cursor-pointer">
            <Mail className="w-4 h-4 mr-3" />
            <span>Contact</span>
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator className="bg-white/10" />

        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red-400 hover:text-red-300 hover:bg-red-900/20 focus:bg-red-900/20 cursor-pointer"
        >
          <LogOut className="w-4 h-4 mr-3" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AdminProfile;

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LogOut, Mail, MapPin, Settings, Shield } from "lucide-react";
import type { Session } from "next-auth";
import type { ISettings } from "@/models/Settings";

const HeaderProfileSection = ({
  isAdmin,
  handleEditClick,
  signOut,
  session,
  settings,
}: {
  isAdmin: boolean;
  handleEditClick: () => void;
  signOut: () => void;
  session: Session;
  settings: ISettings | null;
}) => {
  return (
    <div className="relative mb-12">
      <div className="h-64 rounded-3xl bg-gradient-to-br from-gray-900 via-blue-900/40 to-cyan-900/20 border border-white/10 overflow-hidden relative group shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent"></div>
        <div className="absolute -bottom-24 -right-24 h-64 w-64 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all duration-700"></div>
        <div className="absolute -top-24 -left-24 h-64 w-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-700"></div>
      </div>

      <div className="absolute -bottom-16 left-0 md:left-8 flex flex-col md:flex-row items-center md:items-end gap-6 px-4 w-full">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur opacity-40 group-hover:opacity-70 transition duration-1000"></div>
          <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-[#030712] shadow-2xl relative">
            <AvatarImage
              src={session.user?.image || ""}
              className="object-cover"
            />
            <AvatarFallback className="bg-gradient-to-br from-cyan-900 to-blue-900 text-white text-5xl font-bold">
              {session.user?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="absolute bottom-2 right-2 h-6 w-6 bg-green-500 border-4 border-[#030712] rounded-full shadow-lg"></div>
        </div>

        <div className="flex-1 pb-0 md:pb-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-sm">
              {isAdmin
                ? settings?.personal_info?.full_name || session.user?.name
                : session?.user?.name}
            </h1>
            <Badge className="w-fit mx-auto md:mx-0 bg-cyan-500/20 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/30 transition-colors backdrop-blur-md px-3 py-1 capitalize">
              <Shield className="w-3.5 h-3.5 mr-1.5" />{" "}
              {(session.user as any)?.role || "User"}
            </Badge>
          </div>
          <p className="text-cyan-400 font-semibold mb-3 tracking-wide uppercase text-xs md:text-sm">
            {settings?.personal_info?.professional_title ||
              "Professional Developer"}
          </p>
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-gray-400 text-sm font-medium">
            <div className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors cursor-default">
              <Mail className="w-4 h-4" />{" "}
              {isAdmin
                ? settings?.personal_info?.email || session.user?.email
                : session.user?.email}
            </div>
            <div className="hidden sm:block h-1 w-1 rounded-full bg-gray-600"></div>
            <div className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors cursor-default">
              <MapPin className="w-4 h-4" />{" "}
              {isAdmin
                ? settings?.personal_info?.location || "Location Not Set"
                : "Location Not Set"}
            </div>
          </div>
        </div>

        <div className="flex md:hidden gap-3 pb-4 w-full justify-center">
          <Button
            size="sm"
            variant="outline"
            onClick={handleEditClick}
            className="bg-white/5 border-white/10 hover:bg-white/10 text-white gap-2 flex-1 max-w-[150px] h-11 rounded-xl"
          >
            <Settings className="w-4 h-4" /> {isAdmin ? "Settings" : "Edit"}
          </Button>
          <Button
            size="sm"
            onClick={() => signOut()}
            className="bg-red-500/90 hover:bg-red-600 text-white gap-2 border-none flex-1 max-w-[150px] h-11 rounded-xl shadow-lg shadow-red-500/20"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </Button>
        </div>

        <div className="hidden md:flex gap-3 pb-6">
          <Button
            variant="outline"
            onClick={handleEditClick}
            className="bg-white/5 border-white/10 hover:bg-white/10 text-white gap-2 h-11 px-6 rounded-xl transition-all hover:scale-105"
          >
            <Settings className="w-4 h-4" />{" "}
            {isAdmin ? "Admin Settings" : "Edit Profile"}
          </Button>
          <Button
            onClick={() => signOut()}
            className="bg-red-500/90 hover:bg-red-600 text-white gap-2 border-none h-11 px-6 rounded-xl shadow-lg shadow-red-500/20 transition-all hover:scale-105"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeaderProfileSection;

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ISettings } from "@/models/Settings";
import {
  ExternalLink,
  Github,
  Globe,
  Linkedin,
  Settings,
  Shield,
} from "lucide-react";
import Link from "next/link";

const Sidebar = ({
  isAdmin,
  settings,
}: {
  isAdmin: boolean;
  settings: ISettings;
}) => {
  return (
    <div className="lg:col-span-1 space-y-6">
      {isAdmin && (
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden group">
          <CardHeader className="border-b border-white/5 pb-4 bg-white/[0.02]">
            <CardTitle className="text-lg flex items-center font-bold text-white group-hover:text-cyan-400 transition-colors">
              <Globe className="w-4 h-4 mr-2.5 text-cyan-400" />
              Professional Identity
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <Link
              href={settings?.personal_info?.linkedin || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all group/link"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#0077B5]/10 text-[#0077B5]">
                  <Linkedin className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-gray-300 group-hover/link:text-white">
                  LinkedIn
                </span>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-600 group-hover/link:text-cyan-400" />
            </Link>
            <Link
              href={settings?.personal_info?.github || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all group/link"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/10 text-white">
                  <Github className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-gray-300 group-hover/link:text-white">
                  GitHub
                </span>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-600 group-hover/link:text-cyan-400" />
            </Link>
          </CardContent>
        </Card>
      )}

      <Card className="bg-white/5 border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden group">
        <CardHeader className="border-b border-white/5 pb-4 bg-white/[0.02]">
          <CardTitle className="text-lg flex items-center font-bold text-white group-hover:text-cyan-400 transition-colors">
            <Settings className="w-4 h-4 mr-2.5 text-cyan-400" />
            Account Security
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-3">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-400 hover:text-white hover:bg-white/5 rounded-xl h-11"
          >
            <Shield className="w-4 h-4 mr-3" /> Two-Factor Auth
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-400 hover:text-white hover:bg-white/5 rounded-xl h-11"
          >
            <Settings className="w-4 h-4 mr-3" /> Privacy Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sidebar;

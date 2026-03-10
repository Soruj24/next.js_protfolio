import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DynamicResume from "@/components/ui/DynamicResume";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ISettings } from "@/models/Settings";
import {
  Calendar,
  CheckCircle2,
  Download,
  FileText,
  Loader2,
  Settings,
  Shield,
  User,
} from "lucide-react";
import { Session } from "next-auth";
import React from "react";

const MainContentArea = ({
  activeSection,
  isAdmin,
  setting,
  session,
  resumeRef,
}: {
  activeSection: string;
  isAdmin: boolean;
  setting: ISettings;
  session: Session | null;
  resumeRef: React.RefObject<{ generatePDF: () => void; isGenerating: boolean } | null>;
}) => {
  return (
    <div className="lg:col-span-3">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-white/5 border border-white/10 p-1.5 rounded-2xl mb-8 flex w-fit">
          <TabsTrigger
            value="overview"
            className="rounded-xl px-8 py-2.5 data-[state=active]:bg-cyan-500 data-[state=active]:text-white transition-all font-bold tracking-wide"
          >
            <User className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          {isAdmin && (
            <TabsTrigger
              value="resume"
              className="rounded-xl px-8 py-2.5 data-[state=active]:bg-cyan-500 data-[state=active]:text-white transition-all font-bold tracking-wide"
            >
              <FileText className="w-4 h-4 mr-2" />
              Professional CV
            </TabsTrigger>
          )}
          <TabsTrigger
            value="activity"
            className="rounded-xl px-8 py-2.5 data-[state=active]:bg-cyan-500 data-[state=active]:text-white transition-all font-bold tracking-wide"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Activity Log
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="overview"
          className="mt-0 focus-visible:outline-none"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <User className="w-4 h-4 text-cyan-400" />
                  Profile Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Display Name
                  </p>
                  <p className="text-white font-medium">{session?.user?.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Email Address
                  </p>
                  <p className="text-white font-medium">
                    {session?.user?.email}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Account Status
                  </p>
                  <div className="flex items-center gap-2 text-green-400 font-medium">
                    <CheckCircle2 className="w-4 h-4" /> Verified User
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  Account Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-gray-400">Member Since</span>
                  <span className="text-white font-medium">January 2024</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-gray-400">Total Visits</span>
                  <span className="text-white font-medium">124</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-gray-400">Comments</span>
                  <span className="text-white font-medium">12</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {isAdmin && (
          <TabsContent
            value="resume"
            className="mt-0 focus-visible:outline-none"
          >
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-6 bg-white/[0.02]">
                <div>
                  <CardTitle className="text-2xl font-bold text-white">
                    Dynamic Portfolio CV
                  </CardTitle>
                  <CardDescription className="text-gray-400 mt-1">
                    Smart professional resume generated from your settings.
                  </CardDescription>
                </div>
                <Button
                  size="lg"
                  onClick={() => resumeRef.current?.generatePDF()}
                  disabled={resumeRef.current?.isGenerating}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold gap-3 shadow-xl shadow-cyan-500/20 disabled:opacity-50 h-12 px-8 rounded-xl transition-all hover:scale-105"
                >
                  {resumeRef.current?.isGenerating ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Download className="w-5 h-5" />
                  )}
                  Download CV
                </Button>
              </CardHeader>
              <CardContent className="p-0 bg-gray-900/40">
                <div className="max-h-[800px] overflow-y-auto custom-scrollbar p-8 md:p-12 flex justify-center">
                  <DynamicResume ref={resumeRef} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        <TabsContent
          value="activity"
          className="mt-0 focus-visible:outline-none"
        >
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
            <CardHeader className="border-b border-white/5 pb-6 bg-white/[0.02]">
              <CardTitle className="text-2xl font-bold text-white">
                Recent Activity
              </CardTitle>
              <CardDescription className="text-gray-400">
                Track your account actions and system updates.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-8 px-8">
              <div className="space-y-8 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
                {[
                  {
                    title: "Profile Settings Updated",
                    time: "2 hours ago",
                    icon: Settings,
                    color: "bg-blue-500",
                  },
                  {
                    title: "Account Activity Monitored",
                    time: "Yesterday at 4:30 PM",
                    icon: Shield,
                    color: "bg-cyan-500",
                  },
                  {
                    title: "Security Credentials Verified",
                    time: "3 days ago",
                    icon: CheckCircle2,
                    color: "bg-green-500",
                  },
                  {
                    title: "New Session Initiated",
                    time: "1 week ago",
                    icon: User,
                    color: "bg-purple-500",
                  },
                ].map((activity, idx) => (
                  <div key={idx} className="relative pl-12 group">
                    <div
                      className={`absolute left-0 top-1 w-9 h-9 ${activity.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <activity.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold group-hover:text-cyan-400 transition-colors">
                        {activity.title}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1 font-medium">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MainContentArea;

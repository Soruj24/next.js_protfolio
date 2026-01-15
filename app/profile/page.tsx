"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { User, Mail, Shield, Calendar, Settings, FileText, Download } from "lucide-react";
import DynamicResume from "@/components/ui/DynamicResume";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/login");
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030712]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <NavBar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar / User Info */}
          <div className="lg:col-span-1 space-y-8">
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
              <CardContent className="relative pt-16 pb-8 text-center">
                <div className="absolute -top-16 left-1/2 -translate-x-1/2">
                  <Avatar className="h-32 w-32 border-4 border-[#030712]">
                    <AvatarImage src={session.user?.image || ""} />
                    <AvatarFallback className="bg-cyan-900 text-cyan-100 text-4xl">
                      {session.user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <h2 className="text-2xl font-bold text-white">{session.user?.name}</h2>
                <p className="text-cyan-400 font-medium">Administrator Account</p>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-center space-x-2 text-gray-400">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{session.user?.email}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-gray-400">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm">Identity Verified</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-cyan-500" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors text-gray-300">
                  <span className="text-sm">Account Settings</span>
                  <Settings className="w-4 h-4" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors text-gray-300">
                  <span className="text-sm">Security Logs</span>
                  <Shield className="w-4 h-4" />
                </button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="resume" className="space-y-8">
              <TabsList className="bg-white/5 border border-white/10 p-1 rounded-2xl">
                <TabsTrigger value="resume" className="rounded-xl px-8 py-2.5 data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                  Professional CV
                </TabsTrigger>
                <TabsTrigger value="activity" className="rounded-xl px-8 py-2.5 data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                  Activity
                </TabsTrigger>
              </TabsList>

              <TabsContent value="resume" className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">Dynamic CV Generator</h3>
                    <p className="text-gray-400">Generate a professional PDF of your portfolio data</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl overflow-hidden shadow-2xl scale-[0.6] sm:scale-[0.8] lg:scale-[0.9] origin-top transform transition-all duration-500 hover:scale-[0.92] border border-white/20">
                   <DynamicResume />
                </div>
                
                <div className="text-center mt-[-100px] sm:mt-[-50px]">
                   <p className="text-gray-500 text-sm mb-4">You can download the PDF version of this CV by clicking the button above in the CV section.</p>
                </div>
              </TabsContent>

              <TabsContent value="activity">
                <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription className="text-gray-400">Track your account interactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-start space-x-4">
                          <div className="mt-1 h-2 w-2 rounded-full bg-cyan-500"></div>
                          <div>
                            <p className="text-sm font-medium text-white">Logged in from new device</p>
                            <p className="text-xs text-gray-500 mt-1">Today at 12:45 PM • Chrome on Windows</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

"use client";

import { useSession, signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { User, Mail, Shield, Calendar, Settings, FileText, Download, Briefcase, Code, Star, ExternalLink, LogOut, CheckCircle2, MapPin, Globe, Github, Linkedin, Loader2, Sparkles } from "lucide-react";
import DynamicResume from "@/components/ui/DynamicResume";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { ISettings } from "@/models/Settings";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("home");
  const [settings, setSettings] = useState<ISettings | null>(null);
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [newName, setNewName] = useState("");
  const resumeRef = useRef<{ generatePDF: () => void; isGenerating: boolean }>(null);

  useEffect(() => {
    if (session?.user?.name) {
      setNewName(session.user.name);
    }
  }, [session]);

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/login");
    }
  }, [status]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/settings");
        if (response.ok) {
          const data = await response.json();
          setSettings(data);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoadingSettings(false);
      }
    };
    fetchSettings();
  }, []);

  if (status === "loading" || loadingSettings) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030712]">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-cyan-500 animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-500 font-bold">
            Dev
          </div>
        </div>
      </div>
    );
  }

  if (!session) return null;

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    setIsUpdating(true);
    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });

      if (response.ok) {
        await update({ name: newName });
        toast.success("Profile updated successfully!");
        setIsEditDialogOpen(false);
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to update profile");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const stats = [
    { 
      label: "Completed Projects", 
      value: settings?.case_studies?.length ? `${settings.case_studies.length}+` : "12+", 
      icon: Briefcase, 
      color: "text-blue-400" 
    },
    { 
      label: "Core Skills", 
      value: settings?.technical_skills?.core_technologies?.length ? `${settings.technical_skills.core_technologies.length}+` : "25+", 
      icon: Code, 
      color: "text-cyan-400" 
    },
    { 
      label: "Expertise Areas", 
      value: settings?.expertise?.length ? `${settings.expertise.length}` : "6", 
      icon: Star, 
      color: "text-yellow-400" 
    },
    { 
      label: "Certifications", 
      value: settings?.education?.additional_info ? "Verified" : "8+", 
      icon: CheckCircle2, 
      color: "text-green-400" 
    },
  ];

  const userRole = (session?.user as any)?.role;
  const isAdmin = userRole === "admin";

  const handleEditClick = () => {
    if (isAdmin) {
      router.push("/admin/settings");
    } else {
      setIsEditDialogOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-cyan-500/30">
      <NavBar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {/* Edit Profile Dialog for Normal Users */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-gray-900 border-white/10 text-white sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold flex items-center gap-2">
                <User className="w-5 h-5 text-cyan-400" />
                Edit Profile
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Update your public name displayed on your profile.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleProfileUpdate}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-300">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="bg-white/5 border-white/10 text-white focus:ring-cyan-500/50"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsEditDialogOpen(false)}
                  className="bg-transparent border-white/10 text-white hover:bg-white/5"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isUpdating}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold"
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Header Profile Section */}
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
                <AvatarImage src={session.user?.image || ""} className="object-cover" />
                <AvatarFallback className="bg-gradient-to-br from-cyan-900 to-blue-900 text-white text-5xl font-bold">
                  {session.user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="absolute bottom-2 right-2 h-6 w-6 bg-green-500 border-4 border-[#030712] rounded-full shadow-lg"></div>
            </div>
            
            <div className="flex-1 pb-0 md:pb-6 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-sm">
                  {isAdmin ? (settings?.personal_info?.full_name || session.user?.name) : session.user?.name}
                </h1>
                <Badge className="w-fit mx-auto md:mx-0 bg-cyan-500/20 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/30 transition-colors backdrop-blur-md px-3 py-1 capitalize">
                  <Shield className="w-3.5 h-3.5 mr-1.5" /> {(session.user as any)?.role || "User"}
                </Badge>
              </div>
              <p className="text-cyan-400 font-semibold mb-3 tracking-wide uppercase text-xs md:text-sm">
                {settings?.personal_info?.professional_title || "Professional Developer"}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-gray-400 text-sm font-medium">
                <div className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors cursor-default">
                  <Mail className="w-4 h-4" /> {isAdmin ? (settings?.personal_info?.email || session.user?.email) : session.user?.email}
                </div>
                <div className="hidden sm:block h-1 w-1 rounded-full bg-gray-600"></div>
                <div className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors cursor-default">
                  <MapPin className="w-4 h-4" /> {isAdmin ? (settings?.personal_info?.location || "Location Not Set") : "Location Not Set"}
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
              <Button size="sm" onClick={() => signOut()} className="bg-red-500/90 hover:bg-red-600 text-white gap-2 border-none flex-1 max-w-[150px] h-11 rounded-xl shadow-lg shadow-red-500/20">
                <LogOut className="w-4 h-4" /> Sign Out
              </Button>
            </div>

            <div className="hidden md:flex gap-3 pb-6">
              <Button 
                variant="outline" 
                onClick={handleEditClick}
                className="bg-white/5 border-white/10 hover:bg-white/10 text-white gap-2 h-11 px-6 rounded-xl transition-all hover:scale-105"
              >
                <Settings className="w-4 h-4" /> {isAdmin ? "Admin Settings" : "Edit Profile"}
              </Button>
              <Button onClick={() => signOut()} className="bg-red-500/90 hover:bg-red-600 text-white gap-2 border-none h-11 px-6 rounded-xl shadow-lg shadow-red-500/20 transition-all hover:scale-105">
                <LogOut className="w-4 h-4" /> Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Professional Summary & Expertise Section - Only for Admin */}
        {isAdmin && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 pt-24 md:pt-20">
            <Card className="lg:col-span-2 bg-white/5 border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden group">
              <CardHeader className="border-b border-white/5 pb-4 bg-white/[0.02]">
                <CardTitle className="text-xl flex items-center font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                  <Sparkles className="w-5 h-5 mr-3 text-cyan-400 animate-pulse" />
                  Professional Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-300 leading-relaxed text-lg italic font-medium">
                  "{settings?.experience?.focus || "As an aspiring developer, I am dedicated to mastering modern web technologies and building impactful digital experiences."}"
                </p>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-gray-900/50 border border-white/5">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Professional Experience</p>
                    <p className="text-sm text-gray-200">{settings?.experience?.professional_experience || "Entry-level professional with strong project background."}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-gray-900/50 border border-white/5">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Project Focus</p>
                    <p className="text-sm text-gray-200">{settings?.experience?.project_experience || "Full-stack development with a focus on interactive frontend features."}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden group">
              <CardHeader className="border-b border-white/5 pb-4 bg-white/[0.02]">
                <CardTitle className="text-xl flex items-center font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                  <Code className="w-5 h-5 mr-3 text-cyan-400" />
                  Core Expertise
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-2">
                  {(settings?.technical_skills?.specializations || ["Full Stack", "Performance Optimization", "React", "Next.js", "Node.js"]).map((spec, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-cyan-500/10 text-cyan-300 border-cyan-500/20 hover:bg-cyan-500/20 px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all hover:scale-105">
                      {spec}
                    </Badge>
                  ))}
                </div>
                <div className="mt-6 space-y-3">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Top Technologies</p>
                  <div className="flex flex-wrap gap-2">
                    {(settings?.technical_skills?.core_technologies?.slice(0, 6) || ["TypeScript", "MongoDB", "Tailwind"]).map((tech, idx) => (
                      <span key={idx} className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded border border-white/5">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Stats Grid - Only for Admin */}
        {isAdmin && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, idx) => (
              <Card key={idx} className="bg-white/5 border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300 group cursor-default">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className={`p-3 rounded-2xl bg-gray-900/50 ${stat.color} group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white tracking-tight">{stat.value}</p>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Conditional Padding for Users */}
        {!isAdmin && <div className="h-24"></div>}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
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
                  <a 
                    href={settings?.personal_info?.linkedin || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all group/link"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#0077B5]/10 text-[#0077B5]">
                        <Linkedin className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-semibold text-gray-300 group-hover/link:text-white">LinkedIn</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-600 group-hover/link:text-cyan-400" />
                  </a>
                  <a 
                    href={settings?.personal_info?.github || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all group/link"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white/10 text-white">
                        <Github className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-semibold text-gray-300 group-hover/link:text-white">GitHub</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-600 group-hover/link:text-cyan-400" />
                  </a>
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
                <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white hover:bg-white/5 rounded-xl h-11">
                  <Shield className="w-4 h-4 mr-3" /> Two-Factor Auth
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white hover:bg-white/5 rounded-xl h-11">
                  <Settings className="w-4 h-4 mr-3" /> Privacy Settings
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="bg-white/5 border border-white/10 p-1.5 rounded-2xl mb-8 flex w-fit">
                <TabsTrigger value="overview" className="rounded-xl px-8 py-2.5 data-[state=active]:bg-cyan-500 data-[state=active]:text-white transition-all font-bold tracking-wide">
                  <User className="w-4 h-4 mr-2" />
                  Overview
                </TabsTrigger>
                {isAdmin && (
                  <TabsTrigger value="resume" className="rounded-xl px-8 py-2.5 data-[state=active]:bg-cyan-500 data-[state=active]:text-white transition-all font-bold tracking-wide">
                    <FileText className="w-4 h-4 mr-2" />
                    Professional CV
                  </TabsTrigger>
                )}
                <TabsTrigger value="activity" className="rounded-xl px-8 py-2.5 data-[state=active]:bg-cyan-500 data-[state=active]:text-white transition-all font-bold tracking-wide">
                  <Calendar className="w-4 h-4 mr-2" />
                  Activity Log
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-0 focus-visible:outline-none">
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
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Display Name</p>
                        <p className="text-white font-medium">{session.user?.name}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email Address</p>
                        <p className="text-white font-medium">{session.user?.email}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Account Status</p>
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
                <TabsContent value="resume" className="mt-0 focus-visible:outline-none">
                  <Card className="bg-white/5 border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-6 bg-white/[0.02]">
                      <div>
                        <CardTitle className="text-2xl font-bold text-white">Dynamic Portfolio CV</CardTitle>
                        <CardDescription className="text-gray-400 mt-1">Smart professional resume generated from your settings.</CardDescription>
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

              <TabsContent value="activity" className="mt-0 focus-visible:outline-none">
                <Card className="bg-white/5 border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
                  <CardHeader className="border-b border-white/5 pb-6 bg-white/[0.02]">
                    <CardTitle className="text-2xl font-bold text-white">Recent Activity</CardTitle>
                    <CardDescription className="text-gray-400">Track your account actions and system updates.</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-8 px-8">
                    <div className="space-y-8 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
                      {[
                        { title: "Profile Settings Updated", time: "2 hours ago", icon: Settings, color: "bg-blue-500" },
                        { title: "Account Activity Monitored", time: "Yesterday at 4:30 PM", icon: Shield, color: "bg-cyan-500" },
                        { title: "Security Credentials Verified", time: "3 days ago", icon: CheckCircle2, color: "bg-green-500" },
                        { title: "New Session Initiated", time: "1 week ago", icon: User, color: "bg-purple-500" },
                      ].map((activity, idx) => (
                        <div key={idx} className="relative pl-12 group">
                          <div className={`absolute left-0 top-1 w-9 h-9 ${activity.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <activity.icon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <h4 className="text-white font-bold group-hover:text-cyan-400 transition-colors">{activity.title}</h4>
                            <p className="text-sm text-gray-500 mt-1 font-medium">{activity.time}</p>
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

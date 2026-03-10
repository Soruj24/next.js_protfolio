"use client";

import { useSession, signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import {
  User,
  Mail,
  Shield,
  Calendar,
  Settings,
  FileText,
  Download,
  Briefcase,
  Code,
  Star,
  ExternalLink,
  LogOut,
  CheckCircle2,
  MapPin,
  Globe,
  Github,
  Linkedin,
  Loader2,
  Sparkles,
} from "lucide-react";
import DynamicResume from "@/components/ui/DynamicResume";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { ISettings } from "@/models/Settings";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { getStats } from "@/services";
import Loading from "@/services/profile/Loading";
import EditProfileDialogforNormalUsers from "@/services/profile/EditProfileDialogforNormalUsers";
import HeaderProfileSection from "@/services/profile/HeaderProfileSection";
import ProfessionalSummary from "@/services/profile/ProfessionalSummary";
import StatsGrid from "@/services/profile/StatsGrid";
import Sidebar from "@/services/profile/Sidebar";
import MainContentArea from "@/services/profile/MainContentArea";

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("home");
  const [settings, setSettings] = useState<ISettings | null>(null);
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [newName, setNewName] = useState("");
  const resumeRef = useRef<{ generatePDF: () => void; isGenerating: boolean }>(
    null,
  );

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
    return <Loading />;
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

  const userRole = (session?.user as any)?.role;
  const isAdmin = userRole === "admin";

  const handleEditClick = () => {
    if (isAdmin) {
      router.push("/admin/settings");
    } else {
      setIsEditDialogOpen(true);
    }
  };

  const stats = getStats(settings);

  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-cyan-500/30">
      <NavBar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {/* Edit Profile Dialog for Normal Users */}
        <EditProfileDialogforNormalUsers
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          handleProfileUpdate={handleProfileUpdate}
          newName={newName}
          setNewName={setNewName}
          setIsEditDialogOpen={setIsEditDialogOpen}
          isUpdating={isUpdating}
        />

        {/* Header Profile Section */}
        <HeaderProfileSection
          isAdmin={isAdmin}
          handleEditClick={handleEditClick}
          signOut={signOut}
          session={session}
          settings={settings}
        />

        {/* Professional Summary & Expertise Section - Only for Admin */}
        {isAdmin && <ProfessionalSummary settings={settings as ISettings} />}

        {/* Stats Grid - Only for Admin */}
        {isAdmin && <StatsGrid stats={stats} />}

        {/* Conditional Padding for Users */}
        {!isAdmin && <div className="h-24"></div>}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <Sidebar isAdmin={isAdmin} settings={settings as ISettings} />

          {/* Main Content Area */}
          <MainContentArea session={session} resumeRef={resumeRef} activeSection={activeSection} isAdmin={isAdmin} setting={settings as ISettings} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

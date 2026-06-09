"use client";

import { signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { ISettings } from "@/models/Settings";
import { getStats } from "@/lib/stats";
import { useProfile } from "@/hooks/useProfile";
import Loading from "@/components/profile/Loading";
import EditProfileDialogForNormalUsers from "@/components/profile/EditProfileDialogForNormalUsers";
import HeaderProfileSection from "@/components/profile/HeaderProfileSection";
import ProfessionalSummary from "@/components/profile/ProfessionalSummary";
import StatsGrid from "@/components/profile/StatsGrid";
import Sidebar from "@/components/profile/Sidebar";
import MainContentArea from "@/components/profile/MainContentArea";

export default function ProfilePage() {
  const {
    session, status,
    settings, loadingSettings,
    isEditDialogOpen, setIsEditDialogOpen,
    isUpdating,
    newName, setNewName,
    handleProfileUpdate,
  } = useProfile();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/login");
    }
  }, [status]);

  if (status === "loading" || loadingSettings) {
    return <Loading />;
  }

  if (!session) return null;

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
        <EditProfileDialogForNormalUsers
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
          <MainContentArea session={session} activeSection={activeSection} isAdmin={isAdmin} setting={settings as ISettings} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

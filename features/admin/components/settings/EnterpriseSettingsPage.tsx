"use client";

import { useState, useEffect } from "react";
import {
  Save,
  Loader2,
  RotateCcw,
  Settings,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSettingsManager, SettingsSection } from "@/features/admin/hooks/useSettingsManager";
import SettingsSidebar from "@/features/admin/components/settings/SettingsSidebar";
import ProfileSection from "@/features/admin/components/settings/ProfileSection";
import PortfolioSection from "@/features/admin/components/settings/PortfolioSection";
import SEOSection from "@/features/admin/components/settings/SEOSection";
import SocialLinksSection from "@/features/admin/components/settings/SocialLinksSection";
import AppearanceSection from "@/features/admin/components/settings/AppearanceSection";
import NotificationsSection from "@/features/admin/components/settings/NotificationsSection";
import SecuritySection from "@/features/admin/components/settings/SecuritySection";
import DataSection from "@/features/admin/components/settings/DataSection";
import ContentSection from "@/features/admin/components/settings/ContentSection";

interface EnterpriseSettingsPageProps {
  initialData: Record<string, unknown>;
}

export default function EnterpriseSettingsPage({ initialData }: EnterpriseSettingsPageProps) {
  const [activeSection, setActiveSection] = useState<SettingsSection>("profile");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const {
    settings,
    isDirty,
    saving,
    lastSaved,
    updateSettings,
    updateNestedSettings,
    addSocialLink,
    removeSocialLink,
    updateSocialLink,
    handleSave,
    resetSettings,
    exportSettings,
    importSettings,
    getChangedCount,
  } = useSettingsManager(initialData);

  // Keyboard shortcut to save
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        if (isDirty && !saving) handleSave();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isDirty, saving, handleSave]);

  const changedCount = getChangedCount();

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSection settings={settings} updateSettings={updateSettings} />;
      case "portfolio":
        return <PortfolioSection settings={settings} updateSettings={updateSettings} />;
      case "seo":
        return <SEOSection settings={settings} updateSettings={updateSettings} />;
      case "social":
        return (
          <SocialLinksSection
            settings={settings}
            addSocialLink={addSocialLink}
            removeSocialLink={removeSocialLink}
            updateSocialLink={updateSocialLink}
          />
        );
      case "appearance":
        return <AppearanceSection settings={settings} updateSettings={updateSettings} />;
      case "notifications":
        return (
          <NotificationsSection settings={settings} updateSettings={updateSettings} />
        );
      case "security":
        return <SecuritySection settings={settings} updateSettings={updateSettings} />;
      case "data":
        return (
          <DataSection
            settings={settings}
            updateSettings={updateSettings}
            exportSettings={exportSettings}
            importSettings={importSettings}
            lastSaved={lastSaved}
            isDirty={isDirty}
          />
        );
      case "content":
        return <ContentSection initialData={initialData} />;
      default:
        return <ProfileSection settings={settings} updateSettings={updateSettings} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Settings size={20} className="text-white" />
            </div>
            Settings
          </h1>
          <p className="text-sm text-gray-500 mt-1 ml-[52px]">
            Manage your account, preferences, and portfolio configuration
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {isDirty && (
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-amber-400">
              <AlertTriangle size={12} />
              <span>{changedCount} unsaved change{changedCount !== 1 ? "s" : ""}</span>
            </div>
          )}
          {!isDirty && lastSaved && (
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400">
              <CheckCircle size={12} />
              <span>All changes saved</span>
            </div>
          )}
          {isDirty && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={resetSettings}
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <RotateCcw size={14} className="mr-1" />
              Reset
            </Button>
          )}
          <Button
            type="button"
            onClick={() => handleSave()}
            disabled={saving || !isDirty}
            className={cn(
              "w-full sm:w-auto min-h-[40px] font-medium transition-all",
              isDirty
                ? "bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                : "bg-gray-800 text-gray-500 cursor-not-allowed"
            )}
          >
            {saving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Mobile Section Selector */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-900/80 border border-gray-800 text-sm text-gray-300"
        >
          <span className="capitalize">{activeSection.replace("_", " ")}</span>
          <svg
            className={cn("w-4 h-4 transition-transform", isMobileNavOpen && "rotate-180")}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isMobileNavOpen && (
          <div className="mt-2 p-2 rounded-xl bg-gray-900/95 border border-gray-800 backdrop-blur-sm">
            <SettingsSidebar
              activeSection={activeSection}
              onSectionChange={(s) => {
                setActiveSection(s);
                setIsMobileNavOpen(false);
              }}
            />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-6">
            <div className="p-2 rounded-2xl bg-gray-900/50 border border-gray-800/50 backdrop-blur-sm">
              <SettingsSidebar
                activeSection={activeSection}
                onSectionChange={setActiveSection}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">{renderSection()}</div>
      </div>

      {/* Mobile Save Bar */}
      {isDirty && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900/95 border-t border-gray-800 backdrop-blur-sm z-50 lg:hidden">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-amber-400">
              <AlertTriangle size={14} />
              <span>{changedCount} unsaved change{changedCount !== 1 ? "s" : ""}</span>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={resetSettings}
                className="text-gray-400 hover:text-white"
              >
                Reset
              </Button>
              <Button
                type="button"
                onClick={() => handleSave()}
                disabled={saving}
                className="bg-cyan-600 hover:bg-cyan-500 text-white"
              >
                {saving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

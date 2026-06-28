"use client";
import ParticleBackground from "@/components/shared/ParticleBackground";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/layout/LoadingScreen";
import NavBar from "@/components/layout/NavBar";
import AboutSection from "@/features/about/components/AboutSection";
import ContactSection from "@/features/contact/components/ContactSection";
import HomeSection from "@/features/hero/components/HomeSection";
import TechInnovation from "@/features/projects/components/TechInnovation";
import EngineeringStandards from "@/features/projects/components/EngineeringStandards";
import TechnicalCaseStudies from "@/features/projects/components/TechnicalCaseStudies";
import ProjectsShowcase from "@/features/projects/components/ProjectsShowcase";
import SkillsShowcase from "@/features/skills/components/SkillsShowcase";
import personalData from "@/data/Personal.json";
import { useEffect, useState } from "react";
import RecentlyViewedProducts from "@/features/projects/components/RecentlyViewedProducts";
import { useRecentlyViewed } from "@/components/providers/RecentlyViewedContext";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState<any>(personalData);
  const { addRecentlyViewed } = useRecentlyViewed();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/settings");
        if (response.ok) {
          const data = await response.json();
          if (data && Object.keys(data).length > 0) {
            setSettings(data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      }
    };
    fetchSettings();
    const timer = setTimeout(() => setIsLoading(false), 3000);
    const onUpdated = (e: any) => {
      if (e?.detail) setSettings(e.detail);
    };
    window.addEventListener("settings-updated", onUpdated as EventListener);
    return () => {
      clearTimeout(timer);
      window.removeEventListener(
        "settings-updated",
        onUpdated as EventListener,
      );
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white overflow-hidden">
        <ParticleBackground />
        <NavBar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <HomeSection data={settings} />
        <AboutSection data={settings} />
        <SkillsShowcase />
        <ProjectsShowcase />
        <ContactSection data={settings.personal_info} />
        <Footer data={settings} />
      </div>
    </>
  );
}

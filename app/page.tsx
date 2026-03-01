"use client";
import ParticleBackground from "@/components/background/ParticleBackground";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/layout/LoadingScreen";
import NavBar from "@/components/layout/NavBar";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import HomeSection from "@/components/sections/HomeSection";
import TechInnovation from "@/components/sections/TechInnovation";
import EngineeringStandards from "@/components/sections/EngineeringStandards";
import TechnicalCaseStudies from "@/components/sections/TechnicalCaseStudies";
import ProjectsShowcase from "@/components/sections/ProjectsShowcase";
import SkillsShowcase from "@/components/sections/SkillsShowcase";
import personalData from "@/data/Parsonal.json";
import { useEffect, useState } from "react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState<any>(personalData);

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
      window.removeEventListener("settings-updated", onUpdated as EventListener);
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
        <TechInnovation data={settings.innovation} />
        <EngineeringStandards data={settings.standards} />
        <TechnicalCaseStudies data={settings.case_studies} />
        <ProjectsShowcase />
        <ContactSection data={settings.personal_info} />
        <Footer data={settings} />
      </div>
    </>
  );
}

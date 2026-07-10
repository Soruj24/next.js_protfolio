"use client";
import ParticleBackground from "@/components/shared/ParticleBackground";
import ThemeToggle from "@/components/shared/ThemeToggle";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/layout/LoadingScreen";
import NavBar from "@/components/layout/NavBar";
import AboutSection from "@/features/about/components/AboutSection";
import ContactSection from "@/features/contact/components/ContactSection";
import HomeSection from "@/features/hero/components/HomeSection";
import FeaturedProjectsShowcase from "@/features/projects/components/FeaturedProjectsShowcase";
import SkillsShowcase from "@/features/skills/components/SkillsShowcase";
import ExperienceSection from "@/features/experience/components/ExperienceSection";
import ServicesSection from "@/features/services/components/ServicesSection";
import TestimonialsSection from "@/features/testimonials/components/TestimonialsSection";
import FAQSection from "@/features/faq/components/FAQSection";
import GitHubStats from "@/features/github/components/GitHubStats";
import personalData from "@/data/Personal.json";
import { useEffect, useState } from "react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState<Record<string, unknown>>(personalData as Record<string, unknown>);

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
    const onUpdated = (e: Event) => {
      const customEvent = e as CustomEvent<Record<string, unknown>>;
      if (customEvent?.detail) setSettings(customEvent.detail);
    };
    window.addEventListener("settings-updated", onUpdated);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("settings-updated", onUpdated);
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

        <div className="fixed bottom-6 right-6 z-50">
          <ThemeToggle />
        </div>

        <main>
          <HomeSection data={settings} />
          {/* <AboutSection data={settings} /> */}
          <SkillsShowcase />
          <FeaturedProjectsShowcase />
          <ExperienceSection />
          <ServicesSection />
          <GitHubStats />
          <TestimonialsSection />
          <FAQSection />
          <ContactSection data={settings.personal_info} />
        </main>

        <Footer data={settings} />
      </div>
    </>
  );
}

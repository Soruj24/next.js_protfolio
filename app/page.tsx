"use client";
import dynamic from "next/dynamic";
import ParticleBackground from "@/components/shared/ParticleBackground";
import ThemeToggle from "@/components/shared/ThemeToggle";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/layout/LoadingScreen";
import NavBar from "@/components/layout/NavBar";
import HomeSection from "@/features/hero/components/HomeSection";
import personalData from "@/data/Personal.json";
import { useEffect, useState, Suspense } from "react";

const SkillsShowcase = dynamic(() => import("@/features/skills/components/SkillsShowcase"), { ssr: false });
const FeaturedProjectsShowcase = dynamic(() => import("@/features/projects/components/FeaturedProjectsShowcase"), { ssr: false });
const ExperienceSection = dynamic(() => import("@/features/experience/components/ExperienceSection"), { ssr: false });
const ServicesSection = dynamic(() => import("@/features/services/components/ServicesSection"), { ssr: false });
const GitHubStats = dynamic(() => import("@/features/github/components/GitHubStats"), { ssr: false });
const TestimonialsSection = dynamic(() => import("@/features/testimonials/components/TestimonialsSection"), { ssr: false });
const FAQSection = dynamic(() => import("@/features/faq/components/FAQSection"), { ssr: false });
const ContactSection = dynamic(() => import("@/features/contact/components/ContactSection"), { ssr: false });

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

        <main id="main-content">
          <HomeSection data={settings} />
          <Suspense fallback={null}>
            <SkillsShowcase />
          </Suspense>
          <Suspense fallback={null}>
            <FeaturedProjectsShowcase />
          </Suspense>
          <Suspense fallback={null}>
            <ExperienceSection />
          </Suspense>
          <Suspense fallback={null}>
            <ServicesSection />
          </Suspense>
          <Suspense fallback={null}>
            <GitHubStats />
          </Suspense>
          <Suspense fallback={null}>
            <TestimonialsSection />
          </Suspense>
          <Suspense fallback={null}>
            <FAQSection />
          </Suspense>
          <Suspense fallback={null}>
            <ContactSection />
          </Suspense>
        </main>

        <Footer data={settings} />
      </div>
    </>
  );
}

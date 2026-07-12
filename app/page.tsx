"use client";
import dynamic from "next/dynamic";
import ParticleBackground from "@/components/shared/ParticleBackground";
import ThemeToggle from "@/components/shared/ThemeToggle";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/layout/LoadingScreen";
import NavBar from "@/components/layout/NavBar";
import HomeSection from "@/features/hero/components/HomeSection";
import { useEffect, useState, Suspense } from "react";

const SkillsShowcase = dynamic(
  () => import("@/features/skills/components/SkillsShowcase"),
  { ssr: false },
);
const FeaturedProjectsShowcase = dynamic(
  () => import("@/features/projects/components/FeaturedProjectsShowcase"),
  { ssr: false },
);
const ExperienceSection = dynamic(
  () => import("@/features/experience/components/ExperienceSection"),
  { ssr: false },
);
const ServicesSection = dynamic(
  () => import("@/features/services/components/ServicesSection"),
  { ssr: false },
);
const GitHubStats = dynamic(
  () => import("@/features/github/components/GitHubStats"),
  { ssr: false },
);
const TestimonialsSection = dynamic(
  () => import("@/features/testimonials/components/TestimonialsSection"),
  { ssr: false },
);
const FAQSection = dynamic(
  () => import("@/features/faq/components/FAQSection"),
  { ssr: false },
);
const ContactSection = dynamic(
  () => import("@/features/contact/components/ContactSection"),
  { ssr: false },
);

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
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
          <HomeSection />
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

        <Footer />
      </div>
    </>
  );
}

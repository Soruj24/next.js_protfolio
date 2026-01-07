"use client"
import ParticleBackground from "@/components/background/ParticleBackground";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/layout/LoadingScreen";
import NavBar from "@/components/layout/NavBar";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import HomeSection from "@/components/sections/HomeSection";
import LearningJourney from "@/components/sections/LearningJourney";
import ProjectsShowcase from "@/components/sections/ProjectsShowcase";
import SkillsShowcase from "@/components/sections/SkillsShowcase";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import { useEffect, useState } from "react";

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
        <HomeSection />
        <AboutSection />
        <SkillsShowcase />
        <LearningJourney />
        <ProjectsShowcase />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
}

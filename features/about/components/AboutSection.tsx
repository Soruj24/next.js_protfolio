"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "@/components/shared/SectionTitle";
import ScrollReveal from "@/components/shared/ScrollReveal";
import AboutBackground from "@/features/about/components/AboutBackground";
import AboutContent from "@/features/about/components/AboutContent";
import AboutStats from "@/features/about/components/AboutStats";
import AboutImage from "@/features/about/components/AboutImage";
import { usePortfolioSettings } from "@/hooks/usePortfolioSettings";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const { settings } = usePortfolioSettings();
  const personalInfo = settings?.personal_info;
  const expProfessional = settings?.experience?.professional_experience || "";
  const fullName = personalInfo?.full_name || "";
  const professionalTitle = personalInfo?.professional_title || "";

  const aboutStats = (settings?.standards || []).slice(0, 3).map((s) => ({
    value: s.title,
    label: s.metrics || "",
    color: "from-cyan-500 to-blue-500",
  }));

  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, x: 80, scale: 0.9 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen py-20 sm:py-24 md:py-32 flex items-center relative overflow-hidden scroll-mt-20 sm:scroll-mt-28"
    >
      <AboutBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionTitle
          title="The Story"
          subtitle="Crafting Immersive Digital Experiences with Modern Frontend Technologies"
        />

        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-center">
          <ScrollReveal direction="left" className="space-y-8 order-2 lg:order-1">
            <AboutContent
              professionalTitle={professionalTitle}
              fullName={fullName}
              expProfessional={expProfessional}
              coreTechnologies={settings?.technical_skills?.core_technologies}
            />
            <AboutStats
              stats={aboutStats}
              addCardRef={(el, idx) => {
                cardsRef.current[idx] = el;
              }}
            />
          </ScrollReveal>

          <div ref={imageRef} className="order-1 lg:order-2">
            <AboutImage />
          </div>
        </div>
      </div>
    </section>
  );
}

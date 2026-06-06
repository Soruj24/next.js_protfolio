"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "../ui/SectionTitle";
import personalData from "@/data/Personal.json";
import AboutBackground from "../about/AboutBackground";
import AboutContent from "../about/AboutContent";
import AboutStats from "../about/AboutStats";
import AboutImage from "../about/AboutImage";
import { aboutStats } from "@/lib/sections/about-stats";

gsap.registerPlugin(ScrollTrigger);

interface AboutSectionProps { data?: any; }

export default function AboutSection({ data }: AboutSectionProps) {
  const displayData = data || personalData;
  const personalInfo = displayData.personal_info || {};
  const expProfessional = displayData.experience?.professional_experience || "Professional Frontend Developer";
  const fullName = personalInfo.full_name || "Soruj Mahmud";
  const professionalTitle = personalInfo.professional_title || "Frontend Developer";

  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.fromTo(textRef.current.querySelectorAll(".text-white, .text-gradient, .text-lg"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: textRef.current, start: "top 80%", toggleActions: "play none none reverse" } });
      }
      gsap.fromTo(imageRef.current, { opacity: 0, x: 100, rotationY: 90, scale: 0.8 }, { opacity: 1, x: 0, rotationY: 0, scale: 1, duration: 1.5, ease: "back.out(1.7)", scrollTrigger: { trigger: imageRef.current, start: "top 80%", toggleActions: "play none none reverse" } });
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(card, { opacity: 0, y: 50, scale: 0.5 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: index * 0.2, ease: "elastic.out(1, 0.8)", scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" } });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="min-h-screen py-16 sm:py-24 md:py-32 flex items-center relative overflow-hidden scroll-mt-20 sm:scroll-mt-28">
      <AboutBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionTitle title="The Story" subtitle="Crafting Immersive Digital Experiences with Modern Frontend Technologies" />
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-20 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            <AboutContent ref={textRef} professionalTitle={professionalTitle} fullName={fullName} expProfessional={expProfessional} />
            <AboutStats stats={aboutStats} addCardRef={(el, idx) => { cardsRef.current[idx] = el; }} />
          </div>
          <AboutImage ref={imageRef} />
        </div>
      </div>
    </section>
  );
}

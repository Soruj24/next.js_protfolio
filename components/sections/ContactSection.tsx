"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "../ui/SectionTitle";
import { contactInfo } from "@/data/contact";
import personalData from "@/data/Personal.json";
import ContactBackground from "../contact/ContactBackground";
import ContactContent from "../contact/ContactContent";
import ContactForm from "../contact/ContactForm";
import { useContactForm } from "@/hooks/useContactForm";
import { useTiltEffect } from "@/hooks/useTiltEffect";

interface ContactSectionProps { data?: any; }

export default function ContactSection({ data }: ContactSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contactCardRef = useRef<HTMLDivElement>(null);
  const displayData = data || personalData.personal_info || {};
  const email = displayData.email || "sorujmahmudb2h@gmail.com";
  const focus = personalData.experience?.focus || "Specializing in Frontend Development and UI/UX Design.";

  const { formData, setFormData, isSubmitting, submitStatus, handleSubmit } = useContactForm();
  const { handleMouseMove, handleMouseLeave } = useTiltEffect(contactCardRef);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-element", { opacity: 0, y: 50, rotationX: -45 }, { opacity: 1, y: 0, rotationX: 0, duration: 1, stagger: 0.2, ease: "back.out(1.7)", scrollTrigger: { trigger: containerRef.current, start: "top 80%", end: "bottom 20%", toggleActions: "play none none reverse" } });
      gsap.to(".floating-bg-element", { y: "random(-20, 20)", x: "random(-20, 20)", duration: "random(2, 4)", repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 0.5 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={containerRef} className="min-h-screen py-16 sm:py-24 md:py-32 flex items-center relative overflow-hidden scroll-mt-20 sm:scroll-mt-28">
      <ContactBackground />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full relative z-10">
        <SectionTitle title="Connect With Me" subtitle="Ready to transform the future? Let's bridge the gap between imagination and reality." />
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 md:gap-16 lg:gap-12 mt-10 md:mt-20 items-center">
          <div className="w-full lg:w-1/2">
            <ContactContent focus={focus} contactInfo={contactInfo} email={email} personalInfo={displayData} />
          </div>
          <div className="w-full lg:w-1/2">
            <ContactForm ref={contactCardRef} formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} isSubmitting={isSubmitting} submitStatus={submitStatus} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} />
          </div>
        </div>
      </div>
    </section>
  );
}

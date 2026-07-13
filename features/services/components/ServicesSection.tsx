"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "@/components/shared/SectionTitle";
import { Loader2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
  _id?: string;
  id: string;
  title: string;
  description: string;
  features: string[];
  gradient: string;
}

const defaultServices: ServiceItem[] = [
  {
    id: "frontend-dev",
    title: "Frontend Development",
    description: "Building responsive, performant web applications with modern frameworks and best-in-class developer tooling.",
    features: ["Custom React/Next.js applications", "Component library & design systems", "Server-side rendering & static generation", "Progressive Web App implementation"],
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    id: "ui-ux",
    title: "UI/UX Engineering",
    description: "Translating design visions into seamless, accessible interfaces with smooth animations and thoughtful micro-interactions.",
    features: ["Figma-to-code conversion", "Accessibility-first markup (WCAG AA+)", "Framer Motion & GSAP animations", "Responsive & adaptive layouts"],
    gradient: "from-purple-500 to-pink-600",
  },
  {
    id: "performance",
    title: "Performance Optimization",
    description: "Auditing and optimizing web applications for speed, Core Web Vitals, and smooth runtime performance.",
    features: ["Lighthouse & Web Vitals optimization", "Code splitting & lazy loading", "Image & font optimization", "Bundle size analysis & reduction"],
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: "consulting",
    title: "Technical Consulting",
    description: "Advising teams on architecture decisions, code quality, and development workflows for scalable frontend projects.",
    features: ["Architecture review & planning", "Code review & quality gates", "Mentoring & pair programming", "Migration & modernization strategy"],
    gradient: "from-amber-500 to-orange-600",
  },
];

function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <article className="service-card group relative glass-card rounded-2xl p-8 transition-all duration-500 hover:shadow-[0_0_40px_rgba(34,211,238,0.08)] hover:border-white/20 cursor-default">
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />
      <div className="relative z-10">
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110`}>
          <span className="text-white text-xl">✦</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-6">{service.description}</p>
        <ul className="space-y-2.5">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2.5 text-sm text-gray-300">
              <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient} shrink-0`} />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((data) => setServices(data.length > 0 ? data : defaultServices))
      .catch(() => setServices(defaultServices))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (services.length === 0) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-card",
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [services]);

  if (loading) {
    return (
      <section id="services" className="min-h-screen py-20 md:py-32 flex items-center justify-center">
        <Loader2 size={24} className="text-gray-600 animate-spin" />
      </section>
    );
  }

  if (services.length === 0) return null;

  return (
    <section
      id="services"
      ref={sectionRef}
      className="min-h-screen py-20 md:py-32 relative overflow-hidden bg-[#020617] scroll-mt-20 sm:scroll-mt-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionTitle
          title="Services"
          subtitle="End-to-end frontend solutions engineered for performance, accessibility, and exceptional user experiences."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => (
            <ServiceCard key={service._id || service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "@/components/shared/SectionTitle";

gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  features: string[];
  gradient: string;
}

const defaultServices: ServiceItem[] = [
  {
    id: "svc-1",
    title: "Frontend Development",
    description: "Building scalable, performant web applications with React, Next.js, and TypeScript.",
    features: ["React & Next.js Applications", "TypeScript Integration", "Component Architecture", "API Integration"],
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    id: "svc-2",
    title: "UI/UX Design Implementation",
    description: "Transforming design mockups into pixel-perfect, interactive interfaces.",
    features: ["Pixel-Perfect Implementation", "Design System Creation", "Responsive Layouts", "Cross-Browser Support"],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "svc-3",
    title: "Responsive & Mobile-First",
    description: "Crafting fluid experiences that work flawlessly across all devices and screen sizes.",
    features: ["Mobile-First Strategy", "Fluid Typography", "Touch Interactions", "Progressive Enhancement"],
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: "svc-4",
    title: "Performance Optimization",
    description: "Maximizing Core Web Vitals, minimizing bundle sizes, and implementing advanced caching strategies.",
    features: ["Core Web Vitals", "Bundle Optimization", "Image Optimization", "Lazy Loading"],
    gradient: "from-orange-500 to-amber-500",
  },
  {
    id: "svc-5",
    title: "State Management",
    description: "Implementing robust state management solutions with Redux Toolkit and Zustand.",
    features: ["Redux Toolkit", "React Context", "Server State (React Query)", "Predictable Patterns"],
    gradient: "from-rose-500 to-red-500",
  },
  {
    id: "svc-6",
    title: "Animations & Micro-Interactions",
    description: "Creating delightful user experiences with Framer Motion, GSAP, and CSS animations.",
    features: ["Framer Motion Animations", "GSAP Scroll Animations", "Micro-Interactions", "Page Transitions"],
    gradient: "from-indigo-500 to-violet-500",
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

  useEffect(() => {
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
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

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
          {defaultServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

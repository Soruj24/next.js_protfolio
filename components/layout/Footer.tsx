"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import personalData from "@/data/Personal.json";
import FooterCopyright from "./footer/FooterCopyright";
import FooterSocials from "./footer/FooterSocials";
import FooterLinks from "./footer/FooterLinks";
import FooterScrollToTop from "./footer/FooterScrollToTop";

gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
  data?: Record<string, unknown>;
}

function Footer({ data }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const currentYear = new Date().getFullYear();

  const displayData = data || personalData;
  const personalInfo = (displayData.personal_info || {}) as Record<string, string>;
  const fullName = personalInfo.full_name || "Soruj Mahmud";
  const email = personalInfo.email || "sorujmahmudb2h@gmail.com";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ];

  const services = [
    "Frontend Development",
    "UI/UX Implementation",
    "Responsive Design",
    "Performance Optimization",
    "Component Architecture",
  ];

  return (
    <footer
      ref={footerRef}
      className="relative border-t border-white/[0.05] bg-black/30 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <span className="text-2xl font-black text-white tracking-tight">
                S<span className="text-gradient-premium">.</span>M
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">
              Building high-performance, accessible web applications with modern frontend technologies.
            </p>
            <FooterSocials email={email} />
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-sm font-semibold text-white uppercase tracking-widest mb-6">
              Navigation
            </h2>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => {
                      const id = link.href.replace("#", "");
                      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h2 className="text-sm font-semibold text-white uppercase tracking-widest mb-6">
              Services
            </h2>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-sm text-gray-400 hover:text-gray-300 transition-colors duration-300 cursor-default">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-sm font-semibold text-white uppercase tracking-widest mb-6">
              Get in Touch
            </h2>
            <div className="space-y-4">
              <a
                href={`mailto:${email}`}
                className="block text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-300 break-all"
              >
                {email}
              </a>
              <p className="text-sm text-gray-400">
                Tangail, Dhaka, Bangladesh
              </p>
              <p className="text-xs text-gray-400">
                Open to freelance and full-time opportunities
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/[0.05]">
          <FooterCopyright year={currentYear} fullName={fullName} />
          <FooterLinks />
          <FooterScrollToTop />
        </div>
      </div>
    </footer>
  );
}

export default Footer;

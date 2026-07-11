"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FooterCopyright from "./footer/FooterCopyright";
import FooterSocials from "./footer/FooterSocials";
import FooterLinks from "./footer/FooterLinks";
import FooterScrollToTop from "./footer/FooterScrollToTop";
import { usePortfolioSettings } from "@/hooks/usePortfolioSettings";

gsap.registerPlugin(ScrollTrigger);

function getInitials(fullName: string): string {
  if (!fullName) return "";
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return parts[0].charAt(0) + parts[parts.length - 1].charAt(0);
}

function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const currentYear = new Date().getFullYear();
  const { settings } = usePortfolioSettings();

  const personalInfo = settings?.personal_info;
  const fullName = personalInfo?.full_name || "";
  const email = personalInfo?.email || "";
  const initials = getInitials(fullName);

  const quickLinks = settings?.nav_items
    ?.filter((n) => n.visible)
    .map((n) => ({ label: n.label, href: `#${n.id}` })) || [];

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
        },
      );
    });
    return () => ctx.revert();
  }, []);

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
                {initials || "S"}<span className="text-gradient-premium">.</span>{initials ? initials.charAt(1) || "" : "M"}
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">
              Building high-performance, accessible web applications with modern frontend technologies.
            </p>
            <FooterSocials email={email} />
          </div>

          {/* Quick Links */}
          {quickLinks.length > 0 && (
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
          )}

          {/* Contact */}
          <div>
            <h2 className="text-sm font-semibold text-white uppercase tracking-widest mb-6">
              Get in Touch
            </h2>
            <div className="space-y-4">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="block text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-300 break-all"
                >
                  {email}
                </a>
              )}
              {personalInfo?.location && (
                <p className="text-sm text-gray-400">
                  {personalInfo.location}
                </p>
              )}
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

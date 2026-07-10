"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Mail, MapPin, Clock } from "lucide-react";
import SectionTitle from "@/components/shared/SectionTitle";
import { contactInfo } from "@/data/contact";
import personalData from "@/data/Personal.json";
import ContactBackground from "@/features/contact/components/ContactBackground";
import { useContactForm } from "@/features/contact/hooks/useContactForm";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection({ data }: { data?: Record<string, unknown> }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const displayData = data || personalData.personal_info || {};
  const email = (displayData as Record<string, string>).email || "sorujmahmudb2h@gmail.com";
  const focus =
    personalData.experience?.focus ||
    "Specializing in Frontend Development and UI/UX Design.";

  const { formData, setFormData, isSubmitting, submitStatus, handleSubmit } = useContactForm();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-element",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={containerRef}
      className="min-h-screen py-20 sm:py-24 md:py-32 flex items-center relative overflow-hidden scroll-mt-20 sm:scroll-mt-28"
    >
      <ContactBackground />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full relative z-10">
        <SectionTitle
          title="Get In Touch"
          subtitle="Have a project in mind or want to discuss opportunities? I'd love to hear from you."
        />

        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 mt-16 items-start">
          {/* Left: Info */}
          <div className="contact-element space-y-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Let&apos;s Build Something{" "}
                <span className="text-gradient-premium">Extraordinary</span>
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {focus} I&apos;m always interested in hearing about new projects and opportunities.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: Mail, label: "Email", value: email, href: `mailto:${email}` },
                { icon: MapPin, label: "Location", value: "Tangail, Dhaka, Bangladesh", href: null },
                { icon: Clock, label: "Availability", value: "Open to opportunities", href: null },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0 group-hover:border-cyan-500/30 transition-colors">
                      <Icon className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-widest mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm text-gray-300 hover:text-cyan-400 transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm text-gray-300">{item.value}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              {[
                { label: "GitHub", href: "https://github.com/Soruj24" },
                { label: "LinkedIn", href: "https://linkedin.com/in/soruj-mahmud" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-xs font-medium text-gray-500 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-element">
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-2xl p-6 sm:p-8 space-y-5"
            >
              <div className="space-y-1.5">
                <label htmlFor="contact-name" className="text-xs font-medium text-gray-500 uppercase tracking-widest">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 focus:outline-none text-sm text-white transition-all duration-300 placeholder:text-gray-600"
                  required
                  minLength={2}
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-email" className="text-xs font-medium text-gray-500 uppercase tracking-widest">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 focus:outline-none text-sm text-white transition-all duration-300 placeholder:text-gray-600"
                  required
                  placeholder="your@email.com"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-subject" className="text-xs font-medium text-gray-500 uppercase tracking-widest">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 focus:outline-none text-sm text-white transition-all duration-300 placeholder:text-gray-600"
                  required
                  minLength={5}
                  placeholder="Project inquiry"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-xs font-medium text-gray-500 uppercase tracking-widest">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 focus:outline-none text-sm text-white transition-all duration-300 placeholder:text-gray-600 resize-none"
                  required
                  minLength={10}
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3.5 text-sm
                  shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-500
                  hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 blur-xl transition duration-500" />
                <span className="relative flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </>
                  )}
                </span>
              </button>

              {submitStatus && (
                <div
                  className={`text-center text-sm py-2 rounded-xl ${
                    submitStatus.success
                      ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                      : "text-red-400 bg-red-500/10 border border-red-500/20"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

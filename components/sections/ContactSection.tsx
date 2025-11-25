import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import SectionTitle from "../ui/SectionTitle";
import MagneticButton from "../ui/MagneticButton";
import ContactInfo from "../ui/ContactInfo"; 
import { contactInfo } from "../../data/contact";

function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-element",
        {
          opacity: 0,
          y: 50,
          rotationX: -45,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.to(".contact-info-card", {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3,
      });
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    gsap.to(".success-message", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
    });

    setIsSubmitting(false);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="min-h-screen py-20 flex items-center relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cyan-500/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-purple-500/10 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 w-full relative z-10">
        <SectionTitle
          title="Let's Work Together"
          subtitle="Ready to bring your AI ideas to life? Let's discuss your project!"
        />

        <div className="grid lg:grid-cols-2 gap-16 mt-16">
          <div className="space-y-8">
            <div className="contact-element">
              <h3 className="text-3xl font-bold text-white mb-6">
                Get In Touch
              </h3>
              <p className="text-xl text-gray-400 leading-relaxed">
                I&apos;m always interested in new opportunities and exciting AI
                projects. Whether you need LangChain integration, MCP server
                development, or custom AI tools, I&apos;d love to hear from you.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((contact, index) => (
                <ContactInfo
                  key={contact.label}
                  contact={contact}
                  index={index}
                />
              ))}
            </div>

            <div className="contact-element flex space-x-6 pt-6">
              {[
                { icon: "💼", label: "LinkedIn", link: "#" },
                { icon: "🐙", label: "GitHub", link: "#" },
                { icon: "🔗", label: "Portfolio", link: "#" },
                {
                  icon: "📧",
                  label: "Email",
                  link: "mailto:soruj.mahmud@email.com",
                },
              ].map((social) => (
                <button
                  key={social.label}
                  className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-xl hover:bg-cyan-500 hover:text-white transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/25"
                  onClick={() => window.open(social.link, "_blank")}
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="contact-element">
              <label className="block text-gray-300 mb-3 text-lg font-semibold">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-cyan-500 focus:outline-none text-white transition-all duration-300 backdrop-blur-lg hover:bg-white/10 focus:bg-white/10 text-lg"
                required
                placeholder="Your full name"
              />
            </div>

            <div className="contact-element">
              <label className="block text-gray-300 mb-3 text-lg font-semibold">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-cyan-500 focus:outline-none text-white transition-all duration-300 backdrop-blur-lg hover:bg-white/10 focus:bg-white/10 text-lg"
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div className="contact-element">
              <label className="block text-gray-300 mb-3 text-lg font-semibold">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={6}
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-cyan-500 focus:outline-none text-white transition-all duration-300 backdrop-blur-lg hover:bg-white/10 focus:bg-white/10 text-lg resize-none"
                required
                placeholder="Tell me about your AI project or collaboration idea..."
              />
            </div>

            <div className="contact-element">
              <MagneticButton
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl font-bold text-xl hover:shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                    Sending...
                  </span>
                ) : (
                  "📨 Send Message"
                )}
              </MagneticButton>
            </div>

            <div className="success-message opacity-0 transform translate-y-10 text-center">
              <div className="text-green-400 text-lg font-semibold">
                ✅ Message sent successfully!
              </div>
              <p className="text-gray-400 mt-2">
                I&apos;ll get back to you as soon as possible.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
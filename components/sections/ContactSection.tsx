import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import SectionTitle from "../ui/SectionTitle";
import MagneticButton from "../ui/MagneticButton";
import ContactInfo from "../ui/ContactInfo"; 
import { contactInfo } from "../../data/contact";

function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contactCardRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = contactCardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = () => {
    if (contactCardRef.current) {
      gsap.to(contactCardRef.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  };

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

      gsap.to(".floating-bg-element", {
        y: "random(-20, 20)",
        x: "random(-20, 20)",
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      });
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({ success: true, message: "Thank you! Your message has been sent." });
        setFormData({ name: "", email: "", subject: "", message: "" });
        
        // Success animation
        gsap.to(".success-message", {
          opacity: 1,
          y: 0,
          duration: 0.5,
        });

        // Reset message after 5 seconds
        setTimeout(() => {
          gsap.to(".success-message", {
            opacity: 0,
            y: 20,
            duration: 0.5,
            onComplete: () => {
              setSubmitStatus(null);
            }
          });
        }, 5000);
      } else {
        setSubmitStatus({ success: false, message: data.message || "Something went wrong. Please try again." });
        gsap.to(".success-message", {
          opacity: 1,
          y: 0,
          duration: 0.5,
        });
      }
    } catch (error) {
      setSubmitStatus({ success: false, message: "Network error. Please check your connection." });
      gsap.to(".success-message", {
        opacity: 1,
        y: 0,
        duration: 0.5,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="min-h-screen py-24 flex items-center relative overflow-hidden"
    >
      {/* Dynamic AI Background Elements */}
      <div className="absolute inset-0 pointer-events-none noise-bg">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_50%)]"></div>
        <div className="floating-bg-element absolute top-1/4 left-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px]"></div>
        <div className="floating-bg-element absolute bottom-1/4 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 w-full relative z-10">
        <SectionTitle
          title="Initiate Neural Link"
          subtitle="Ready to transform the future? Let's bridge the gap between imagination and reality."
        />

        <div className="grid lg:grid-cols-2 gap-12 mt-20 items-center">
          <div className="space-y-10">
            <div className="contact-element group">
              <h3 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-white/50 mb-6">
                Connect with the Future
              </h3>
              <p className="text-xl text-gray-400 leading-relaxed max-w-lg">
                I specialize in building next-generation AI agents, LangChain ecosystems, and immersive neural interfaces. Let&apos;s architect something extraordinary.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((contact, index) => (
                <div key={contact.label} className="contact-element">
                  <ContactInfo
                    contact={contact}
                    index={index}
                  />
                </div>
              ))}
            </div>

            <div className="contact-element flex space-x-5 pt-4">
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
                  className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-2xl hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-500 group relative overflow-hidden"
                  onClick={() => window.open(social.link, "_blank")}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                    {social.icon}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div 
            className="contact-element relative"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={contactCardRef}
          >
            {/* Form Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
            
            <form 
              ref={formRef} 
              onSubmit={handleSubmit} 
              className="relative space-y-6 bg-[#030712]/80 backdrop-blur-2xl p-8 lg:p-10 rounded-[2rem] border border-white/10 shadow-2xl"
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-cyan-400/80 uppercase tracking-widest ml-1">
                  Agent Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 focus:outline-none text-white transition-all duration-300 placeholder:text-gray-600"
                  required
                  placeholder="Identity identifier"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-cyan-400/80 uppercase tracking-widest ml-1">
                  Neural Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 focus:outline-none text-white transition-all duration-300 placeholder:text-gray-600"
                  required
                  placeholder="communication@channel.io"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-cyan-400/80 uppercase tracking-widest ml-1">
                  Subject Protocol
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 focus:outline-none text-white transition-all duration-300 placeholder:text-gray-600"
                  required
                  placeholder="Reason for connection"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-cyan-400/80 uppercase tracking-widest ml-1">
                  Transmission Data
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={4}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 focus:outline-none text-white transition-all duration-300 placeholder:text-gray-600 resize-none"
                  required
                  placeholder="Encrypt your message here..."
                />
              </div>

              <div className="pt-2">
                <MagneticButton
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full relative group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 transition-all duration-500 group-hover:scale-105"></div>
                  <div className="relative px-8 py-5 flex items-center justify-center font-bold text-lg text-white">
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Execute Transmission <span className="ml-2">→</span>
                      </span>
                    )}
                  </div>
                </MagneticButton>
              </div>

              <div className="success-message opacity-0 transform translate-y-10 text-center">
                {submitStatus && (
                  <div className={`inline-flex items-center px-4 py-2 border rounded-full text-sm font-medium ${
                    submitStatus.success 
                      ? "bg-green-500/10 border-green-500/20 text-green-400" 
                      : "bg-red-500/10 border-red-500/20 text-red-400"
                  }`}>
                    <span className="mr-2">{submitStatus.success ? "⚡" : "❌"}</span> 
                    {submitStatus.message}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
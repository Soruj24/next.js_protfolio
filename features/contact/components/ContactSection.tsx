"use client";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import ContactForm from "./ContactForm";
import ContactInfoPanel from "./ContactInfoPanel";
import ContactBackground from "./ContactBackground";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function ContactSection() {
  const email = "sorujmahmudb2h@gmail.com";

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 overflow-hidden scroll-mt-20 sm:scroll-mt-28"
    >
      <ContactBackground />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16 sm:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-6"
            >
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                Get In Touch
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-5"
            >
              Contact{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Me
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
            >
              Have a project in mind or want to discuss opportunities? I&apos;d
              love to hear from you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center justify-center gap-3 mt-8"
            >
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-500/30" />
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-500/30" />
            </motion.div>
          </div>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          {/* Info Panel - 2 cols */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <ScrollReveal delay={0.1}>
              <ContactInfoPanel email={email} />
            </ScrollReveal>
          </div>

          {/* Form - 3 cols */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <ScrollReveal delay={0.2}>
              <ContactForm email={email} />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

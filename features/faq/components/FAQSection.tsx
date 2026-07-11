"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "@/components/shared/SectionTitle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Loader2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
  _id?: string;
  question: string;
  answer: string;
  category?: string;
}

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [faqItems, setFaqItems] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/faqs")
      .then((r) => r.json())
      .then((data) => setFaqItems(data))
      .catch(() => setFaqItems([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (faqItems.length === 0) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-container",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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
  }, [faqItems]);

  if (loading) {
    return (
      <section id="faq" className="min-h-screen py-20 md:py-32 flex items-center justify-center">
        <Loader2 size={24} className="text-gray-600 animate-spin" />
      </section>
    );
  }

  if (faqItems.length === 0) return null;

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="min-h-screen py-20 md:py-32 relative overflow-hidden bg-[#020617] scroll-mt-20 sm:scroll-mt-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionTitle
          title="FAQ"
          subtitle="Answers to common questions about my work, process, and availability."
        />

        <div className="faq-container mt-16">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, i) => (
              <AccordionItem
                key={item._id || i}
                value={item._id || `faq-${i}`}
                className="glass-card rounded-2xl px-6 border-white/10 data-[state=open]:border-cyan-500/30 transition-colors duration-300"
              >
                <AccordionTrigger className="text-left text-white hover:text-cyan-400 py-6 text-base font-medium">
                  <span>{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 leading-relaxed pb-6 text-sm">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

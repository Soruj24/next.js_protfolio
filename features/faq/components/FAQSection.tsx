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

const defaultFAQs: FAQItem[] = [
  {
    question: "What tech stack do you specialize in?",
    answer: "I specialize in the modern JavaScript/TypeScript ecosystem: Next.js and React for the frontend, Node.js for the backend, PostgreSQL or MongoDB for databases, and Tailwind CSS for styling. I also have experience with Framer Motion, GSAP, Prisma, and various cloud platforms.",
    category: "general",
  },
  {
    question: "Do you work with clients remotely?",
    answer: "Yes, I work fully remotely and have experience collaborating with clients across different time zones. I use tools like Slack, Discord, Jira, and Figma to maintain clear communication and transparency throughout the project.",
    category: "process",
  },
  {
    question: "What is your typical project timeline?",
    answer: "It depends on the scope. A landing page typically takes 1-2 weeks, a full marketing site 3-6 weeks, and a complex web application 6-12 weeks. I'll provide a detailed timeline during the initial consultation based on your specific requirements.",
    category: "process",
  },
  {
    question: "How do you ensure website accessibility?",
    answer: "I follow WCAG 2.2 AA guidelines as a baseline. This includes semantic HTML, proper ARIA attributes, keyboard navigation support, sufficient color contrast, screen reader testing, and regular audits using axe DevTools and Lighthouse.",
    category: "quality",
  },
  {
    question: "Can you work with existing codebases?",
    answer: "Absolutely. I have experience migrating legacy JavaScript codebases to modern TypeScript, refactoring class components to functional components, and improving performance in existing Next.js applications. I always prioritize incremental improvements to minimize disruption.",
    category: "process",
  },
  {
    question: "What is your approach to project pricing?",
    answer: "I typically work on a fixed-price basis for well-defined projects with clear requirements. For ongoing work or maintenance, I offer weekly or monthly retainers. Every project starts with a free discovery call to understand your needs and provide an accurate estimate.",
    category: "general",
  },
];

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [faqItems, setFaqItems] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/faqs")
      .then((r) => r.json())
      .then((data) => setFaqItems(data.length > 0 ? data : defaultFAQs))
      .catch(() => setFaqItems(defaultFAQs))
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

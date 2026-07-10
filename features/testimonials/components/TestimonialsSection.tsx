"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import SectionTitle from "@/components/shared/SectionTitle";
import { testimonials } from "@/data/testimonials";

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonial-slide",
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
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const current = testimonials[currentIndex];
  const initials = current.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="min-h-screen py-20 md:py-32 relative overflow-hidden scroll-mt-20 sm:scroll-mt-28"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-950/5 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionTitle
          title="Testimonials"
          subtitle="What colleagues, clients, and collaborators say about working together."
        />

        <div className="testimonial-slide mt-16">
          <div className="relative glass-card rounded-3xl p-8 sm:p-12 md:p-16">
            <Quote className="absolute top-6 left-6 sm:top-8 sm:left-8 w-12 h-12 text-cyan-500/10" />

            <div className="relative z-10">
              <div className="flex items-center gap-1 mb-6">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <blockquote className="text-lg sm:text-xl md:text-2xl text-gray-200 leading-relaxed font-light mb-10 min-h-[120px]">
                &ldquo;{current.content}&rdquo;
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
                  {initials}
                </div>
                <div>
                  <p className="text-white font-semibold">{current.name}</p>
                  <p className="text-sm text-gray-400">
                    {current.role} at {current.company}
                  </p>
                  <p className="text-xs text-cyan-400 mt-0.5">
                    {current.projectType}
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          </div>

          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prevSlide}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className="p-3 rounded-xl glass-card hover:border-cyan-500/30 transition-all duration-300 group"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setIsAutoPlaying(false);
                  }}
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                  className={`transition-all duration-300 rounded-full ${
                    idx === currentIndex
                      ? "w-8 h-2 bg-cyan-500"
                      : "w-2 h-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className="p-3 rounded-xl glass-card hover:border-cyan-500/30 transition-all duration-300 group"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

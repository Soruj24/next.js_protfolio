"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { usePathname } from "next/navigation";

export default function PageTransition() {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const text = textRef.current;

    if (!overlay || !text) return;

    // Initial entrance animation
    const tl = gsap.timeline();

    tl.set(overlay, { xPercent: 0 })
      .to(overlay, {
        xPercent: 100,
        duration: 0.8,
        ease: "power4.inOut",
        delay: 0.2,
      })
      .fromTo(
        ".content-wrapper",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[10000] bg-[#030712] pointer-events-none flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.2),transparent_70%)]"></div>
      </div>
      <div ref={textRef} className="relative">
        <span className="text-4xl font-bold text-white tracking-[0.2em] uppercase">
          <span className="text-cyan-500">Neural</span> Link
        </span>
        <div className="mt-4 h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-cyan-500 w-1/2 animate-shimmer"></div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </div>
  );
}

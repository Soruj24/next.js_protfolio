"use client";
import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { RefObject } from "react";

export function useMobileMenu(
  mobileMenuRef: RefObject<HTMLDivElement | null>,
  backdropRef: RefObject<HTMLDivElement | null>,
) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isMobileMenuOpen) {
        gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" });
        gsap.fromTo(mobileMenuRef.current, { x: "100%", scale: 0.95 }, { x: 0, scale: 1, duration: 0.6, ease: "back.out(1.4)" });
        gsap.fromTo(".mobile-nav-item", { x: 100, opacity: 0, rotationY: 45 }, { x: 0, opacity: 1, rotationY: 0, duration: 0.8, stagger: 0.08, delay: 0.3, ease: "elastic.out(1, 0.7)" });
        gsap.fromTo(".mobile-profile-item", { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, stagger: 0.12, delay: 0.9, ease: "power4.out" });
      } else {
        gsap.to(backdropRef.current, { opacity: 0, duration: 0.3 });
        gsap.to(mobileMenuRef.current, { x: "100%", duration: 0.4, ease: "power3.in" });
      }
    });
    return () => ctx.revert();
  }, [isMobileMenuOpen, mobileMenuRef, backdropRef]);

  useEffect(() => {
    try {
      document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
      document.documentElement.style.overscrollBehavior = isMobileMenuOpen ? "none" : "";
    } catch {}
    return () => {
      try { document.body.style.overflow = ""; document.documentElement.style.overscrollBehavior = ""; } catch {}
    };
  }, [isMobileMenuOpen]);

  return { isMobileMenuOpen, setIsMobileMenuOpen };
}

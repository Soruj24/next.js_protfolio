"use client";
import { useEffect, RefObject } from "react";
import { gsap } from "gsap";

export function useNavAnimation(navRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".nav-item", { y: -100, opacity: 0, rotationX: 90 }, { y: 0, opacity: 1, rotationX: 0, duration: 1, stagger: 0.1, ease: "back.out(1.7)", delay: 0.5 });
      gsap.fromTo(".nav-logo", { scale: 0, rotation: -180 }, { scale: 1, rotation: 0, duration: 1.5, ease: "elastic.out(1, 0.8)" });
      gsap.fromTo(".hamburger-line", { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.6, stagger: 0.1, delay: 1 });
    }, navRef);
    return () => ctx.revert();
  }, [navRef]);
}

"use client";
import { RefObject } from "react";
import { gsap } from "gsap";

export function useTiltEffect(ref: RefObject<HTMLDivElement | null>) {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = (y - rect.height / 2) / 20;
    const rotateY = (rect.width / 2 - x) / 20;
    gsap.to(card, { rotateX, rotateY, duration: 0.5, ease: "power2.out", transformPerspective: 1000 });
  };

  const handleMouseLeave = () => {
    if (ref.current) gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "power2.out" });
  };

  return { handleMouseMove, handleMouseLeave };
}

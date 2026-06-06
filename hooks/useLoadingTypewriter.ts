"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export function useLoadingTypewriter(
  textRef: React.RefObject<HTMLHeadingElement | null>,
  cursorRef: React.RefObject<HTMLSpanElement | null>,
  percentageRef: React.RefObject<HTMLSpanElement | null>,
  cubesRef: React.MutableRefObject<(HTMLDivElement | null)[]>,
  containerRef: React.RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const fullText = "Soruj Mahmud";
      let currentText = "";

      gsap.to({}, {
        duration: 3,
        ease: "none",
        onUpdate: function () {
          const progress = this.progress();
          const charsToShow = Math.floor(progress * fullText.length);
          currentText = fullText.slice(0, charsToShow);
          if (textRef.current) textRef.current.textContent = currentText;
        },
        onComplete: () => {
          if (cursorRef.current) {
            gsap.to(cursorRef.current, { opacity: 0, duration: 0.6, repeat: -1, yoyo: true, ease: "power1.inOut" });
          }
        },
      });

      const loadingTl = gsap.timeline();
      loadingTl
        .to(".loading-bar", {
          width: "100%",
          duration: 3.5,
          ease: "power3.out",
          onUpdate: function () {
            const progress = this.progress() * 100;
            if (percentageRef.current) percentageRef.current.textContent = `${Math.round(progress)}%`;
          },
        })
        .to(".loading-glow", {
          scaleX: 1.5, opacity: 0.8, duration: 1, repeat: -1, yoyo: true, ease: "sine.inOut",
        }, "-=3");

      cubesRef.current.forEach((cube, index) => {
        if (!cube) return;
        const delay = index * 0.2;
        gsap.fromTo(cube, { y: -100, scale: 0, rotation: 0 }, {
          y: 0, scale: 1, rotation: index % 2 === 0 ? 360 : -360,
          duration: 1.2, ease: "back.out(1.7)", delay,
        });
        gsap.to(cube, {
          y: -30 + Math.sin(index) * 20, x: Math.cos(index) * 20,
          rotationX: "+=360", rotationY: "+=360",
          duration: 6 + index, repeat: -1, ease: "none", delay,
        });
        gsap.to(cube, {
          y: "+=20", duration: 2 + index * 0.3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: delay + 0.5,
        });
      });

      gsap.to(".loading-bg", {
        backgroundPosition: "200% 200%", duration: 12, repeat: -1, ease: "none",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [textRef, cursorRef, percentageRef, cubesRef, containerRef]);
}

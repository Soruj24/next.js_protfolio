"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export function useLoadingAnimation(
  containerRef: React.RefObject<HTMLDivElement | null>,
  textRef: React.RefObject<HTMLHeadingElement | null>,
  cursorRef: React.RefObject<HTMLSpanElement | null>,
  percentageRef: React.RefObject<HTMLSpanElement | null>,
  cubesRef: React.MutableRefObject<(HTMLDivElement | null)[]>,
) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const masterTl = gsap.timeline();
      const fullName = "Soruj Mahmud";

      masterTl.to({}, {
        duration: 3.5, ease: "none",
        onUpdate: function () {
          const progress = this.progress();
          const chars = Math.floor(progress * fullName.length + 1);
          if (textRef.current) textRef.current.textContent = fullName.slice(0, chars);
        },
        onComplete: () => {
          if (cursorRef.current) {
            gsap.to(cursorRef.current, { opacity: 0, duration: 0.6, repeat: -1, yoyo: true, ease: "power1.inOut" });
          }
        },
      });

      const progressValue = { val: 0 };
      masterTl.to(progressValue, {
        val: 100, duration: 4.5, ease: "power3.out",
        onUpdate: () => { if (percentageRef.current) percentageRef.current.textContent = `${Math.round(progressValue.val)}%`; },
      }, "-=3.5");

      masterTl.to(".loading-bar", { width: "100%", duration: 4.5, ease: "power3.out" }, "-=4.5");
      masterTl.to(".loading-glow", { scaleX: 2, opacity: 0.8, duration: 1.2, repeat: -1, yoyo: true, ease: "sine.inOut" }, "-=4.5");

      masterTl.fromTo(cubesRef.current,
        { y: -200, scale: 0, opacity: 0, rotationX: 0, rotationY: 0 },
        { y: 0, scale: 1, opacity: 1, rotationX: (i: number) => (i % 2 === 0 ? 360 : -360), rotationY: (i: number) => (i % 2 === 0 ? -360 : 360), duration: 1.6, ease: "back.out(2)", stagger: { amount: 0.8, from: "center" } },
        "-=4"
      );

      cubesRef.current.forEach((cube, i) => {
        if (!cube) return;
        gsap.to(cube, { y: "+=40", duration: 3 + i * 0.4, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(cube, { rotationX: "+=720", rotationY: "+=720", duration: 20, repeat: -1, ease: "none" });
      });

      gsap.to(".loading-bg", { backgroundPosition: "200% 200%", duration: 16, repeat: -1, ease: "none" });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, textRef, cursorRef, percentageRef, cubesRef]);
}

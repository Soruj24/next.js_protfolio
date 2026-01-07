"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: "none",
      });

      gsap.to(follower, {
        x: clientX,
        y: clientY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onMouseEnter = () => {
      gsap.to([cursor, follower], {
        opacity: 1,
        scale: 1,
        duration: 0.3,
      });
    };

    const onMouseLeave = () => {
      gsap.to([cursor, follower], {
        opacity: 0,
        scale: 0,
        duration: 0.3,
      });
    };

    const onMouseDown = () => {
      gsap.to(cursor, { scale: 0.5, duration: 0.2 });
      gsap.to(follower, { scale: 1.5, duration: 0.2 });
    };

    const onMouseUp = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
      gsap.to(follower, { scale: 1, duration: 0.2 });
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll("button, a, input, textarea, .interactive");
    
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(follower, {
          scale: 2,
          backgroundColor: "rgba(6, 182, 212, 0.2)",
          borderColor: "rgba(6, 182, 212, 0.5)",
          duration: 0.3,
        });
      });
      
      el.addEventListener("mouseleave", () => {
        gsap.to(follower, {
          scale: 1,
          backgroundColor: "transparent",
          borderColor: "rgba(6, 182, 212, 0.3)",
          duration: 0.3,
        });
      });
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-500 rounded-full pointer-events-none z-[9999] mix-blend-difference opacity-0 transform -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 border border-cyan-500/30 rounded-full pointer-events-none z-[9998] opacity-0 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-[1px] transition-colors duration-300"
      />
    </>
  );
}

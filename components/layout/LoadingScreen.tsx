"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const percentageRef = useRef<HTMLSpanElement>(null);
  const cubesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const masterTl = gsap.timeline();

      const fullName = "Soruj Mahmud";

      // Typewriter Effect (character by character)
      masterTl.to(
        {},
        {
          duration: 3.5,
          ease: "none",
          onUpdate: function () {
            const progress = this.progress();
            const chars = Math.floor(progress * fullName.length + 1);
            if (textRef.current) {
              textRef.current.textContent = fullName.slice(0, chars);
            }
          },
          onComplete: () => {
            if (cursorRef.current) {
              gsap.to(cursorRef.current, {
                opacity: 0,
                duration: 0.6,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
              });
            }
          },
        }
      );

      // Dynamic Percentage 0 → 100 + Loading Bar
      const progressValue = { val: 0 };
      masterTl.to(
        progressValue,
        {
          val: 100,
          duration: 4.5,
          ease: "power3.out",
          onUpdate: () => {
            if (percentageRef.current) {
              percentageRef.current.textContent = `${Math.round(
                progressValue.val
              )}%`;
            }
          },
        },
        "-=3.5"
      );

      masterTl.to(
        ".loading-bar",
        {
          width: "100%",
          duration: 4.5,
          ease: "power3.out",
        },
        "-=4.5"
      );

      // Pulsing glow
      masterTl.to(
        ".loading-glow",
        {
          scaleX: 2,
          opacity: 0.8,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        },
        "-=4.5"
      );

      // Cubes: Staggered dramatic entrance
      masterTl.fromTo(
        cubesRef.current,
        {
          y: -200,
          scale: 0,
          opacity: 0,
          rotationX: 0,
          rotationY: 0,
        },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          rotationX: (i: number) => (i % 2 === 0 ? 360 : -360),
          rotationY: (i: number) => (i % 2 === 0 ? -360 : 360),
          duration: 1.6,
          ease: "back.out(2)",
          stagger: { amount: 0.8, from: "center" },
        },
        "-=4"
      );

      // Continuous floating + 3D rotation
      cubesRef.current.forEach((cube, i) => {
        if (!cube) return;

        gsap.to(cube, {
          y: "+=40",
          duration: 3 + i * 0.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(cube, {
          rotationX: "+=720",
          rotationY: "+=720",
          duration: 20,
          repeat: -1,
          ease: "none",
        });
      });

      // Animated background gradient
      gsap.to(".loading-bg", {
        backgroundPosition: "200% 200%",
        duration: 16,
        repeat: -1,
        ease: "none",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const setCubeRef = (el: HTMLDivElement | null, index: number) => {
    cubesRef.current[index] = el;
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 loading-bg overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/50 via-purple-900/50 to-blue-900/50" />

      <div className="relative z-10 flex h-screen items-center justify-center">
        <div className="text-center">
          {/* Floating 3D Cubes */}
          <div className="mb-20 flex justify-center gap-16">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                ref={(el) => setCubeRef(el, i)}
                className="h-20 w-20 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 shadow-2xl shadow-cyan-500/80"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 rounded-2xl bg-white/20 backdrop-blur-sm" />
              </div>
            ))}
          </div>

          {/* Typewriter Name */}
          <h1
            ref={textRef}
            className="mb-12 text-6xl font-extrabold tracking-tight md:text-8xl"
          >
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              <span className="inline-block"></span>
              <span
                ref={cursorRef}
                className="ml-2 inline-block h-16 w-1 bg-cyan-400"
              >
                |
              </span>
            </span>
          </h1>

          {/* Progress Bar with Shimmer */}
          <div className="mx-auto w-full max-w-2xl px-8">
            <div className="h-7 overflow-hidden rounded-full bg-gray-900/80 shadow-2xl backdrop-blur border border-cyan-500/40">
              <div className="loading-bar relative h-full w-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600">
                <div className="loading-glow absolute inset-0 bg-white/70 blur-2xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-shimmer" />
              </div>
            </div>
          </div>

          {/* Dynamic Percentage */}
          <p
            ref={percentageRef as React.Ref<HTMLParagraphElement>}
            className="mt-12 text-5xl font-light tracking-widest text-cyan-300"
          >
            0%
          </p>
        </div>
      </div>

      <style jsx>{`
        .loading-bg {
          background: linear-gradient(
            -45deg,
            #0f172a,
            #1e1b4b,
            #1e3a8a,
            #0369a1,
            #0f172a
          );
          background-size: 400% 400%;
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite linear;
        }
      `}</style>
    </div>
  );
}

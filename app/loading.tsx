"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

function LoadingScreen() {
  const loadingRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const percentageRef = useRef<HTMLSpanElement>(null);
  const cubesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const fullText = "Soruj Mahmud";
      let currentText = "";

      // Typewriter effect
      gsap.to(
        {},
        {
          duration: 3,
          ease: "none",
          onUpdate: function () {
            const progress = this.progress();
            const charsToShow = Math.floor(progress * fullText.length);
            currentText = fullText.slice(0, charsToShow);
            if (textRef.current) {
              textRef.current.textContent = currentText;
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

      // Loading bar + percentage sync
      const loadingTl = gsap.timeline();
      loadingTl
        .to(".loading-bar", {
          width: "100%",
          duration: 3.5,
          ease: "power3.out",
          onUpdate: function () {
            const progress = this.progress() * 100;
            if (percentageRef.current) {
              percentageRef.current.textContent = `${Math.round(progress)}%`;
            }
          },
        })
        .to(
          ".loading-glow",
          {
            scaleX: 1.5,
            opacity: 0.8,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          },
          "-=3"
        );

      // Enhanced cubes animation
      cubesRef.current.forEach((cube, index) => {
        if (!cube) return;

        const delay = index * 0.2;

        // Entrance: fall + scale in
        gsap.fromTo(
          cube,
          { y: -100, scale: 0, rotation: 0 },
          {
            y: 0,
            scale: 1,
            rotation: index % 2 === 0 ? 360 : -360,
            duration: 1.2,
            ease: "back.out(1.7)",
            delay: delay,
          }
        );

        // Continuous floating + rotation
        gsap.to(cube, {
          y: -30 + Math.sin(index) * 20,
          x: Math.cos(index) * 20,
          rotationX: "+=360",
          rotationY: "+=360",
          duration: 6 + index,
          repeat: -1,
          ease: "none",
          delay: delay,
        });

        // Individual bobbing
        gsap.to(cube, {
          y: "+=20",
          duration: 2 + index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: delay + 0.5,
        });
      });

      // Background gradient shift
      gsap.to(".loading-bg", {
        backgroundPosition: "200% 200%",
        duration: 12,
        repeat: -1,
        ease: "none",
      });
    }, loadingRef);

    return () => ctx.revert();
  }, []);

  const addCubeRef = (el: HTMLDivElement | null, index: number) => {
    cubesRef.current[index] = el;
  };

  return (
    <div
      ref={loadingRef}
      className="fixed inset-0 z-50 loading-bg overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/80 via-purple-900/80 to-blue-900/80 bg-size-200"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center">
          {/* Floating Cubes */}
          <div className="flex justify-center space-x-8 mb-16 relative">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                ref={(el) => addCubeRef(el, i)}
                className="cube w-12 h-12 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-xl shadow-2xl shadow-cyan-500/60 transform-gpu"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 rounded-xl bg-white/10 backdrop-blur-sm"></div>
              </div>
            ))}
          </div>

          {/* Title with typewriter */}
          <h2
            ref={textRef}
            className="text-5xl md:text-6xl font-extrabold mb-10 tracking-tight"
          >
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              <span className="inline-block">Soruj Mahmud</span>
              <span
                ref={cursorRef}
                className="inline-block w-1 h-12 bg-cyan-400 ml-1 animate-pulse"
              >
                |
              </span>
            </span>
          </h2>

          {/* Loading Bar */}
          <div className="w-96 max-w-full mx-auto px-4">
            <div className="h-4 bg-gray-900/80 rounded-full overflow-hidden shadow-2xl backdrop-blur-sm border border-cyan-500/20">
              <div className="loading-bar h-full w-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 relative overflow-hidden">
                <div className="loading-glow absolute inset-0 bg-white blur-lg"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%]"></div>
              </div>
            </div>
          </div>

          {/* Percentage */}
          <div className="mt-6 text-2xl font-mono text-cyan-300 tracking-wider">
            <span ref={percentageRef} className="loading-percentage">
              0%
            </span>
          </div>
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
          animation: gradientShift 12s ease infinite;
        }
        .bg-size-200 {
          background-size: 200% 200%;
        }
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}

export default LoadingScreen;

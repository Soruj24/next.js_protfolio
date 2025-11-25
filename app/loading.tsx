"use client"
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

function LoadingScreen() {
  const loadingRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const cubesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.to(textRef.current, {
          text: "Soruj Mahmud",
          duration: 3,
          ease: "none",
          onComplete: () => {
            gsap.to(".cursor", {
              opacity: 0,
              duration: 0.5,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut",
            });
          },
        });
      }

      const loadingTl = gsap.timeline();
      loadingTl
        .to(".loading-bar", {
          width: "100%",
          duration: 2.5,
          ease: "power2.inOut",
        })
        .to(
          ".loading-glow",
          {
            opacity: 1,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          },
          "-=1.5"
        );

      cubesRef.current.forEach((cube, index) => {
        if (cube) {
          gsap.to(cube, {
            rotationX: 360,
            rotationY: 360,
            duration: 4,
            repeat: -1,
            ease: "none",
            delay: index * 0.5,
          });

          gsap.to(cube, {
            y: -40,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.3,
          });
        }
      });

      gsap.to(".loading-bg", {
        backgroundPosition: "200% 200%",
        duration: 8,
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
    <div ref={loadingRef} className="fixed inset-0 z-50 loading-bg">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900 via-purple-900 to-blue-900 bg-size-200"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="flex justify-center space-x-6 mb-12">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                ref={(el) => addCubeRef(el, i)}
                className="cube w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg shadow-2xl shadow-cyan-500/50"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>

          <h2
            ref={textRef}
            className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
          >
            <span className="cursor">|</span>
          </h2>

          <div className="w-80 h-3 bg-gray-800 rounded-full overflow-hidden shadow-inner">
            <div className="loading-bar h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 w-0 relative">
              <div className="loading-glow absolute inset-0 bg-white opacity-0 blur-md"></div>
            </div>
          </div>

          <div className="mt-4 text-cyan-400 font-mono text-sm">
            <span className="loading-percentage">0%</span>
          </div>
        </div>
      </div>

      <style>{`
        .loading-bg {
          background: linear-gradient(-45deg, #0f172a, #1e1b4b, #1e3a8a, #0369a1, #0f172a);
          background-size: 400% 400%;
        }
        .bg-size-200 {
          background-size: 200% 200%;
        }
      `}</style>
    </div>
  );
}

export default LoadingScreen;
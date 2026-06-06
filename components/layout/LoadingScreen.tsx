"use client";
import { useRef } from "react";
import { useLoadingAnimation } from "@/hooks/useLoadingAnimation";

export default function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const percentageRef = useRef<HTMLSpanElement>(null);
  const cubesRef = useRef<(HTMLDivElement | null)[]>([]);

  useLoadingAnimation(containerRef, textRef, cursorRef, percentageRef, cubesRef);

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 loading-bg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/50 via-purple-900/50 to-blue-900/50" />
      <div className="relative z-10 flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-20 flex justify-center gap-16">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                ref={(el) => { cubesRef.current[i] = el; }}
                className="h-20 w-20 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 shadow-2xl shadow-cyan-500/80"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 rounded-2xl bg-white/20 backdrop-blur-sm" />
              </div>
            ))}
          </div>

          <h1 ref={textRef} className="mb-12 text-6xl font-extrabold tracking-tight md:text-8xl">
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              <span className="inline-block" />
              <span ref={cursorRef} className="ml-2 inline-block h-16 w-1 bg-cyan-400">|</span>
            </span>
          </h1>

          <div className="mx-auto w-full max-w-2xl px-8">
            <div className="h-7 overflow-hidden rounded-full bg-gray-900/80 shadow-2xl backdrop-blur border border-cyan-500/40">
              <div className="loading-bar relative h-full w-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600">
                <div className="loading-glow absolute inset-0 bg-white/70 blur-2xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-shimmer" />
              </div>
            </div>
          </div>

          <p ref={percentageRef as React.Ref<HTMLParagraphElement>} className="mt-12 text-5xl font-light tracking-widest text-cyan-300">
            0%
          </p>
        </div>
      </div>

      <style jsx>{`
        .loading-bg {
          background: linear-gradient(-45deg, #0f172a, #1e1b4b, #1e3a8a, #0369a1, #0f172a);
          background-size: 400% 400%;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer { animation: shimmer 3s infinite linear; }
      `}</style>
    </div>
  );
}

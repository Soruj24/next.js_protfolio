"use client";
import { useRef } from "react";
import { useLoadingAnimation } from "@/hooks/useLoadingAnimation";
import LoadingCubes from "@/components/layout/LoadingCubes";

function LoadingScreen() {
  const loadingRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const percentageRef = useRef<HTMLSpanElement>(null);
  const cubesRef = useRef<(HTMLDivElement | null)[]>([]);

  useLoadingAnimation(loadingRef, textRef, cursorRef, percentageRef, cubesRef);

  return (
    <div ref={loadingRef} className="fixed inset-0 z-50 loading-bg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/80 via-purple-900/80 to-blue-900/80 bg-size-200" />

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <LoadingCubes ref={cubesRef} />

          <h2 ref={textRef} className="text-5xl md:text-6xl font-extrabold mb-10 tracking-tight">
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              <span className="inline-block">Soruj Mahmud</span>
              <span ref={cursorRef} className="inline-block w-1 h-12 bg-cyan-400 ml-1 animate-pulse">|</span>
            </span>
          </h2>

          <div className="w-96 max-w-full mx-auto px-4">
            <div className="h-4 bg-gray-900/80 rounded-full overflow-hidden shadow-2xl backdrop-blur-sm border border-cyan-500/20">
              <div className="loading-bar h-full w-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 relative overflow-hidden">
                <div className="loading-glow absolute inset-0 bg-white blur-lg" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%]" />
              </div>
            </div>
          </div>

          <div className="mt-6 text-2xl font-mono text-cyan-300 tracking-wider">
            <span ref={percentageRef} className="loading-percentage">0%</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .loading-bg {
          background: linear-gradient(-45deg, #0f172a, #1e1b4b, #1e3a8a, #0369a1, #0f172a);
          background-size: 400% 400%;
          animation: gradientShift 12s ease infinite;
        }
        .bg-size-200 { background-size: 200% 200%; }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}

export default LoadingScreen;

"use client";
import { useRef, useImperativeHandle, forwardRef } from "react";

const LoadingCubes = forwardRef<((HTMLDivElement | null)[])>((_props, ref) => {
  const cubesRef = useRef<(HTMLDivElement | null)[]>([]);

  useImperativeHandle(ref, () => cubesRef.current, []);

  const addCubeRef = (el: HTMLDivElement | null, index: number) => {
    cubesRef.current[index] = el;
  };

  return (
    <div className="flex justify-center space-x-8 mb-16 relative">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          ref={(el) => addCubeRef(el, i)}
          className="cube w-12 h-12 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-xl shadow-2xl shadow-cyan-500/60 transform-gpu"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="absolute inset-0 rounded-xl bg-white/10 backdrop-blur-sm" />
        </div>
      ))}
    </div>
  );
});

LoadingCubes.displayName = "LoadingCubes";
export default LoadingCubes;

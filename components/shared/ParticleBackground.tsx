"use client";
import { useRef } from "react";
import { useParticleEngine } from "@/hooks/useParticleEngine";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useParticleEngine(canvasRef);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 bg-[#0b1220]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_70%)]" />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}

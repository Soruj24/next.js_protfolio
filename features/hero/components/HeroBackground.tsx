"use client";

import { motion } from "framer-motion";

const orbs = [
  {
    color: "rgba(6,182,212,0.12)",
    size: 600,
    x: "15%",
    y: "20%",
    duration: 25,
  },
  {
    color: "rgba(139,92,246,0.10)",
    size: 500,
    x: "75%",
    y: "60%",
    duration: 30,
  },
  {
    color: "rgba(236,72,153,0.06)",
    size: 400,
    x: "60%",
    y: "10%",
    duration: 20,
  },
  {
    color: "rgba(59,130,246,0.08)",
    size: 350,
    x: "25%",
    y: "75%",
    duration: 22,
  },
];

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Deep base */}
      <div className="absolute inset-0 bg-[#030712]" />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(6,182,212,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Animated orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: "blur(80px)",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            x: [0, 30, -20, 15, 0],
            y: [0, -25, 15, -10, 0],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial fade over grid */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, transparent 0%, #030712 100%)",
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

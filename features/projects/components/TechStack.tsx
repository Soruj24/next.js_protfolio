"use client";
import { motion } from "framer-motion";

interface TechStackProps {
  technologies: string[];
  compact?: boolean;
}

const techColors: Record<string, string> = {
  "Next.js": "bg-white/10 text-white border-white/15",
  React: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  TypeScript: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Framer Motion": "bg-pink-500/10 text-pink-400 border-pink-500/20",
  GSAP: "bg-green-500/10 text-green-400 border-green-500/20",
  "Tailwind CSS": "bg-teal-500/10 text-teal-400 border-teal-500/20",
  "Redux Toolkit": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "TanStack Query": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Shadcn UI": "bg-gray-500/10 text-gray-400 border-gray-500/20",
  "Radix UI": "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  "Stripe SDK": "bg-violet-500/10 text-violet-400 border-violet-500/20",
  Cloudinary: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  Vite: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "Three.js": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "Canvas API": "bg-rose-500/10 text-rose-400 border-rose-500/20",
  "D3.js": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Recharts: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  WebSockets: "bg-lime-500/10 text-lime-400 border-lime-500/20",
  Zustand: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  "Express.js": "bg-gray-500/10 text-gray-400 border-gray-500/20",
  "Next.js 14": "bg-white/10 text-white border-white/15",
  MongoDB: "bg-green-500/10 text-green-400 border-green-500/20",
  PostgreSQL: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Redis: "bg-red-500/10 text-red-400 border-red-500/20",
  Docker: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  AWS: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Prisma: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  GraphQL: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  REST: "bg-green-500/10 text-green-400 border-green-500/20",
  "Node.js": "bg-green-500/10 text-green-400 border-green-500/20",
  Firebase: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

function getTechColor(tech: string): string {
  if (techColors[tech]) return techColors[tech];
  const hash = tech.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const colors = [
    "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    "bg-purple-500/10 text-purple-400 border-purple-500/20",
    "bg-pink-500/10 text-pink-400 border-pink-500/20",
    "bg-amber-500/10 text-amber-400 border-amber-500/20",
    "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    "bg-sky-500/10 text-sky-400 border-sky-500/20",
  ];
  return colors[hash % colors.length];
}

export default function TechStack({ technologies, compact = false }: TechStackProps) {
  const displayTechs = compact ? technologies.slice(0, 6) : technologies;
  const remaining = compact ? Math.max(0, technologies.length - 6) : 0;

  return (
    <div className="flex flex-wrap gap-1.5">
      {displayTechs.map((tech, i) => (
        <motion.span
          key={tech}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.03, duration: 0.3 }}
          className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border ${getTechColor(tech)} ${
            compact ? "" : ""
          }`}
        >
          {tech}
        </motion.span>
      ))}
      {remaining > 0 && (
        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white/[0.04] text-gray-400 border border-white/[0.06]">
          +{remaining}
        </span>
      )}
    </div>
  );
}

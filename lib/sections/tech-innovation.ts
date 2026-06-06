import { Lightbulb, Rocket, Shield, Cpu, Zap, Globe, type LucideIcon } from "lucide-react";

interface IconDef {
  icon: LucideIcon;
  className: string;
}

export const iconMap: Record<string, IconDef> = {
  "🤖": { icon: Cpu, className: "w-8 h-8 text-cyan-400" },
  "🚀": { icon: Rocket, className: "w-8 h-8 text-purple-400" },
  "⚡": { icon: Zap, className: "w-8 h-8 text-yellow-400" },
  "🛡️": { icon: Shield, className: "w-8 h-8 text-green-400" },
  "🌐": { icon: Globe, className: "w-8 h-8 text-blue-400" },
  "💡": { icon: Lightbulb, className: "w-8 h-8 text-red-400" },
};

export const colorMap: Record<string, { color: string; border: string }> = {
  cyan: { color: "from-cyan-500/20 to-blue-500/20", border: "border-cyan-500/30" },
  purple: { color: "from-purple-500/20 to-pink-500/20", border: "border-purple-500/30" },
  yellow: { color: "from-yellow-500/20 to-orange-500/20", border: "border-yellow-500/30" },
  green: { color: "from-green-500/20 to-emerald-500/20", border: "border-green-500/30" },
  blue: { color: "from-blue-500/20 to-indigo-500/20", border: "border-blue-500/30" },
  red: { color: "from-red-500/20 to-rose-500/20", border: "border-red-500/30" },
};

export const defaultInnovationData = [
  { title: "Modern Frontend Stack", description: "Leveraging the power of Next.js 14, React 18, and TypeScript to build type-safe, high-performance web applications.", icon: "🤖", color: "cyan" },
  { title: "Immersive UI/UX", description: "Creating captivating digital experiences using GSAP, Framer Motion, and Three.js for smooth, meaningful interactions.", icon: "🚀", color: "purple" },
  { title: "Performance Engineering", description: "Deep-diving into Core Web Vitals and edge computing to deliver lightning-fast, SEO-optimized user experiences globally.", icon: "⚡", color: "yellow" },
  { title: "Accessible Design", description: "Implementing WCAG 2.1 standards and semantic HTML to ensure inclusive digital products for all users.", icon: "🛡️", color: "green" },
  { title: "Atomic Architecture", description: "Building scalable design systems and reusable component libraries that speed up development and maintain consistency.", icon: "🌐", color: "blue" },
  { title: "Future of Web", description: "Exploring the potential of WebGL, WebAssembly, and PWAs to push the boundaries of what's possible in the browser.", icon: "💡", color: "red" },
];

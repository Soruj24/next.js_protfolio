import {
  Code2,
  Palette,
  Smartphone,
  Gauge,
  Layers,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  gradient: string;
}

export const services: ServiceItem[] = [
  {
    id: "svc-1",
    title: "Frontend Development",
    description:
      "Building scalable, performant web applications with React, Next.js, and TypeScript. Clean architecture, reusable components, and enterprise-grade code quality.",
    icon: Code2,
    features: [
      "React & Next.js Applications",
      "TypeScript Integration",
      "Component Architecture",
      "API Integration",
    ],
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    id: "svc-2",
    title: "UI/UX Design Implementation",
    description:
      "Transforming design mockups into pixel-perfect, interactive interfaces. Attention to spacing, typography, color theory, and visual hierarchy.",
    icon: Palette,
    features: [
      "Pixel-Perfect Implementation",
      "Design System Creation",
      "Responsive Layouts",
      "Cross-Browser Support",
    ],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "svc-3",
    title: "Responsive & Mobile-First",
    description:
      "Crafting fluid experiences that work flawlessly across all devices and screen sizes. Mobile-first approach with progressive enhancement.",
    icon: Smartphone,
    features: [
      "Mobile-First Strategy",
      "Fluid Typography",
      "Touch Interactions",
      "Progressive Enhancement",
    ],
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: "svc-4",
    title: "Performance Optimization",
    description:
      "Maximizing Core Web Vitals, minimizing bundle sizes, and implementing advanced caching strategies for lightning-fast applications.",
    icon: Gauge,
    features: [
      "Core Web Vitals",
      "Bundle Optimization",
      "Image Optimization",
      "Lazy Loading",
    ],
    gradient: "from-orange-500 to-amber-500",
  },
  {
    id: "svc-5",
    title: "State Management",
    description:
      "Implementing robust state management solutions with Redux Toolkit, React Context, and Zustand for predictable, testable data flows.",
    icon: Layers,
    features: [
      "Redux Toolkit",
      "React Context",
      "Server State (React Query)",
      "Predictable Patterns",
    ],
    gradient: "from-rose-500 to-red-500",
  },
  {
    id: "svc-6",
    title: "Animations & Micro-Interactions",
    description:
      "Creating delightful user experiences with Framer Motion, GSAP, and CSS animations. Subtle, purposeful motion that enhances usability.",
    icon: Sparkles,
    features: [
      "Framer Motion Animations",
      "GSAP Scroll Animations",
      "Micro-Interactions",
      "Page Transitions",
    ],
    gradient: "from-indigo-500 to-violet-500",
  },
];

import type { IProject } from "../types";

export const projects: IProject[] = [
  {
    id: "luxe-ecommerce-experience",
    title: "Luxe: Immersive E-Commerce Storefront",
    description:
      "A high-performance, visually stunning e-commerce frontend focused on premium user experience and seamless animations.",
    fullDescription:
      "Luxe is a flagship frontend project that pushes the boundaries of modern web design. Built with Next.js 14 and GSAP, it features smooth page transitions, high-resolution image optimization, and a fluid mobile-first interface. The project emphasizes pixel-perfect execution, accessibility (A11y), and core web vitals optimization to ensure a premium shopping experience.",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
    technologies: [
      "Next.js 14",
      "React",
      "TypeScript",
      "GSAP",
      "Framer Motion",
      "Tailwind CSS",
      "Redux Toolkit",
      "TanStack Query",
      "Shadcn UI",
      "Radix UI",
      "Stripe SDK",
      "Cloudinary",
    ],
    features: [
      "Smooth GSAP Page Transitions",
      "Responsive Product Carousels",
      "Interactive Filter & Search System",
      "Micro-interactions with Framer Motion",
      "Dynamic Cart & Checkout Flow",
      "SEO Optimized Metadata",
      "Advanced Image Lazy Loading",
      "Dark/Light Mode Support",
      "Skeleton Loading States",
      "Accessibility Compliant (WCAG)",
    ],
    githubUrl: "https://github.com/soruj-mahmud/luxe-frontend",
    liveUrl: "https://luxe.soruj.dev",
    category: "E-Commerce",
    status: "completed",
    screenshots: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
    ],
    challenges: [
      "Implementing complex GSAP timelines without performance lag",
      "Synchronizing server-side data with client-side state transitions",
      "Maintaining high SEO scores with heavy animation usage",
    ],
    solutions: [
      "Utilized GSAP context for efficient cleanup and React integration",
      "Implemented optimistic UI updates with TanStack Query",
      "Leveraged Next.js App Router and Server Components for critical path CSS",
    ],
    featured: true,
    difficulty: "advanced",
    duration: "3 months",
    teamSize: "Solo Developer",
    completionDate: "2024-11-20",
    createdAt: "2024-08-15",
    updatedAt: "2024-11-25",
    tags: ["frontend", "nextjs", "gsap", "ecommerce", "ux"],
    emoji: "🛍️",
    stats: {
      completionTime: "3 months",
      teamSize: "Solo",
      complexity: "High (UI Focus)",
      views: 3200,
      likes: 650,
    },
    architecture:
      "Modern Next.js 14 architecture using the App Router, centralized state with Redux, and specialized animation layers with GSAP.",
    developmentHighlights: [
      {
        title: "Immersive Animations",
        description:
          "Developed a custom animation hook system for reusable GSAP transitions.",
      },
      {
        title: "Component Architecture",
        description:
          "Built a robust, reusable component library based on Atomic Design principles.",
      },
    ],
    lessonsLearned: [
      "Performance and animations can coexist with proper optimization",
      "Server Components significantly improve Initial Page Load even in heavy UI apps",
    ],
    futureImprovements: [
      "Integration with 3D models using Three.js",
      "PWA support for offline shopping",
    ],
    metaDescription:
      "Premium e-commerce frontend built with Next.js 14, GSAP, and Tailwind CSS.",
    seoTitle: "Luxe | Immersive E-Commerce Frontend Experience",
    performance: {
      loadTime: 98,
      interactivity: 95,
      seo: 100,
    },
  },
  {
    id: "creative-portfolio-v2",
    title: "Vivid: Creative Developer Portfolio",
    description:
      "A high-impact personal portfolio featuring advanced interactive elements and scroll-based storytelling.",
    fullDescription:
      "Vivid is a portfolio template designed for creative developers who want to showcase their work through interactive storytelling. It features a unique horizontal scroll experience, WebGL backgrounds, and dynamic project previews. Every interaction is carefully crafted to provide a memorable user journey while maintaining fast load times.",
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
    technologies: [
      "React",
      "Vite",
      "TypeScript",
      "Framer Motion",
      "GSAP",
      "Three.js",
      "Tailwind CSS",
      "Canvas API",
    ],
    features: [
      "Horizontal Scroll Navigation",
      "Interactive 3D Elements",
      "Dynamic Cursor Tracking",
      "Smooth Layout Transitions",
      "Mobile-Optimized Touch Interactions",
      "Custom Theme Engine",
    ],
    githubUrl: "https://github.com/soruj-mahmud/vivid-portfolio",
    liveUrl: "https://vivid.soruj.dev",
    category: "Portfolio",
    status: "completed",
    screenshots: [
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
    ],
    challenges: [
      "Optimizing 3D assets for web without sacrificing quality",
      "Creating a cohesive horizontal scroll experience on mobile",
    ],
    solutions: [
      "Used compressed GLB models and texture atlasing",
      "Developed a custom scroll proxy for cross-platform consistency",
    ],
    featured: true,
    difficulty: "medium",
    duration: "2 months",
    teamSize: "Solo Developer",
    completionDate: "2024-09-10",
    createdAt: "2024-07-05",
    updatedAt: "2024-09-15",
    tags: ["creative", "portfolio", "animations", "threejs"],
    emoji: "🎨",
    stats: {
      completionTime: "2 months",
      teamSize: "Solo",
      complexity: "High (Visual)",
      views: 5400,
      likes: 1200,
    },
    architecture:
      "React-based SPA architecture with a focus on high-performance animation rendering and canvas-based interactions.",
    developmentHighlights: [
      {
        title: "WebGL Backgrounds",
        description: "Custom shader implementation for unique visual backgrounds.",
      },
    ],
    lessonsLearned: [
      "User experience is about the balance of aesthetics and usability",
    ],
    futureImprovements: [
      "Multi-language support (i18n)",
    ],
    metaDescription:
      "Creative developer portfolio with 3D interactions and smooth animations.",
    seoTitle: "Vivid | Creative Developer Portfolio Template",
    performance: {
      loadTime: 92,
      interactivity: 94,
      seo: 98,
    },
  },
  {
    id: "nova-dashboard-system",
    title: "Nova: Real-time Analytics Dashboard",
    description:
      "A high-performance data visualization platform with real-time updates and interactive charts.",
    fullDescription:
      "Nova is a sophisticated dashboard system designed for high-density data visualization. It features custom D3.js integrations, real-time WebSocket updates, and a highly modular widget system. The project focuses on data accuracy, rendering performance, and intuitive user workflows for complex analytical tasks.",
    image:
      "https://images.unsplash.com/photo-1551288049-bbda38a5f85d?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
    technologies: [
      "React",
      "TypeScript",
      "D3.js",
      "Recharts",
      "WebSockets",
      "TanStack Query",
      "Tailwind CSS",
      "Zustand",
      "Express.js",
    ],
    features: [
      "Real-time Data Streaming",
      "Custom Interactive Charts",
      "Draggable Widget Layout",
      "Advanced Data Filtering",
      "Export to PDF/CSV Functionality",
      "Multi-dimensional Data Drill-down",
      "Role-based Dashboard Views",
      "High-performance Rendering",
      "Collaborative Annotations",
      "Theming Engine",
    ],
    githubUrl: "https://github.com/soruj-mahmud/nova-dashboard",
    liveUrl: "https://nova.soruj.dev",
    category: "Analytics",
    status: "completed",
    screenshots: [
      "https://images.unsplash.com/photo-1551288049-bbda38a5f85d?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
    ],
    challenges: [
      "Optimizing React re-renders with frequent WebSocket updates",
      "Handling large datasets in the browser without UI blocking",
      "Creating accessible complex data visualizations",
    ],
    solutions: [
      "Implemented selective state updates using Zustand selectors",
      "Utilized Web Workers for heavy data processing",
      "Applied ARIA labels and keyboard navigation to interactive charts",
    ],
    featured: true,
    difficulty: "advanced",
    duration: "4 months",
    teamSize: "2 Developers",
    completionDate: "2024-09-10",
    createdAt: "2024-05-15",
    updatedAt: "2024-09-15",
    tags: ["dashboard", "analytics", "d3js", "realtime", "typescript"],
    emoji: "📊",
    stats: {
      completionTime: "4 months",
      teamSize: "2",
      complexity: "Very High (Data Focus)",
      views: 2800,
      likes: 520,
    },
    architecture:
      "React-based micro-frontend architecture with a centralized data store and specialized visualization components.",
    developmentHighlights: [
      {
        title: "Real-time Engine",
        description:
          "Built a custom WebSocket abstraction layer for reliable data streaming.",
      },
      {
        title: "Data Visualization",
        description:
          "Developed a library of reusable, accessible D3.js chart components.",
      },
    ],
    lessonsLearned: [
      "Zustand is highly effective for managing frequent updates in complex dashboards",
      "Web Workers are essential for maintaining 60FPS with large datasets",
    ],
    futureImprovements: [
      "Smart data insights and trend forecasting",
      "Customizable user-defined dashboards",
    ],
    metaDescription:
      "Real-time analytics dashboard with D3.js and WebSocket integration.",
    seoTitle: "Nova | Real-time Data Visualization Dashboard",
    performance: {
      loadTime: 95,
      interactivity: 94,
      accessibility: 96,
      seo: 98,
    },
  },
];

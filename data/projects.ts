import type { IProject } from "@/types";

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
    githubUrl: "https://github.com/Soruj24/grocery-shop",
    liveUrl: "https://grocery-shop-two-flax.vercel.app",
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
    problem:
      "Traditional e-commerce platforms suffer from generic, template-driven storefronts that fail to create emotional connections with premium shoppers. Page transitions feel jarring, product discovery is clunky, and the overall experience lacks the refinement that luxury brands demand. Cart abandonment rates soar when the shopping journey doesn't match the quality of the products being sold.",
    solution:
      "Luxe reimagines the e-commerce experience as a curated journey. Every interaction — from browsing products to completing checkout — is orchestrated through GSAP-powered animations that create a sense of flow and continuity. Server-side rendering via Next.js App Router ensures instant page loads, while client-side state management with Redux Toolkit maintains seamless transitions between views. The result is a storefront that feels more like a premium editorial experience than a traditional shop.",
    folderStructure: [
      {
        name: "src",
        type: "folder",
        children: [
          {
            name: "app",
            type: "folder",
            children: [
              { name: "layout.tsx", type: "file" },
              { name: "page.tsx", type: "file" },
              {
                name: "(shop)",
                type: "folder",
                children: [
                  { name: "products", type: "folder", children: [{ name: "page.tsx", type: "file" }, { name: "[id]", type: "folder", children: [{ name: "page.tsx", type: "file" }] }] },
                  { name: "cart", type: "folder", children: [{ name: "page.tsx", type: "file" }] },
                  { name: "checkout", type: "folder", children: [{ name: "page.tsx", type: "file" }] },
                ],
              },
            ],
          },
          {
            name: "components",
            type: "folder",
            children: [
              { name: "ui", type: "folder", children: [{ name: "Button.tsx", type: "file" }, { name: "Card.tsx", type: "file" }, { name: "Input.tsx", type: "file" }] },
              { name: "product", type: "folder", children: [{ name: "ProductCard.tsx", type: "file" }, { name: "ProductGrid.tsx", type: "file" }, { name: "ProductGallery.tsx", type: "file" }] },
              { name: "layout", type: "folder", children: [{ name: "Header.tsx", type: "file" }, { name: "Footer.tsx", type: "file" }, { name: "Sidebar.tsx", type: "file" }] },
            ],
          },
          {
            name: "hooks",
            type: "folder",
            children: [
              { name: "useGSAPTransition.ts", type: "file" },
              { name: "useCart.ts", type: "file" },
              { name: "useProducts.ts", type: "file" },
            ],
          },
          {
            name: "store",
            type: "folder",
            children: [
              { name: "index.ts", type: "file" },
              { name: "cartSlice.ts", type: "file" },
              { name: "uiSlice.ts", type: "file" },
            ],
          },
          { name: "lib", type: "folder", children: [{ name: "utils.ts", type: "file" }, { name: "animations.ts", type: "file" }] },
          { name: "types", type: "folder", children: [{ name: "index.ts", type: "file" }] },
        ],
      },
    ],
    codeSnippets: [
      {
        title: "GSAP Page Transition Hook",
        language: "typescript",
        description: "A custom hook that orchestrates smooth page transitions using GSAP context for proper React lifecycle management.",
        code: `import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function usePageTransition() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate page sections on scroll
      gsap.utils.toArray(".section").forEach((section) => {
        gsap.from(section as Element, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section as Element,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return { containerRef };
}`,
      },
      {
        title: "Optimistic Cart Updates",
        language: "typescript",
        description: "Implementing optimistic UI updates with TanStack Query for instant cart feedback while maintaining data consistency.",
        code: `import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (item: CartItem) => {
      const res = await fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify(item),
      });
      return res.json();
    },
    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previous = queryClient.getQueryData(["cart"]);
      queryClient.setQueryData(["cart"], (old: CartItem[]) => [
        ...(old || []),
        { ...newItem, optimistic: true },
      ]);
      return { previous };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["cart"], context?.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}`,
      },
    ],
    techDecisions: [
      { tech: "Next.js 14", reason: "App Router provides server components for instant page loads, parallel routes for complex layouts, and streaming for progressive enhancement.", alternatives: "Remix, Nuxt 3, SvelteKit", category: "framework" },
      { tech: "GSAP", reason: "Industry-leading animation library with ScrollTrigger for scroll-based animations and unmatched performance for complex timelines.", alternatives: "Framer Motion, CSS animations, Anime.js", category: "animation" },
      { tech: "Redux Toolkit", reason: "Predictable state management for complex cart and user flows with built-in DevTools support.", alternatives: "Zustand, Jotai, Recoil", category: "state" },
      { tech: "TanStack Query", reason: "Server state management with automatic caching, background refetching, and optimistic updates.", alternatives: "SWR, RTK Query, Apollo Client", category: "data" },
      { tech: "Tailwind CSS", reason: "Utility-first CSS for rapid prototyping with consistent design tokens and zero runtime overhead.", alternatives: "Styled Components, CSS Modules, Emotion", category: "ui" },
      { tech: "Cloudinary", reason: "Advanced image optimization with automatic format conversion, responsive sizing, and lazy loading.", alternatives: "Imgix, Uploadcare, AWS CloudFront", category: "tooling" },
    ],
    accessibility: [
      { title: "Semantic HTML Structure", description: "All components use proper HTML5 semantic elements (nav, main, article, section) with appropriate heading hierarchy.", wcag: "1.3.1" },
      { title: "Keyboard Navigation", description: "Every interactive element is focusable and operable via keyboard. Custom focus indicators provide clear visual feedback.", wcag: "2.1.1" },
      { title: "Screen Reader Support", description: "ARIA labels, live regions, and descriptive alt text ensure screen readers can navigate and interpret all content.", wcag: "4.1.2" },
      { title: "Color Contrast", description: "All text meets WCAG AA contrast ratios against both light and dark backgrounds.", wcag: "1.4.3" },
      { title: "Motion Preferences", description: "Respects prefers-reduced-motion media query, disabling non-essential animations for sensitive users.", wcag: "2.3.3" },
    ],
    seo: [
      { title: "Structured Data", description: "Product, BreadcrumbList, and Organization schemas enable rich snippets in search results." },
      { title: "Meta Tags", description: "Dynamic OpenGraph and Twitter Card metadata for every product page with automatic image optimization." },
      { title: "Sitemap & Robots", description: "Auto-generated XML sitemap with product priority scoring and crawl budget optimization." },
      { title: "Core Web Vitals", description: "LCP under 2.5s, FID under 100ms, CLS under 0.1 through image optimization and font loading strategies." },
    ],
  },
  {
    id: "creative-portfolio-v2",
    title: "Next.js Portfolio",
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
    githubUrl: "https://github.com/Soruj24/next.js_protfolio",
    liveUrl: "https://next-js-protfolio-zeta.vercel.app/",
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
        description:
          "Custom shader implementation for unique visual backgrounds.",
      },
    ],
    lessonsLearned: [
      "User experience is about the balance of aesthetics and usability",
    ],
    futureImprovements: ["Multi-language support (i18n)"],
    metaDescription:
      "Creative developer portfolio with 3D interactions and smooth animations.",
    seoTitle: "Vivid | Creative Developer Portfolio Template",
    performance: {
      loadTime: 92,
      interactivity: 94,
      seo: 98,
    },
    problem:
      "Developer portfolios often blend into a sea of cookie-cutter templates that fail to capture the unique personality and technical prowess of their creators. Static layouts with basic project cards don't convey the depth of skill or the creative thinking that goes into real-world projects. Recruiters and hiring managers quickly scroll past portfolios that don't immediately stand out.",
    solution:
      "Vivid transforms the portfolio into an immersive experience. Horizontal scrolling creates a cinematic browsing flow, while Three.js-powered WebGL backgrounds provide visual depth that shifts as users explore. Custom cursor tracking and Framer Motion transitions ensure every interaction feels intentional and polished. The result is a portfolio that doesn't just show projects — it tells a story.",
    folderStructure: [
      {
        name: "src",
        type: "folder",
        children: [
          {
            name: "components",
            type: "folder",
            children: [
              { name: "Hero.tsx", type: "file" },
              { name: "HorizontalScroll.tsx", type: "file" },
              { name: "ProjectCard.tsx", type: "file" },
              { name: "CursorFollower.tsx", type: "file" },
              { name: "WebGLBackground.tsx", type: "file" },
            ],
          },
          {
            name: "hooks",
            type: "folder",
            children: [
              { name: "useHorizontalScroll.ts", type: "file" },
              { name: "useCursor.ts", type: "file" },
              { name: "useTheme.ts", type: "file" },
            ],
          },
          {
            name: "shaders",
            type: "folder",
            children: [
              { name: "vertex.glsl", type: "file" },
              { name: "fragment.glsl", type: "file" },
            ],
          },
          { name: "App.tsx", type: "file" },
          { name: "main.tsx", type: "file" },
        ],
      },
    ],
    codeSnippets: [
      {
        title: "Horizontal Scroll Container",
        language: "typescript",
        description: "A custom hook that converts vertical scroll into horizontal movement with smooth interpolation.",
        code: `import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useHorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scrollContent = scrollRef.current;
    if (!container || !scrollContent) return;

    const totalWidth = scrollContent.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(scrollContent, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          end: () => \`+=\${totalWidth}\`,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return { containerRef, scrollRef };
}`,
      },
    ],
    techDecisions: [
      { tech: "Vite", reason: "Lightning-fast HMR and build times for rapid iteration during the creative development process.", alternatives: "Next.js, CRA, Parcel", category: "framework" },
      { tech: "Three.js", reason: "WebGL-based 3D rendering for immersive backgrounds that run at 60FPS without compromising load times.", alternatives: "Babylon.js, PlayCanvas", category: "animation" },
      { tech: "GSAP", reason: "Pixel-perfect scroll-driven animations with ScrollTrigger for the horizontal scroll experience.", alternatives: "Framer Motion, Locomotive Scroll", category: "animation" },
      { tech: "Framer Motion", reason: "Declarative animations for UI components and page transitions with layout animations.", alternatives: "React Spring, AutoAnimate", category: "animation" },
    ],
    accessibility: [
      { title: "Reduced Motion Support", description: "All Three.js and GSAP animations gracefully degrade when prefers-reduced-motion is enabled.", wcag: "2.3.3" },
      { title: "Keyboard Navigation", description: "Horizontal scroll sections are navigable via arrow keys with proper focus management.", wcag: "2.1.1" },
      { title: "Alt Text", description: "All project images include descriptive alt text for screen reader users.", wcag: "1.1.1" },
    ],
    seo: [
      { title: "Performance First", description: "Lazy-loaded Three.js scenes and code-split bundles ensure fast initial page load." },
      { title: "Social Sharing", description: "OpenGraph images generated dynamically for each project with proper metadata." },
    ],
  },
  {
    id: "Voice-into-Flawless-Text",
    title: "Voice into Flawless Text",
    description:
      "A high-performance data visualization platform with real-time updates and interactive charts.",
    fullDescription:
      "Nova is a sophisticated dashboard system designed for high-density data visualization. It features custom D3.js integrations, real-time WebSocket updates, and a highly modular widget system. The project focuses on data accuracy, rendering performance, and intuitive user workflows for complex analytical tasks.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
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
    githubUrl: "https://github.com/Soruj24/vicse_to_text",
    liveUrl:
      "https://vicse-to-text-hmcsqguh7-soruj-mahmuds-projects.vercel.app/",
    category: "Analytics",
    status: "completed",
    screenshots: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
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
    problem:
      "Enterprise teams generating massive volumes of real-time data lack tools that can visualize information without lag. Existing dashboards either sacrifice interactivity for performance or vice versa. Spreadsheet-based analysis is slow and error-prone, while custom D3.js solutions require dedicated engineering teams to maintain. Teams need a solution that handles thousands of data points per second while remaining responsive to user interactions.",
    solution:
      "Nova combines D3.js for low-level chart customization with React's component model for maintainable visualization code. Web Workers offload heavy data transformations off the main thread, ensuring 60FPS even with 10,000+ data points. Zustand's selector-based state management prevents unnecessary re-renders when streaming data updates. The result is a dashboard that feels instant regardless of data volume.",
    folderStructure: [
      {
        name: "src",
        type: "folder",
        children: [
          {
            name: "components",
            type: "folder",
            children: [
              { name: "charts", type: "folder", children: [{ name: "LineChart.tsx", type: "file" }, { name: "BarChart.tsx", type: "file" }, { name: "PieChart.tsx", type: "file" }, { name: "HeatMap.tsx", type: "file" }] },
              { name: "widgets", type: "folder", children: [{ name: "WidgetContainer.tsx", type: "file" }, { name: "DraggableWidget.tsx", type: "file" }] },
              { name: "dashboard", type: "folder", children: [{ name: "DashboardLayout.tsx", type: "file" }, { name: "FilterPanel.tsx", type: "file" }] },
            ],
          },
          {
            name: "hooks",
            type: "folder",
            children: [
              { name: "useWebSocket.ts", type: "file" },
              { name: "useDataWorker.ts", type: "file" },
              { name: "useChartDimensions.ts", type: "file" },
            ],
          },
          {
            name: "workers",
            type: "folder",
            children: [
              { name: "dataProcessor.worker.ts", type: "file" },
              { name: "aggregation.worker.ts", type: "file" },
            ],
          },
          {
            name: "store",
            type: "folder",
            children: [
              { name: "dashboardStore.ts", type: "file" },
              { name: "dataStore.ts", type: "file" },
            ],
          },
          { name: "lib", type: "folder", children: [{ name: "d3-helpers.ts", type: "file" }, { name: "formatters.ts", type: "file" }] },
        ],
      },
    ],
    codeSnippets: [
      {
        title: "Web Worker Data Processing",
        language: "typescript",
        description: "Offloading heavy data aggregation to a Web Worker to keep the main thread responsive.",
        code: `// useDataWorker.ts
import { useEffect, useRef, useState } from "react";

export function useDataWorker(rawData: DataPoint[]) {
  const workerRef = useRef<Worker | null>(null);
  const [processedData, setProcessedData] = useState<ProcessedData[]>([]);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../workers/dataProcessor.worker.ts", import.meta.url)
    );
    workerRef.current.onmessage = (e) => setProcessedData(e.data);
    return () => workerRef.current?.terminate();
  }, []);

  useEffect(() => {
    workerRef.current?.postMessage(rawData);
  }, [rawData]);

  return processedData;
}`,
      },
      {
        title: "Zustand Selective Subscriptions",
        language: "typescript",
        description: "Using Zustand selectors to prevent unnecessary re-renders when streaming data updates.",
        code: `import { create } from "zustand";

interface DataStore {
  metrics: Map<string, Metric>;
  updateMetric: (key: string, value: Metric) => void;
}

export const useDataStore = create<DataStore>((set) => ({
  metrics: new Map(),
  updateMetric: (key, value) =>
    set((state) => {
      const next = new Map(state.metrics);
      next.set(key, value);
      return { metrics: next };
    }),
}));

// Selective subscription — only re-renders when this specific metric changes
const latency = useDataStore((s) => s.metrics.get("latency"));`,
      },
    ],
    techDecisions: [
      { tech: "D3.js", reason: "Unmatched flexibility for custom chart types and data-driven visualizations that go beyond standard charting libraries.", alternatives: "Chart.js, Victory, Nivo", category: "data" },
      { tech: "Zustand", reason: "Minimal boilerplate with selector-based subscriptions critical for high-frequency data updates.", alternatives: "Redux, Jotai, Recoil", category: "state" },
      { tech: "Web Workers", reason: "Off-main-thread data processing prevents UI blocking when aggregating thousands of data points.", alternatives: "Comlink, Service Workers", category: "data" },
      { tech: "WebSockets", reason: "Full-duplex communication for real-time bidirectional data streaming.", alternatives: "Server-Sent Events, Polling, gRPC", category: "data" },
      { tech: "Recharts", reason: "React-native charting for simpler visualizations, complementing D3.js for complex custom charts.", alternatives: "Victory, Visx", category: "ui" },
    ],
    accessibility: [
      { title: "ARIA Live Regions", description: "Real-time data updates are announced to screen readers via aria-live polite regions.", wcag: "4.1.3" },
      { title: "Chart Accessibility", description: "All charts include data tables as accessible alternatives with keyboard navigation.", wcag: "1.1.1" },
      { title: "Focus Management", description: "Widget drag-and-drop operations maintain focus order and provide clear keyboard alternatives.", wcag: "2.4.3" },
      { title: "Color Independence", description: "Charts use patterns and labels in addition to color to convey information.", wcag: "1.4.1" },
    ],
    seo: [
      { title: "Dashboard Metadata", description: "Proper title and description tags for shareable dashboard views." },
      { title: "API Documentation", description: "Auto-generated API docs from TypeScript types for developer onboarding." },
    ],
  },
];

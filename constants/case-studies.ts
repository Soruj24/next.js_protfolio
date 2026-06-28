export const defaultCaseStudies = [
  {
    title: "High-Performance E-commerce Platform",
    description: "Built a modern e-commerce storefront using Next.js 14, focusing on speed and user experience.",
    challenge: "Managing complex state across multiple filters while maintaining under 200ms TTFB and perfect Lighthouse scores.",
    solution: "Leveraged Next.js Server Components for data fetching, implemented optimistic updates for cart actions, and used edge caching.",
    impact: "Achieved 100/100 Lighthouse score, 40% increase in mobile conversion, and 50% faster page loads.",
    technologies: ["Next.js 14", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Stripe"],
    image: "/case-studies/ecommerce-platform.jpg",
  },
  {
    title: "Enterprise Design System",
    description: "Architected and implemented a scalable UI component library for a large-scale enterprise application.",
    challenge: "Ensuring design consistency across 50+ internal tools while maintaining accessibility and developer flexibility.",
    solution: "Developed an Atomic Design based library with Radix UI primitives, documented using Storybook and TSDoc.",
    impact: "Reduced UI development time by 60%, ensured 100% WCAG compliance, and unified brand identity across all platforms.",
    technologies: ["React", "Radix UI", "Tailwind CSS", "Storybook", "Jest"],
    image: "/case-studies/design-system.jpg",
  },
];

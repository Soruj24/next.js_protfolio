export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  content: string;
  rating: number;
  projectType: string;
}

export const testimonials: TestimonialItem[] = [
  {
    id: "test-1",
    name: "Sarah Chen",
    role: "Product Manager",
    company: "TechVentures",
    content:
      "Soruj delivered an exceptional React application that exceeded our expectations. His attention to detail in UI/UX implementation and performance optimization was remarkable. The codebase was clean, well-structured, and easy to maintain.",
    rating: 5,
    projectType: "SaaS Dashboard",
  },
  {
    id: "test-2",
    name: "Marcus Rivera",
    role: "Startup Founder",
    company: "InnovateLab",
    content:
      "Working with Soruj was a game-changer for our startup. He transformed our design concepts into a stunning, responsive web application. His expertise in Next.js and TypeScript resulted in a highly performant product.",
    rating: 5,
    projectType: "E-commerce Platform",
  },
  {
    id: "test-3",
    name: "Elena Volkov",
    role: "Creative Director",
    company: "DesignStudio Pro",
    content:
      "Soruj has an incredible ability to bring designs to life with pixel-perfect accuracy. His implementation of complex animations using Framer Motion and GSAP added a layer of polish that truly set our project apart.",
    rating: 5,
    projectType: "Portfolio Website",
  },
  {
    id: "test-4",
    name: "David Park",
    role: "Engineering Lead",
    company: "CloudScale",
    content:
      "The component architecture Soruj built for us was enterprise-grade. His understanding of React patterns, state management, and performance optimization made our development process significantly more efficient.",
    rating: 5,
    projectType: "Enterprise Application",
  },
  {
    id: "test-5",
    name: "Aisha Patel",
    role: "Marketing Director",
    company: "GrowthHub",
    content:
      "Soruj's work on our landing pages resulted in a 40% improvement in conversion rates. His focus on performance, accessibility, and responsive design ensured every visitor had an optimal experience.",
    rating: 5,
    projectType: "Landing Page",
  },
];

"use client";
import SectionTitle from "@/components/shared/SectionTitle";
import FresherMilestoneTimeline, { type Milestone } from "./FresherMilestoneTimeline";
import { usePortfolioSettings } from "@/hooks/usePortfolioSettings";

const defaultMilestones: Milestone[] = [
  {
    id: "ecommerce-platform",
    type: "project",
    title: "Full-Stack E-Commerce Platform",
    description:
      "Built a complete e-commerce platform with Next.js, including product management, cart functionality, Stripe payment integration, and an admin dashboard with analytics.",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe", "Tailwind CSS"],
    outcome:
      "Successfully deployed to production with 500+ registered users and 50+ completed transactions in the first month. Achieved 95+ Lighthouse performance score.",
    lessons: [
      "Learned to design scalable database schemas for complex relational data",
      "Understood payment gateway integration and webhook handling",
      "Gained experience with server-side rendering and API route optimization",
    ],
    date: "2025-06",
    link: "https://github.com/yourusername/ecommerce",
  },
  {
    id: "react-component-lib",
    type: "opensource",
    title: "React Component Library — 500+ GitHub Stars",
    description:
      "Created and published an open-source React component library featuring 30+ accessible UI components with full TypeScript support, Storybook documentation, and automated CI/CD.",
    technologies: ["React", "TypeScript", "Storybook", "Rollup", "Testing Library", "GitHub Actions"],
    outcome:
      "500+ stars on GitHub, 2k+ weekly npm downloads, 15+ community contributors, and used by several production applications.",
    lessons: [
      "Mastered component design patterns and composition in React",
      "Learned publishing workflows with npm, semantic versioning, and changelogs",
      "Gained experience maintaining open-source projects and reviewing PRs",
    ],
    date: "2025-03",
    link: "https://github.com/yourusername/ui-lib",
  },
  {
    id: "real-time-collab",
    type: "project",
    title: "Real-Time Collaborative Whiteboard",
    description:
      "Developed a real-time collaborative whiteboard application with WebSocket-based sync, drawing tools, sticky notes, and multi-user cursors. Features undo/redo and export to PNG.",
    technologies: ["React", "Socket.io", "Canvas API", "Node.js", "Redis", "Docker"],
    outcome:
      "Supports 10+ concurrent users with sub-50ms latency. Used as a teaching tool in a university workshop with 60+ participants.",
    lessons: [
      "Deep understanding of WebSocket protocols and state synchronization",
      "Learned Canvas API optimization for smooth drawing at 60fps",
      "Gained experience with Docker containerization and deployment",
    ],
    date: "2025-01",
    link: "https://github.com/yourusername/whiteboard",
  },
  {
    id: "state-mgmt-course",
    type: "learning",
    title: "Zustand & Jotai Deep Dive — Published Course Notes",
    description:
      "Studied advanced state management patterns in React, compiled comprehensive notes, and published a guide comparing Zustand, Jotai, and Redux Toolkit with real-world examples.",
    technologies: ["React", "Zustand", "Jotai", "Redux Toolkit", "TypeScript"],
    outcome:
      "Published guide received 100+ upvotes on dev.to and featured in the React Newsletter. Solidified understanding of state management architecture.",
    lessons: [
      "Understood the trade-offs between atomic, flux, and context-based state management",
      "Learned to architect state layers for scalability and testability",
    ],
    date: "2024-10",
  },
  {
    id: "freelance-landing",
    type: "freelance",
    title: "Landing Page for SaaS Startup",
    description:
      "Designed and developed a high-conversion landing page for a B2B SaaS startup. Implemented A/B testing, analytics tracking, and animated illustrations for engagement.",
    technologies: ["Next.js", "Framer Motion", "Vercel Analytics", "PostHog", "Tailwind CSS"],
    outcome:
      "30% increase in sign-up conversion rate over previous version. Client reported positive feedback from investors on the professional design.",
    lessons: [
      "Learned to balance client requirements with UX best practices",
      "Gained experience with A/B testing frameworks and conversion analytics",
      "Developed client communication and project scoping skills",
    ],
    date: "2024-08",
  },
  {
    id: "hackathon-ai",
    type: "hackathon",
    title: "Hackathon Winner — AI-Powered Study Assistant",
    description:
      "Built an AI-powered study assistant that generates flashcards, quizzes, and summaries from lecture notes. Won 'Best Overall' at a 48-hour university hackathon with 200+ participants.",
    technologies: ["Next.js", "OpenAI API", "LangChain", "PostgreSQL", "Tailwind CSS"],
    outcome:
      "First place out of 40+ teams. Featured on the university's tech blog. Continued development post-hackathon with 100+ active users.",
    lessons: [
      "Learned to rapidly prototype and validate ideas under time constraints",
      "Gained hands-on experience with LLM APIs and prompt engineering",
      "Understood the importance of presentation and demo preparation",
    ],
    date: "2024-05",
    link: "https://devpost.com/your-project",
  },
  {
    id: "cs50-cert",
    type: "achievement",
    title: "CS50x — Harvard's Introduction to Computer Science",
    description:
      "Completed Harvard's CS50x, covering algorithms, data structures, memory management, web development, and cybersecurity. Solved all problem sets and final project.",
    technologies: ["C", "Python", "SQL", "HTML/CSS", "JavaScript", "Flask"],
    outcome:
      "Earned verified certificate. Built a final project — a CLI task manager in C — that passed all automated tests with 100% score.",
    lessons: [
      "Built strong foundations in algorithms and computational thinking",
      "Learned to write memory-efficient C programs with manual memory management",
      "Developed problem-solving skills through rigorous weekly problem sets",
    ],
    date: "2024-02",
  },
  {
    id: "typescript-migration",
    type: "opensource",
    title: "Contributed TypeScript Migrations to 3 Open Source Projects",
    description:
      "Contributed to migrating JavaScript codebases to TypeScript for open-source projects. Added type definitions, fixed type errors, and improved documentation.",
    technologies: ["TypeScript", "Node.js", "JSDoc", "dts-gen"],
    outcome:
      "14 merged PRs across 3 projects. One project maintainer offered a maintainer role. Gained recognition in the community.",
    lessons: [
      "Mastered advanced TypeScript features like conditional types and mapped types",
      "Learned to navigate and contribute to large unfamiliar codebases",
      "Understood the importance of incremental migration strategies",
    ],
    date: "2023-12",
    link: "https://github.com/yourusername/contributions",
  },
];

interface FresherExperienceSectionProps {
  milestones?: Milestone[];
}

export default function FresherExperienceSection({ milestones }: FresherExperienceSectionProps) {
  const { settings, loading } = usePortfolioSettings();
  const hasExistingExperience = settings?.experiences && settings.experiences.length > 0;

  if (hasExistingExperience && !milestones) {
    return null;
  }

  const data = milestones || defaultMilestones;

  return (
    <section
      id="experience"
      className="min-h-screen py-20 md:py-32 relative overflow-hidden scroll-mt-20 sm:scroll-mt-28"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionTitle
          title="My Journey"
          subtitle="Projects, contributions, and milestones that shaped my skills as a developer."
        />

        <div className="mt-12 sm:mt-16 max-w-3xl mx-auto">
          <FresherMilestoneTimeline milestones={data} />
        </div>
      </div>
    </section>
  );
}

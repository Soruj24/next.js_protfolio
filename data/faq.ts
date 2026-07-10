export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const faqItems: FAQItem[] = [
  {
    id: "faq-1",
    question: "What technologies do you specialize in?",
    answer:
      "I specialize in the React ecosystem including React.js, Next.js (App Router), and TypeScript. For styling, I use Tailwind CSS and shadcn/ui. For animations, I work with Framer Motion and GSAP. I also have experience with Redux Toolkit for state management, MongoDB for databases, and various API integration patterns.",
    category: "Technical",
  },
  {
    id: "faq-2",
    question: "What is your development process?",
    answer:
      "My process follows a structured approach: I start by understanding the project requirements and target audience, then create a scalable architecture. I implement using server components where possible, write strict TypeScript, follow the Single Responsibility Principle, and ensure every component is accessible and performant. I use feature-based architecture for larger applications.",
    category: "Process",
  },
  {
    id: "faq-3",
    question: "Do you work with design systems?",
    answer:
      "Absolutely. I build and maintain design systems using shadcn/ui as a foundation, extending them with custom components that match the brand identity. I ensure consistency in typography, spacing, color, and interaction patterns across the entire application.",
    category: "Design",
  },
  {
    id: "faq-4",
    question: "How do you ensure performance and accessibility?",
    answer:
      "I optimize for Core Web Vitals from the start. This includes using Server Components, implementing code splitting, optimizing images with next/image, minimizing bundle sizes, and ensuring Lighthouse scores above 95. For accessibility, I follow WCAG 2.1 AA standards with proper semantic HTML, ARIA labels, keyboard navigation, and focus management.",
    category: "Performance",
  },
  {
    id: "faq-5",
    question: "Are you available for freelance projects?",
    answer:
      "Yes, I am available for freelance and contract work. I am particularly interested in projects that involve complex UI challenges, performance optimization, or building scalable frontend architectures. Feel free to reach out through the contact form to discuss your project.",
    category: "Availability",
  },
  {
    id: "faq-6",
    question: "What makes your code different?",
    answer:
      "I write production-grade code that scales. Every component follows the Single Responsibility Principle, uses strict TypeScript typing, includes proper error boundaries, and is built for maintainability. I avoid shortcuts, write self-documenting code, and ensure consistent naming conventions throughout the codebase.",
    category: "Technical",
  },
];

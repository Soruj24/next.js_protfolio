import type { ResumeData } from "@/types/resume";

export const resumeData: ResumeData = {
  personalInfo: {
    name: "Soruj Mahmud",
    title: "Front-End Developer",
    email: "sorujahmudb2h@email.com",
    phone: "01795397598",
    location: "Dhaka, Bangladesh",
    links: [
      {
        label: "linkedin.com/in/soruj-mahmud",
        url: "https://www.linkedin.com/in/soruj-mahmud-ab9388298/",
      },
      { label: "github.com/Soruj24", url: "https://github.com/Soruj24" },
      {
        label: "sorujahmud.dev",
        url: "https://next-js-protfolio-zeta.vercel.app/",
      },
    ],
  },
  summary:
    "Enthusiastic and detail-oriented Front-End Developer with a strong foundation in modern JavaScript frameworks, responsive web design, and UI/UX principles. Passionate about crafting clean, efficient, and accessible code to build highly interactive user interfaces. Proven ability to translate complex design wireframes into functional web applications through academic projects and independent software building. Quick learner who stays updated on evolving web standards and thrives in collaborative team environments.",
  skills: [
    { label: "Languages", items: "JavaScript (ES6+), TypeScript, HTML5, CSS3, SQL" },
    { label: "Frameworks & Libs", items: "React.js, Next.js, Node.js, Express, Redux Toolkit" },
    { label: "UI & Styling", items: "Tailwind CSS, Material UI, CSS Modules, Responsive Web Design" },
    { label: "Tools & Workflows", items: "Git, GitHub, REST APIs, Webpack, Vite, npm/yarn, Postman" },
  ],
  projects: [
    {
      title: "AI-Powered Search & Discovery Interface Redesign",
      type: "Independent Project",
      bullets: [
        "Architected and implemented a high-performance web interface inspired by modern conversational AI platforms using Next.js and TypeScript.",
        "Leveraged Tailwind CSS to craft a fully responsive, semantic layout that improved mobile user navigation fluidity.",
        "Integrated modular state-management patterns to handle dynamic search results and complex user preference states flawlessly.",
        "Optimized rendering cycles and asset delivery, resulting in a 25% improvement in initial page-load performance metrics.",
      ],
      technologies: "Next.js, React, TypeScript, Tailwind CSS, Git",
      liveUrl: "https://next-js-protfolio-zeta.vercel.app/",
    },
    {
      title: "Interactive E-Commerce Dashboard",
      type: "Academic Capstone",
      bullets: [
        "Developed a responsive admin dashboard featuring multi-axis analytical charts, complex data filtering, and product inventory tracking tables.",
        "Consumed RESTful endpoints asynchronously using Axios and handled complex state transformations using Redux Toolkit.",
        "Ensured strict compliance with cross-browser compatibility and accessibility guidelines (WCAG 2.1 AA).",
      ],
      technologies: "React.js, Redux Toolkit, Chart.js, CSS Modules, REST API",
      liveUrl: "https://next-js-protfolio-zeta.vercel.app/",
    },
  ],
  education: [
    {
      degree: "Non-Traditional Bachelor of Science in Computer Science",
      school: "Dhaka Golden College of Science",
      coursework: "Relevant Coursework: Web Application Development",
    },
  ],
};

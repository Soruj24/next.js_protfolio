import type { ResumeData } from "@/types/resume";

export const resumeData: ResumeData = {
  personalInfo: {
    name: "Soruj Mahmud",
    title: "Frontend Developer | React.js | Next.js | TypeScript",
    email: "sorujmahmudb2h@gmail.com",
    phone: "+8801795397598",
    location: "Tangail, Dhaka, Bangladesh",
    links: [
      {
        label: "linkedin.com/in/soruj-mahmud",
        url: "https://www.linkedin.com/in/soruj-mahmud-ab9388298/",
      },
      {
        label: "github.com/Soruj24",
        url: "https://github.com/Soruj24",
      },
      {
        label: "Portfolio",
        url: "https://next-js-protfolio-zeta.vercel.app/",
      },
    ],
  },

  summary:
    "Self-taught Frontend Developer with strong expertise in React.js, Next.js, TypeScript, Redux Toolkit, and Tailwind CSS. Passionate about building responsive, accessible, and high-performance web applications. Experienced in developing real-world projects including e-commerce platforms, portfolio websites, and AI-powered applications. Skilled in modern frontend architecture, API integration, state management, and UI/UX best practices.",

  skills: [
    {
      label: "Languages",
      items: "JavaScript (ES6+), TypeScript, HTML5, CSS3",
    },
    {
      label: "Frontend",
      items: "React.js, Next.js, Redux Toolkit, RTK Query, Context API",
    },
    {
      label: "Styling",
      items:
        "Tailwind CSS, Shadcn UI, Material UI, CSS Modules, Responsive Design",
    },
    {
      label: "Tools",
      items: "Git, GitHub, Postman, Vite, npm, REST APIs, Axios",
    },
  ],

  projects: [
    {
      title: "Grocery Shop E-Commerce Platform",
      type: "Personal Project",
      bullets: [
        "Built a modern e-commerce application using Next.js, TypeScript, Redux Toolkit, and Tailwind CSS.",
        "Implemented product browsing, filtering, shopping cart functionality, and responsive layouts.",
        "Integrated API-driven product management and optimized application performance.",
        "Designed reusable UI components following modern frontend development practices.",
      ],
      technologies: "Next.js, React, TypeScript, Redux Toolkit, Tailwind CSS",
      liveUrl: "https://grocery-shop-two-flax.vercel.app",
    },
    {
      title: "Next.js Portfolio Website",
      type: "Personal Project",
      bullets: [
        "Developed a responsive portfolio website showcasing projects, skills, and experience.",
        "Implemented smooth animations using Framer Motion and GSAP.",
        "Focused on accessibility, SEO optimization, and responsive design.",
        "Created reusable components and clean project architecture.",
      ],
      technologies:
        "Next.js, React, TypeScript, Tailwind CSS, Framer Motion, GSAP",
      liveUrl: "https://next-js-protfolio-zeta.vercel.app/",
    },
    {
      title: "Voice into Flawless Text",
      type: "Personal Project",
      bullets: [
        "Developed an AI-powered speech-to-text application.",
        "Implemented real-time voice recognition and text processing.",
        "Created a responsive and user-friendly interface using React and Tailwind CSS.",
        "Focused on performance optimization and accessibility.",
      ],
      technologies: "React, TypeScript, Tailwind CSS, Express.js",
      liveUrl:
        "https://vicse-to-text-hmcsqguh7-soruj-mahmuds-projects.vercel.app/",
    },
  ],

  education: [
    {
      degree: "Higher Secondary Certificate (Science)",
      school: "Dhaka Golden College of Science",
      coursework:
        "Self-Learning: React.js, Next.js, TypeScript, Redux Toolkit, Tailwind CSS, REST APIs, Git & GitHub",
    },
  ],
};

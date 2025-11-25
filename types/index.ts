export interface SectionTitleProps {
  title: string;
  subtitle: string;
}

export interface NavItemProps {
  item: {
    id: string;
    label: string;
    icon: string;
  };
  isActive: boolean;
  onClick: () => void;
  onHover: (element: HTMLElement) => void;
}

export interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export interface StatCardProps {
  stat: {
    number: string;
    label: string;
    color: string;
  };
  index: number;
}

export interface TechChipProps {
  tech: string;
  index: number;
}

export interface IProject {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  technologies: string[];
  features: string[];
  githubUrl: string;
  liveUrl: string;
  category: "AI" | "Fullstack" | "Mobile" | "Frontend" | "Backend" | "Blockchain" | "IOT";
  status: "completed" | "in-progress";
  screenshots: string[];
  challenges: string[];
  solutions: string[];
  featured: boolean;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: string;
  teamSize: string;
  completionDate: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  emoji: string;
  stats: {
    completionTime: string;
    teamSize: string;
    complexity: string;
    views: number;
    likes: number;
  };
  architecture: string;
  developmentHighlights: {
    title: string;
    description: string;
  }[];
  lessonsLearned: string[];
  futureImprovements: string[];
  metaDescription: string;
  seoTitle: string;
  performance: {
    loadTime: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
}

export interface ProjectCardProps {
  project: IProject;
  index: number;
}

export interface ContactInfoProps {
  contact: {
    icon: string;
    label: string;
    value: string;
    link: string;
  };
  index: number;
}

export interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  originalSize: number;
  update: () => void;
  draw: () => void;
}
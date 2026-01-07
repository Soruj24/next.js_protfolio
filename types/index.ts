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

import { IProject } from "@/models/Project";
export type { IProject };

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
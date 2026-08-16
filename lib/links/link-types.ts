export type LinkType =
  | "github"
  | "linkedin"
  | "twitter"
  | "facebook"
  | "youtube"
  | "discord"
  | "portfolio"
  | "email"
  | "phone"
  | "project-demo"
  | "project-source"
  | "blog"
  | "certificate"
  | "resume"
  | "social"
  | "documentation"
  | "other";

export type LinkCategory = "social" | "project" | "contact" | "resource" | "navigation";

export type LinkHealthStatus = "working" | "redirect" | "broken" | "unchecked";

export interface LinkHealth {
  lastCheckedAt: string | null;
  status: LinkHealthStatus;
  statusCode: number | null;
  responseTime: number | null;
  errorMessage: string | null;
}

export interface LinkData {
  _id: string;
  label: string;
  url: string;
  type: LinkType;
  category: LinkCategory;
  icon: string;
  isActive: boolean;
  isExternal: boolean;
  openInNewTab: boolean;
  displayOrder: number;
  health: LinkHealth;
  clickCount: number;
  lastClickedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLinkInput {
  label: string;
  url: string;
  type: LinkType;
  category: LinkCategory;
  icon?: string;
  isActive?: boolean;
  isExternal?: boolean;
  openInNewTab?: boolean;
  displayOrder?: number;
}

export interface UpdateLinkInput extends Partial<CreateLinkInput> {}

export interface LinkHealthSummary {
  total: number;
  active: number;
  broken: number;
  redirect: number;
  unchecked: number;
  lastCheckedAt: string | null;
  avgResponseTime: number | null;
}

export const LINK_TYPE_LABELS: Record<LinkType, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  twitter: "Twitter / X",
  facebook: "Facebook",
  youtube: "YouTube",
  discord: "Discord",
  portfolio: "Portfolio",
  email: "Email",
  phone: "Phone",
  "project-demo": "Project Demo",
  "project-source": "Project Source",
  blog: "Blog",
  certificate: "Certificate",
  resume: "Resume",
  social: "Social",
  documentation: "Documentation",
  other: "Other",
};

export const LINK_CATEGORY_LABELS: Record<LinkCategory, string> = {
  social: "Social Media",
  project: "Project",
  contact: "Contact",
  resource: "Resource",
  navigation: "Navigation",
};

export const LINK_TYPE_ICONS: Record<LinkType, string> = {
  github: "github",
  linkedin: "linkedin",
  twitter: "twitter",
  facebook: "facebook",
  youtube: "youtube",
  discord: "discord",
  portfolio: "globe",
  email: "mail",
  phone: "phone",
  "project-demo": "external-link",
  "project-source": "code",
  blog: "file-text",
  certificate: "award",
  resume: "download",
  social: "share-2",
  documentation: "book-open",
  other: "link",
};

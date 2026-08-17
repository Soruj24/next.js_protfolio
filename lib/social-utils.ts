export type SocialLink = {
  label: string;
  href: string;
};

type RawSocialLink = {
  platform?: string;
  url?: string;
  username?: string;
  visible?: boolean;
};

const PLATFORM_LABELS: Record<string, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  twitter: "Twitter",
  "twitter/x": "Twitter / X",
  facebook: "Facebook",
  youtube: "YouTube",
  instagram: "Instagram",
  website: "Website",
  portfolio: "Portfolio",
  email: "Email",
  discord: "Discord",
  telegram: "Telegram",
  dribbble: "Dribbble",
  behance: "Behance",
  figma: "Figma",
  codepen: "CodePen",
  "stack overflow": "Stack Overflow",
  "dev.to": "Dev.to",
  hashnode: "Hashnode",
  medium: "Medium",
  other: "Other",
};

export const ALLOWED_PROTOCOLS = ["https:", "http:", "mailto:", "tel:"];

export function isValidSocialUrl(url: string): boolean {
  if (!url || typeof url !== "string") return false;

  const trimmed = url.trim();
  if (trimmed === "") return false;
  if (trimmed === "#") return false;
  if (trimmed === "javascript:void(0)") return false;
  if (trimmed === "undefined") return false;
  if (trimmed === "null") return false;
  if (trimmed === "yourusername") return false;
  if (trimmed === "example.com") return false;

  try {
    if (trimmed.startsWith("mailto:") || trimmed.startsWith("tel:")) {
      const value = trimmed.split(":")[1];
      return value.length > 0 && value.includes("@");
    }

    const urlObj = new URL(trimmed);
    return ALLOWED_PROTOCOLS.includes(urlObj.protocol);
  } catch {
    return false;
  }
}

export function getPlatformLabel(platform: string): string {
  if (!platform) return "";
  const key = platform.toLowerCase().trim();
  return PLATFORM_LABELS[key] || platform;
}

export function normalizeSocialLinks(rawLinks: RawSocialLink[]): SocialLink[] {
  if (!Array.isArray(rawLinks)) return [];

  const seen = new Set<string>();

  return rawLinks
    .filter((link) => {
      if (!link.visible) return false;

      const url = (link.url || "").trim();
      const platform = (link.platform || "").trim();

      if (!isValidSocialUrl(url)) return false;
      if (!platform) return false;

      const key = `${platform.toLowerCase()}:${url.toLowerCase()}`;
      if (seen.has(key)) return false;
      seen.add(key);

      return true;
    })
    .map((link) => {
      const platform = (link.platform || "").trim();
      const url = (link.url || "").trim();
      const isEmail = platform.toLowerCase() === "email";

      return {
        label: getPlatformLabel(platform),
        href: isEmail && !url.startsWith("mailto:") ? `mailto:${url}` : url,
      };
    });
}

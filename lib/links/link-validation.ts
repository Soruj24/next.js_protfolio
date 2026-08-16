import type { LinkType, CreateLinkInput } from "./link-types";

const ALLOWED_PROTOCOLS = ["https://", "http://", "mailto:", "tel:"];
const BLOCKED_PROTOCOLS = ["javascript:", "data:", "vbscript:", "file:"];

export interface ValidationResult {
  valid: boolean;
  error: string | null;
  normalizedUrl: string | null;
}

export function validateUrl(url: string): ValidationResult {
  const trimmed = url.trim();

  if (!trimmed) {
    return { valid: false, error: "URL is required", normalizedUrl: null };
  }

  if (trimmed.includes(" ")) {
    return { valid: false, error: "URL must not contain spaces", normalizedUrl: null };
  }

  const lower = trimmed.toLowerCase();

  for (const blocked of BLOCKED_PROTOCOLS) {
    if (lower.startsWith(blocked)) {
      return { valid: false, error: `Protocol "${blocked}" is not allowed`, normalizedUrl: null };
    }
  }

  if (lower.startsWith("mailto:")) {
    const email = trimmed.slice(7);
    if (!email || !email.includes("@")) {
      return { valid: false, error: "Invalid email address", normalizedUrl: null };
    }
    return { valid: true, error: null, normalizedUrl: `mailto:${email}` };
  }

  if (lower.startsWith("tel:")) {
    const phone = trimmed.slice(4);
    if (!phone || !/^\+?[\d\s\-()]+$/.test(phone)) {
      return { valid: false, error: "Invalid phone number", normalizedUrl: null };
    }
    return { valid: true, error: null, normalizedUrl: `tel:${phone.replace(/\s/g, "")}` };
  }

  if (!lower.startsWith("https://") && !lower.startsWith("http://")) {
    return { valid: false, error: "URL must start with https://, http://, mailto:, or tel:", normalizedUrl: null };
  }

  try {
    new URL(trimmed);
  } catch {
    return { valid: false, error: "Invalid URL format", normalizedUrl: null };
  }

  const normalized = trimmed.startsWith("http://") && !trimmed.startsWith("http://localhost")
    ? "https://" + trimmed.slice(7)
    : trimmed;

  return { valid: true, error: null, normalizedUrl: normalized };
}

export function validateLinkInput(input: CreateLinkInput): string[] {
  const errors: string[] = [];

  if (!input.label || input.label.trim().length === 0) {
    errors.push("Label is required");
  } else if (input.label.length > 100) {
    errors.push("Label must be 100 characters or less");
  }

  const urlResult = validateUrl(input.url);
  if (!urlResult.valid) {
    errors.push(urlResult.error!);
  }

  if (!input.type) {
    errors.push("Link type is required");
  }

  if (!input.category) {
    errors.push("Category is required");
  }

  return errors;
}

export function isExternalUrl(url: string): boolean {
  const lower = url.toLowerCase();
  if (lower.startsWith("mailto:") || lower.startsWith("tel:")) return false;
  if (url.startsWith("/")) return false;
  return true;
}

export function isNewTabRecommended(url: string): boolean {
  return isExternalUrl(url);
}

export function sanitizeUrl(url: string): string {
  return url.trim().replace(/\s+/g, "");
}

export function getProtocolType(url: string): LinkType | null {
  const lower = url.toLowerCase();
  if (lower.startsWith("mailto:")) return "email";
  if (lower.startsWith("tel:")) return "phone";
  return null;
}

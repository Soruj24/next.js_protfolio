"use client";

import { useState, useEffect, useCallback } from "react";
import { normalizeSocialLinks, type SocialLink } from "@/lib/social-utils";

export type { SocialLink };

export interface PortfolioSettings {
  personal_info: {
    full_name: string;
    email: string;
    phone: string;
    location: string;
    professional_title: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
  profile: {
    avatar: string;
    bio: string;
    tagline: string;
    availability: string;
    response_time: string;
  };
  social_links: {
    platform: string;
    url: string;
    username: string;
    visible: boolean;
  }[];
  socials: SocialLink[];
  experience: {
    professional_experience: string;
  };
  technical_skills: {
    specializations: string[];
    core_technologies: string[];
  };
  hero_typing_roles: string[];
  nav_items: {
    id: string;
    label: string;
    icon: string;
    visible: boolean;
  }[];
  services: {
    id: string;
    title: string;
    description: string;
    features: string[];
    gradient: string;
  }[];
  faqs: {
    question: string;
    answer: string;
    category: string;
  }[];
  experiences: {
    role: string;
    company: string;
    year: string;
    description: string;
    technologies: string[];
  }[];
  education: {
    background: string;
    additional_info: string;
  };
  educations: {
    degree: string;
    institution: string;
    period: string;
    description?: string;
  }[];
  testimonials: {
    name: string;
    role: string;
    content: string;
    avatar?: string;
    color?: string;
  }[];
  standards: {
    title: string;
    description: string;
    icon: string;
    metrics?: string;
    features: string[];
  }[];
}

function withNormalizedSocials(raw: PortfolioSettings): PortfolioSettings {
  const socials = normalizeSocialLinks(raw.social_links || []);
  return { ...raw, socials };
}

let cachedSettings: PortfolioSettings | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 60000;

export function usePortfolioSettings() {
  const [settings, setSettings] = useState<PortfolioSettings | null>(
    cachedSettings ? withNormalizedSocials(cachedSettings) : null
  );
  const [loading, setLoading] = useState(!cachedSettings);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = useCallback(async () => {
    if (cachedSettings && Date.now() - cacheTimestamp < CACHE_TTL) {
      setSettings(withNormalizedSocials(cachedSettings));
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/portfolio");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      cachedSettings = data.settings;
      cacheTimestamp = Date.now();
      setSettings(withNormalizedSocials(data.settings));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return { settings, loading, error, refetch: fetchSettings };
}

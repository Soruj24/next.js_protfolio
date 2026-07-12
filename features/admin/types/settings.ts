export type SettingsSection =
  | "profile"
  | "portfolio"
  | "seo"
  | "social"
  | "appearance"
  | "notifications"
  | "security"
  | "data"
  | "content";

export interface SettingsState {
  profile: {
    avatar: string;
    bio: string;
    tagline: string;
    availability: "available" | "busy" | "unavailable";
    hourly_rate: string;
    currency: string;
    response_time: string;
  };
  personal_info: {
    full_name: string;
    email: string;
    phone: string;
    location: string;
    professional_title: string;
    linkedin: string;
    github: string;
    twitter: string;
    website: string;
  };
  portfolio: {
    title: string;
    description: string;
    keywords: string[];
    favicon: string;
    og_image: string;
    primary_color: string;
    accent_color: string;
  };
  seo: {
    meta_title: string;
    meta_description: string;
    meta_keywords: string[];
    og_title: string;
    og_description: string;
    og_image: string;
    twitter_card: "summary" | "summary_large_image";
    robots: string;
    canonical_url: string;
    google_analytics_id: string;
  };
  social_links: {
    platform: string;
    url: string;
    username: string;
    visible: boolean;
  }[];
  theme: {
    mode: "dark" | "light" | "system";
    primary_color: string;
    accent_color: string;
    font_family: string;
    border_radius: string;
    animations_enabled: boolean;
    compact_mode: boolean;
    glassmorphism: boolean;
    gradient_background: boolean;
  };
  security: {
    two_factor_enabled: boolean;
    session_timeout: number;
    login_notifications: boolean;
    last_password_change: string | null;
    api_keys: {
      id: string;
      name: string;
      key: string;
      created: string;
      last_used: string;
      active: boolean;
    }[];
  };
  notifications: {
    email_notifications: boolean;
    contact_form_alerts: boolean;
    weekly_report: boolean;
    security_alerts: boolean;
    project_updates: boolean;
    marketing_emails: boolean;
    sound_enabled: boolean;
    desktop_notifications: boolean;
  };
  language: {
    primary: string;
    timezone: string;
    date_format: string;
    time_format: "12h" | "24h";
  };
  data: {
    autosave_enabled: boolean;
    autosave_interval: number;
    last_backup: string | null;
    backup_frequency: "daily" | "weekly" | "monthly" | "never";
    retention_days: number;
  };
}

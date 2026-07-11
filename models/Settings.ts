import mongoose, { Schema, Document } from "mongoose";

export interface ISettings extends Document {
  assistant: {
    name: string;
    purpose: string;
    contact_recommendation: string;
  };
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
    availability: "available" | "busy" | "unavailable";
    hourly_rate: string;
    currency: string;
    response_time: string;
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
    last_password_change: Date;
    api_keys: {
      id: string;
      name: string;
      key: string;
      created: Date;
      last_used: Date;
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
    last_backup: Date;
    backup_frequency: "daily" | "weekly" | "monthly" | "never";
    retention_days: number;
  };
  technical_skills: {
    specializations: string[];
    core_technologies: string[];
  };
  experience: {
    professional_experience: string;
    project_experience: string;
    focus: string;
  };
  education: {
    background: string;
    additional_info: string;
  };
  experiences: {
    year: string;
    role: string;
    company: string;
    description: string;
    technologies: string[];
  }[];
  response_guidelines: {
    be_concise: boolean;
    be_informative: boolean;
    professional_tone: boolean;
    redirect_uncertain_queries: string;
    language: string;
  };
  innovation: {
    title: string;
    description: string;
    icon: string;
    color: string;
  }[];
  expertise: {
    title: string;
    description: string;
    icon: string;
    skills: string[];
    color: string;
  }[];
  standards: {
    title: string;
    description: string;
    icon: string;
    metrics: string;
    features: string[];
  }[];
  testimonials: {
    name: string;
    role: string;
    content: string;
    avatar: string;
    color: string;
  }[];
  case_studies: {
    title: string;
    description: string;
    challenge: string;
    solution: string;
    impact: string;
    technologies: string[];
    image: string;
  }[];
}

const SettingsSchema = new Schema<ISettings>(
  {
    assistant: {
      name: String,
      purpose: String,
      contact_recommendation: String,
    },
    personal_info: {
      full_name: String,
      email: String,
      phone: String,
      location: String,
      professional_title: String,
      linkedin: String,
      github: String,
      twitter: String,
      website: String,
    },
    profile: {
      avatar: { type: String, default: "" },
      bio: { type: String, default: "" },
      tagline: { type: String, default: "" },
      availability: { type: String, enum: ["available", "busy", "unavailable"], default: "available" },
      hourly_rate: { type: String, default: "" },
      currency: { type: String, default: "USD" },
      response_time: { type: String, default: "Within 24 hours" },
    },
    portfolio: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      keywords: { type: [String], default: [] },
      favicon: { type: String, default: "" },
      og_image: { type: String, default: "" },
      primary_color: { type: String, default: "#06b6d4" },
      accent_color: { type: String, default: "#8b5cf6" },
    },
    seo: {
      meta_title: { type: String, default: "" },
      meta_description: { type: String, default: "" },
      meta_keywords: { type: [String], default: [] },
      og_title: { type: String, default: "" },
      og_description: { type: String, default: "" },
      og_image: { type: String, default: "" },
      twitter_card: { type: String, enum: ["summary", "summary_large_image"], default: "summary_large_image" },
      robots: { type: String, default: "index, follow" },
      canonical_url: { type: String, default: "" },
      google_analytics_id: { type: String, default: "" },
    },
    social_links: [
      {
        platform: { type: String, default: "" },
        url: { type: String, default: "" },
        username: { type: String, default: "" },
        visible: { type: Boolean, default: true },
      },
    ],
    theme: {
      mode: { type: String, enum: ["dark", "light", "system"], default: "dark" },
      primary_color: { type: String, default: "#06b6d4" },
      accent_color: { type: String, default: "#8b5cf6" },
      font_family: { type: String, default: "Inter" },
      border_radius: { type: String, default: "0.5rem" },
      animations_enabled: { type: Boolean, default: true },
      compact_mode: { type: Boolean, default: false },
      glassmorphism: { type: Boolean, default: true },
      gradient_background: { type: Boolean, default: true },
    },
    security: {
      two_factor_enabled: { type: Boolean, default: false },
      session_timeout: { type: Number, default: 24 },
      login_notifications: { type: Boolean, default: true },
      last_password_change: { type: Date, default: null },
      api_keys: [
        {
          id: { type: String },
          name: { type: String },
          key: { type: String },
          created: { type: Date },
          last_used: { type: Date },
          active: { type: Boolean, default: true },
        },
      ],
    },
    notifications: {
      email_notifications: { type: Boolean, default: true },
      contact_form_alerts: { type: Boolean, default: true },
      weekly_report: { type: Boolean, default: false },
      security_alerts: { type: Boolean, default: true },
      project_updates: { type: Boolean, default: false },
      marketing_emails: { type: Boolean, default: false },
      sound_enabled: { type: Boolean, default: true },
      desktop_notifications: { type: Boolean, default: false },
    },
    language: {
      primary: { type: String, default: "en" },
      timezone: { type: String, default: "UTC" },
      date_format: { type: String, default: "MM/DD/YYYY" },
      time_format: { type: String, enum: ["12h", "24h"], default: "12h" },
    },
    data: {
      autosave_enabled: { type: Boolean, default: true },
      autosave_interval: { type: Number, default: 30 },
      last_backup: { type: Date, default: null },
      backup_frequency: { type: String, enum: ["daily", "weekly", "monthly", "never"], default: "weekly" },
      retention_days: { type: Number, default: 30 },
    },
    technical_skills: {
      specializations: [String],
      core_technologies: [String],
    },
    experience: {
      professional_experience: String,
      project_experience: String,
      focus: String,
    },
    education: {
      background: String,
      additional_info: String,
    },
    experiences: [
      {
        year: String,
        role: String,
        company: String,
        description: String,
        technologies: [String],
      },
    ],
    response_guidelines: {
      be_concise: Boolean,
      be_informative: Boolean,
      professional_tone: Boolean,
      redirect_uncertain_queries: String,
      language: String,
    },
    innovation: [
      {
        title: String,
        description: String,
        icon: String,
        color: String,
      },
    ],
    expertise: [
      {
        title: String,
        description: String,
        icon: String,
        skills: [String],
        color: String,
      },
    ],
    standards: [
      {
        title: String,
        description: String,
        icon: String,
        metrics: String,
        features: [String],
      },
    ],
    testimonials: [
      {
        name: String,
        role: String,
        content: String,
        avatar: String,
        color: String,
      },
    ],
    case_studies: [
      {
        title: String,
        description: String,
        challenge: String,
        solution: String,
        impact: String,
        technologies: [String],
        image: String,
      },
    ],
  },
  { timestamps: true, strict: false, minimize: false }
);

export const Settings =
  mongoose.models.Settings ||
  mongoose.model<ISettings>("Settings", SettingsSchema);

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
  { timestamps: true }
);

export const Settings =
  mongoose.models.Settings ||
  mongoose.model<ISettings>("Settings", SettingsSchema);

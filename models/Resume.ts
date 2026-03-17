import mongoose, { Schema, Document } from "mongoose";

// Interface for sub-documents
export interface IContact {
  email: string;
  phone: string;
  location: string;
}

export interface IExperience {
  role: string;
  company: string;
  duration: string;
  responsibilities: string[];
}

export interface IProject {
  title: string;
  description: string;
  technologies: string[];
}

export interface IEducation {
  institution: string;
  degree: string;
  year: string;
}

// Main Resume Interface
export interface IResume extends Document {
  name: string;
  title: string;
  contact: IContact;
  summary: string;
  experience: IExperience[];
  projects: IProject[];
  skills: string[];
  education: IEducation[];
}

// Mongoose Schemas
const ContactSchema = new Schema<IContact>({
  email: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
}, { _id: false });

const ExperienceSchema = new Schema<IExperience>({
  role: { type: String, required: true },
  company: { type: String, required: true },
  duration: { type: String, required: true },
  responsibilities: [{ type: String }],
}, { _id: false });

const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String }],
}, { _id: false });

const EducationSchema = new Schema<IEducation>({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  year: { type: String, required: true },
}, { _id: false });

const ResumeSchema = new Schema<IResume>({
  name: { type: String, required: true },
  title: { type: String, required: true },
  contact: ContactSchema,
  summary: { type: String, required: true },
  experience: [ExperienceSchema],
  projects: [ProjectSchema],
  skills: [{ type: String }],
  education: [EducationSchema],
});

export const Resume = mongoose.models.Resume || mongoose.model<IResume>("Resume", ResumeSchema);

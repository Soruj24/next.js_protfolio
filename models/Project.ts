// models/Project.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IDevelopmentHighlight {
  title: string;
  description: string;
}

export interface IPerformanceStats {
  loadTime: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
}

export interface IProjectStats {
  completionTime: string;
  teamSize: string;
  complexity: string;
  views: number;
  likes: number;
}

export interface IProject {
  _id?: string;
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  technologies: string[];
  features: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: 'AI' | 'Fullstack' | 'Mobile' | 'Frontend' | 'Backend' | 'Blockchain' | 'IOT';
  status: 'completed' | 'in-progress' | 'planned';
  screenshots: string[];
  challenges: string[];
  solutions: string[];
  featured: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  teamSize: string;
  completionDate: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
  tags: string[];
  emoji: string;
  stats: IProjectStats;
  architecture: string;
  developmentHighlights: IDevelopmentHighlight[];
  lessonsLearned: string[];
  futureImprovements: string[];
  metaDescription: string;
  seoTitle: string;
  performance: IPerformanceStats;
}

export interface IProjectDocument extends Omit<IProject, '_id'>, Document {
  _id: mongoose.Types.ObjectId;
}

const DevelopmentHighlightSchema = new Schema<IDevelopmentHighlight>({
  title: { type: String, required: true },
  description: { type: String, required: true }
}, { _id: false });

const PerformanceStatsSchema = new Schema<IPerformanceStats>({
  loadTime: { type: Number, required: true, min: 0, max: 100 },
  accessibility: { type: Number, required: true, min: 0, max: 100 },
  bestPractices: { type: Number, required: true, min: 0, max: 100 },
  seo: { type: Number, required: true, min: 0, max: 100 }
}, { _id: false });

const ProjectStatsSchema = new Schema<IProjectStats>({
  completionTime: { type: String, required: true },
  teamSize: { type: String, required: true },
  complexity: { type: String, required: true },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 }
}, { _id: false });

const ProjectSchema = new Schema<IProjectDocument>({
  id: { 
    type: String, 
    required: true, 
    unique: true,
    index: true 
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  fullDescription: { type: String, required: true },
  image: { type: String, required: true },
  technologies: [{ type: String, required: true }],
  features: [{ type: String, required: true }],
  githubUrl: { type: String },
  liveUrl: { type: String },
  category: { 
    type: String, 
    required: true,
    enum: ['AI', 'Fullstack', 'Mobile', 'Frontend'] 
  },
  status: { 
    type: String, 
    required: true,
    enum: ['completed', 'in-progress', 'planned'],
    default: 'completed'
  },
  screenshots: [{ type: String }],
  challenges: [{ type: String }],
  solutions: [{ type: String }],
  featured: { type: Boolean, default: false },
  difficulty: { 
    type: String, 
    required: true,
    enum: ['beginner', 'intermediate', 'advanced'] 
  },
  duration: { type: String, required: true },
  teamSize: { type: String, required: true },
  completionDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  tags: [{ type: String }],
  emoji: { type: String, required: true },
  stats: { type: ProjectStatsSchema, required: true },
  architecture: { type: String, required: true },
  developmentHighlights: [{ type: DevelopmentHighlightSchema }],
  lessonsLearned: [{ type: String }],
  futureImprovements: [{ type: String }],
  metaDescription: { type: String, required: true },
  seoTitle: { type: String, required: true },
  performance: { type: PerformanceStatsSchema, required: true }
}, {
  timestamps: true,
  collection: 'projects'
});

// Create indexes
ProjectSchema.index({ featured: 1, updatedAt: -1 });
ProjectSchema.index({ category: 1, status: 1 });
ProjectSchema.index({ tags: 1 });
ProjectSchema.index({ difficulty: 1 });

export const Project = mongoose.models.Project || mongoose.model<IProjectDocument>('Project', ProjectSchema);
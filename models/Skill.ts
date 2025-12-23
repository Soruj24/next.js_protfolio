// models/Skill.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ISkillItem {
  name: string;
  level: number;
  icon: string;
  color: string;
  description?: string;
}

export interface ISkillCategory {
  title: string;
  icon: string;
  skills: ISkillItem[];
}

export interface ISkillCategoryDocument extends ISkillCategory, Document {
  createdAt: Date;
  updatedAt: Date;
}

const SkillItemSchema = new Schema<ISkillItem>({
  name: { type: String, required: true },
  level: { type: Number, required: true, min: 0, max: 100 },
  icon: { type: String, required: true },
  color: { type: String, required: true },
  description: { type: String, default: '' }
}, { _id: false });

const SkillCategorySchema = new Schema<ISkillCategoryDocument>({
  title: { type: String, required: true },
  icon: { type: String, required: true },
  skills: { type: [SkillItemSchema], required: true }
}, {
  timestamps: true,
  collection: 'skill_categories'
});

export const SkillCategory = mongoose.models.SkillCategory || mongoose.model<ISkillCategoryDocument>('SkillCategory', SkillCategorySchema);
import mongoose, { Schema, Document } from "mongoose";

export interface IBlog {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  category: string;
  readTime: number;
  published: boolean;
  publishedAt?: Date;
  author: string;
  views: number;
  order: number;
}

export interface IBlogDocument extends IBlog, Document {
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlogDocument>(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, required: true, trim: true, maxlength: 500 },
    content: { type: String, required: true },
    coverImage: { type: String, default: "" },
    tags: { type: [String], default: [] },
    category: { type: String, default: "general", trim: true },
    readTime: { type: Number, default: 5, min: 1 },
    published: { type: Boolean, default: false },
    publishedAt: { type: Date, default: null },
    author: { type: String, required: true },
    views: { type: Number, default: 0, min: 0 },
    order: { type: Number, default: 0, min: 0 },
  },
  {
    timestamps: true,
    collection: "blogs",
  }
);

BlogSchema.index({ slug: 1 }, { unique: true });
BlogSchema.index({ published: 1, publishedAt: -1 });
BlogSchema.index({ tags: 1 });
BlogSchema.index({ category: 1 });
BlogSchema.index({ order: 1 });

export const Blog =
  mongoose.models.Blog ||
  mongoose.model<IBlogDocument>("Blog", BlogSchema);

import { Schema, model, models } from 'mongoose';

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required.'],
      trim: true,
      maxlength: [150, 'Title cannot be more than 150 characters.'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required.'],
      unique: true,
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Content is required.'],
    },
    author: {
      type: String,
      default: 'Admin',
    },
  },
  { timestamps: true }
);

export const Blog = models.Blog || model('Blog', blogSchema);

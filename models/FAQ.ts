import mongoose, { Schema, Document } from "mongoose";

export interface IFAQ {
  question: string;
  answer: string;
  category: string;
  order: number;
  active: boolean;
}

export interface IFAQDocument extends IFAQ, Document {
  createdAt: Date;
  updatedAt: Date;
}

const FAQSchema = new Schema<IFAQDocument>(
  {
    question: { type: String, required: true, trim: true, maxlength: 300 },
    answer: { type: String, required: true, trim: true, maxlength: 2000 },
    category: { type: String, default: "general", trim: true },
    order: { type: Number, default: 0, min: 0 },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    collection: "faqs",
  }
);

FAQSchema.index({ order: 1, active: 1 });
FAQSchema.index({ category: 1 });

export const FAQ =
  mongoose.models.FAQ ||
  mongoose.model<IFAQDocument>("FAQ", FAQSchema);

import mongoose, { Schema, Document } from "mongoose";

export interface IService {
  title: string;
  description: string;
  features: string[];
  gradient: string;
  icon: string;
  order: number;
  active: boolean;
}

export interface IServiceDocument extends IService, Document {
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IServiceDocument>(
  {
    title: { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, required: true, trim: true, maxlength: 500 },
    features: {
      type: [String],
      required: true,
      validate: {
        validator: (v: string[]) => v.length > 0 && v.length <= 10,
        message: "Features must have 1-10 items",
      },
    },
    gradient: {
      type: String,
      required: true,
      default: "from-cyan-500 to-blue-500",
      match: /^from-\w+-\d+\s+to-\w+-\d+$/,
    },
    icon: { type: String, default: "✦" },
    order: { type: Number, default: 0, min: 0 },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    collection: "services",
  }
);

ServiceSchema.index({ order: 1, active: 1 });
ServiceSchema.index({ title: 1 }, { unique: true });

export const Service =
  mongoose.models.Service ||
  mongoose.model<IServiceDocument>("Service", ServiceSchema);

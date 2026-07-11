import mongoose, { Schema, Document } from "mongoose";

export type ActivityType =
  | "project"
  | "blog"
  | "contact"
  | "security"
  | "system"
  | "analytics"
  | "github"
  | "deployment"
  | "profile";

export interface IActivity {
  _id?: string;
  title: string;
  description?: string;
  type: ActivityType;
  icon?: string;
  link?: string;
  read: boolean;
  metadata?: Record<string, unknown>;
  createdAt?: Date;
}

export interface IActivityDocument extends Omit<IActivity, "_id">, Document {}

const ActivitySchema = new Schema<IActivityDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    type: {
      type: String,
      enum: ["project", "blog", "contact", "security", "system", "analytics", "github", "deployment", "profile"],
      required: true,
    },
    icon: { type: String, default: "" },
    link: { type: String, default: "" },
    read: { type: Boolean, default: false },
    metadata: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true, collection: "activities" }
);

ActivitySchema.index({ createdAt: -1 });
ActivitySchema.index({ type: 1 });
ActivitySchema.index({ read: 1, createdAt: -1 });

export const Activity =
  mongoose.models.Activity ||
  mongoose.model<IActivityDocument>("Activity", ActivitySchema);

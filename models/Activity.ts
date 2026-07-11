import mongoose, { Schema, Document } from "mongoose";

export interface IActivity {
  _id?: string;
  title: string;
  description?: string;
  type: "profile" | "security" | "system" | "project" | "contact";
  icon?: string;
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
      enum: ["profile", "security", "system", "project", "contact"],
      required: true,
    },
    icon: { type: String, default: "" },
    metadata: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true, collection: "activities" }
);

ActivitySchema.index({ createdAt: -1 });
ActivitySchema.index({ type: 1 });

export const Activity =
  mongoose.models.Activity ||
  mongoose.model<IActivityDocument>("Activity", ActivitySchema);

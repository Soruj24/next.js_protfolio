import mongoose, { Schema, Document } from "mongoose";

export interface IAnalyticsEvent {
  _id?: string;
  event: "page_view" | "project_view" | "like" | "contact_submit" | "resume_download" | "github_click";
  page?: string;
  projectId?: string;
  referrer?: string;
  userAgent?: string;
  country?: string;
  device?: string;
  browser?: string;
  os?: string;
  createdAt?: Date;
}

export interface IAnalyticsEventDocument extends Omit<IAnalyticsEvent, "_id">, Document {}

const AnalyticsEventSchema = new Schema<IAnalyticsEventDocument>(
  {
    event: {
      type: String,
      enum: ["page_view", "project_view", "like", "contact_submit", "resume_download", "github_click"],
      required: true,
    },
    page: { type: String, default: "/" },
    projectId: { type: String },
    referrer: { type: String, default: "" },
    userAgent: { type: String, default: "" },
    country: { type: String, default: "" },
    device: { type: String, default: "unknown" },
    browser: { type: String, default: "unknown" },
    os: { type: String, default: "unknown" },
  },
  { timestamps: true, collection: "analytics_events" }
);

AnalyticsEventSchema.index({ event: 1, createdAt: -1 });
AnalyticsEventSchema.index({ createdAt: -1 });

export const AnalyticsEvent =
  mongoose.models.AnalyticsEvent ||
  mongoose.model<IAnalyticsEventDocument>("AnalyticsEvent", AnalyticsEventSchema);

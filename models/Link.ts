import mongoose, { Schema, models, model } from "mongoose";

export type LinkType =
  | "github"
  | "linkedin"
  | "twitter"
  | "facebook"
  | "youtube"
  | "discord"
  | "portfolio"
  | "email"
  | "phone"
  | "project-demo"
  | "project-source"
  | "blog"
  | "certificate"
  | "resume"
  | "social"
  | "documentation"
  | "other";

export type LinkCategory = "social" | "project" | "contact" | "resource" | "navigation";

export interface ILinkHealth {
  lastCheckedAt: Date | null;
  status: "working" | "redirect" | "broken" | "unchecked";
  statusCode: number | null;
  responseTime: number | null;
  errorMessage: string | null;
}

export interface ILink {
  _id: string;
  label: string;
  url: string;
  type: LinkType;
  category: LinkCategory;
  icon: string;
  isActive: boolean;
  isExternal: boolean;
  openInNewTab: boolean;
  displayOrder: number;
  health: ILinkHealth;
  clickCount: number;
  lastClickedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const LinkHealthSchema = new Schema<ILinkHealth>(
  {
    lastCheckedAt: { type: Date, default: null },
    status: { type: String, enum: ["working", "redirect", "broken", "unchecked"], default: "unchecked" },
    statusCode: { type: Number, default: null },
    responseTime: { type: Number, default: null },
    errorMessage: { type: String, default: null },
  },
  { _id: false }
);

const LinkSchema = new Schema<ILink>(
  {
    label: { type: String, required: true, trim: true, maxlength: 100 },
    url: { type: String, required: true, trim: true, maxlength: 2048 },
    type: {
      type: String,
      required: true,
      enum: [
        "github", "linkedin", "twitter", "facebook", "youtube", "discord",
        "portfolio", "email", "phone", "project-demo", "project-source",
        "blog", "certificate", "resume", "social", "documentation", "other",
      ],
    },
    category: {
      type: String,
      required: true,
      enum: ["social", "project", "contact", "resource", "navigation"],
    },
    icon: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    isExternal: { type: Boolean, default: true },
    openInNewTab: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
    health: { type: LinkHealthSchema, default: () => ({}) },
    clickCount: { type: Number, default: 0 },
    lastClickedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

LinkSchema.index({ type: 1 });
LinkSchema.index({ category: 1 });
LinkSchema.index({ isActive: 1, displayOrder: 1 });
LinkSchema.index({ "health.status": 1 });

export default models.Link || model("Link", LinkSchema);

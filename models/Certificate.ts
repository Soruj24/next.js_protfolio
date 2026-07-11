import mongoose, { Schema, Document } from "mongoose";

export interface ICertificate {
  title: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId: string;
  credentialUrl: string;
  description: string;
  skills: string[];
  image?: string;
  order: number;
  active: boolean;
}

export interface ICertificateDocument extends ICertificate, Document {
  createdAt: Date;
  updatedAt: Date;
}

const CertificateSchema = new Schema<ICertificateDocument>(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    issuer: { type: String, required: true, trim: true, maxlength: 100 },
    date: { type: String, required: true },
    expiryDate: { type: String, default: null },
    credentialId: { type: String, default: "" },
    credentialUrl: { type: String, default: "" },
    description: { type: String, default: "", maxlength: 1000 },
    skills: { type: [String], default: [] },
    image: { type: String, default: "" },
    order: { type: Number, default: 0, min: 0 },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    collection: "certificates",
  }
);

CertificateSchema.index({ order: 1, active: 1 });
CertificateSchema.index({ issuer: 1 });
CertificateSchema.index({ date: -1 });

export const Certificate =
  mongoose.models.Certificate ||
  mongoose.model<ICertificateDocument>("Certificate", CertificateSchema);

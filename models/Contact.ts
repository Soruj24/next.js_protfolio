import mongoose, { Schema, Document } from "mongoose";

export interface IContact {
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "pending" | "read" | "replied";
  ipAddress?: string;
  userAgent?: string;
  reply?: string;
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IContactDocument extends Omit<IContact, "_id">, Document {}

const ContactSchema = new Schema<IContactDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "read", "replied"],
      default: "pending",
    },
    ipAddress: { type: String },
    userAgent: { type: String },
  },
  {
    timestamps: true,
    collection: "contacts",
  }
);

export const Contact =
  mongoose.models.Contact ||
  mongoose.model<IContactDocument>("Contact", ContactSchema);

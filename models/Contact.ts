// models/Contact.ts
import mongoose, { Schema, Document } from 'mongoose';
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export interface IContact extends ContactFormData {
  status: 'pending' | 'read' | 'replied';
  ipAddress?: string;
  userAgent?: string;
}

export interface IContactDocument extends IContact, Document {
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContactDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'read', 'replied'],
    default: 'pending'
  },
  ipAddress: { type: String },
  userAgent: { type: String }
}, {
  timestamps: true,
  collection: 'contacts'
});

export const Contact = mongoose.models.Contact || mongoose.model<IContactDocument>('Contact', ContactSchema);
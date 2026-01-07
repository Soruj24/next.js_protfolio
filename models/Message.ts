import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  senderId: string; // "client" or userId if logged in
  receiverId: string; // "admin" or userId
  content: string;
  isRead: boolean;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    content: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Message = mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);

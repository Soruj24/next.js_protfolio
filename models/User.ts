// models/User.ts
import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "editor" | "user";
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  otp?: string;
  otpExpires?: Date;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "editor", "user"],
      default: "user",
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    otp: { type: String },
    otpExpires: { type: Date },
    isVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

// Compare password method
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

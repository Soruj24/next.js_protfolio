import { Resend } from "resend";
import nodemailer from "nodemailer";

const getResend = () => {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    if (
      process.env.NEXT_PHASE === "phase-production-build" ||
      process.env.NODE_ENV === "production"
    ) {
      return null;
    }
    // Only throw in dev if we actually try to use it
    return null;
  }
  return new Resend(key);
};

// Nodemailer setup for fallback or Gmail SMTP
const getTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return null;
  }
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const sendResetPasswordEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.NEXTAUTH_URL}/reset-password/${token}`;
  const resend = getResend();

  if (!resend) {
    console.warn("Resend API key missing. Cannot send reset email.");
    return { success: false, error: "Email service not configured" };
  }

  try {
    await resend.emails.send({
      from: "Next AI Portfolio <onboarding@resend.dev>",
      to: email,
      subject: "Reset your password",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0891b2;">Password Reset Request</h2>
          <p>You requested to reset your password for your Next AI Portfolio account.</p>
          <p>Click the button below to set a new password. This link will expire in 1 hour.</p>
          <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background-color: #0891b2; color: white; text-decoration: none; border-radius: 8px; margin: 20px 0;">Reset Password</a>
          <p>If you didn't request this, you can safely ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #666;">This is an automated message, please do not reply.</p>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
};

export const sendVerificationEmail = async (email: string, otp: string) => {
  const emailHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #050505; color: white; padding: 40px; border-radius: 20px; border: 1px solid #333;">
      <h2 style="color: #0891b2; text-align: center; font-size: 28px;">Welcome to Next AI</h2>
      <p style="text-align: center; color: #999;">Please use the following code to verify your account.</p>
      <div style="background-color: #111; padding: 20px; border-radius: 12px; text-align: center; margin: 30px 0; border: 1px dashed #0891b2;">
        <span style="font-size: 36px; font-weight: bold; letter-spacing: 10px; color: #0891b2;">${otp}</span>
      </div>
      <p style="text-align: center; font-size: 14px; color: #666;">This code will expire in 10 minutes.</p>
      <hr style="border: none; border-top: 1px solid #222; margin: 30px 0;" />
      <p style="text-align: center; font-size: 12px; color: #444;">If you didn't create an account, you can safely ignore this email.</p>
    </div>
  `;

  // Try Resend first
  const resend = getResend();
  if (resend) {
    try {
      console.log("Attempting to send via Resend...");
      const data = await resend.emails.send({
        from: "Next AI Portfolio <onboarding@resend.dev>",
        to: email,
        subject: "Verify your email",
        html: emailHtml,
      });

      // Resend returns { id: '...' } on success
      if (data && !("error" in data)) {
        console.log("Sent successfully via Resend");
        return { success: true };
      }
    } catch (error) {
      console.error("Resend failed, trying fallback:", error);
    }
  }

  // Fallback to Nodemailer if Gmail credentials exist
  const transporter = getTransporter();
  if (transporter) {
    try {
      console.log("Attempting to send via Nodemailer...");
      await transporter.sendMail({
        from: `"Next AI Portfolio" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Verify your email",
        html: emailHtml,
      });
      console.log("Sent successfully via Nodemailer");
      return { success: true };
    } catch (error) {
      console.error("Nodemailer failed:", error);
      return { success: false, error };
    }
  }

  return { success: false, error: "No email service configured correctly" };
};

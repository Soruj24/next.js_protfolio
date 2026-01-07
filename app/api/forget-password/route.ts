import { NextResponse } from "next/server";
import { User } from "@/models/User";
import { connectDB } from "@/config/db";
import crypto from "crypto";
import { sendResetPasswordEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
      // For security reasons, don't reveal if user exists or not
      return NextResponse.json({
        message:
          "If an account exists with that email, a reset link has been sent.",
      });
    }

    // Generate token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 3600000); // 1 hour from now

    user.resetPasswordToken = token;
    user.resetPasswordExpires = expires;
    await user.save();

    // Send email
    const emailResult = await sendResetPasswordEmail(email, token);

    if (!emailResult.success) {
      return NextResponse.json(
        { error: "Failed to send reset email" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message:
        "If an account exists with that email, a reset link has been sent.",
    });
  } catch (error: unknown) {
    console.error("Forget password error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

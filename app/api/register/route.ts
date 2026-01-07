import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Registration attempt:", body);
    const { name, email, password } = body;

    if (!name || !email || !password) {
      console.log("Validation failed: Missing fields", { name: !!name, email: !!email, password: !!password });
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (existingUser.isVerified) {
        console.log("Registration failed: User already exists and is verified", email);
        return NextResponse.json(
          { error: "User already exists. Please login." },
          { status: 400 }
        );
      } else {
        // User exists but not verified, send new OTP
        console.log("User exists but not verified. Resending OTP to:", email);
        const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
        const newOtpExpires = new Date(Date.now() + 10 * 60 * 1000);

        existingUser.otp = newOtp;
        existingUser.otpExpires = newOtpExpires;
        await existingUser.save();

        const emailResult = await sendVerificationEmail(email, newOtp);
        
        return NextResponse.json(
          { 
            message: "Account already exists but not verified. A new code has been sent.", 
            user: { name: existingUser.name, email: existingUser.email, role: existingUser.role },
            verificationRequired: true 
          },
          { status: 201 } // Return 201 to trigger the OTP step in frontend
        );
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create new user (Setting first user as admin, others as editor for security)
    const userCount = await User.countDocuments();
    const role = userCount === 0 ? "admin" : "editor";

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      otp,
      otpExpires,
      isVerified: false,
    });

    // Send verification email
    const emailResult = await sendVerificationEmail(email, otp);

    if (!emailResult.success) {
      // We still created the user, but email failed. User can try resending later or we can handle it.
      // For now, let's just log and continue, but inform the client.
      console.error("Failed to send verification email");
    }

    return NextResponse.json(
      { 
        message: "Registration successful. Please verify your email.", 
        user: { name: user.name, email: user.email, role: user.role },
        verificationRequired: true 
      },
      { status: 201 }
    );
    } catch (error: unknown) {
    console.error("Registration error full details:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}

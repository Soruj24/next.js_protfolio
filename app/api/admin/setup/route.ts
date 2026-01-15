import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { User } from "@/models/User";
import { auth } from "@/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return new NextResponse(
        "<html><body><h1>Unauthorized</h1><p>Please <a href='/login'>login</a> first.</p></body></html>",
        { status: 401, headers: { "Content-Type": "text/html" } }
      );
    }

    await connectDB();

    const adminExists = await User.findOne({ role: "admin" });

    if (!adminExists) {
      const updatedUser = await User.findOneAndUpdate(
        { email: session.user.email },
        { role: "admin" },
        { new: true }
      );

      if (!updatedUser) {
        return new NextResponse("<h1>User not found in database.</h1>", {
          status: 404,
          headers: { "Content-Type": "text/html" },
        });
      }

      return new NextResponse(
        `<html><body style="font-family: sans-serif; text-align: center; padding: 50px; background: #020617; color: white;">
          <h1 style="color: #22d3ee;">Success!</h1>
          <p>User <b>${session.user.email}</b> has been promoted to <b>Admin</b>.</p>
          <p style="color: #94a3b8;">IMPORTANT: You must <b>Logout</b> and <b>Login</b> again to see the Admin Dashboard.</p>
          <a href="/" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background: #0891b2; color: white; text-decoration: none; rounded: 8px;">Go to Home</a>
        </body></html>`,
        { headers: { "Content-Type": "text/html" } }
      );
    }

    return new NextResponse(
      `<html><body style="font-family: sans-serif; text-align: center; padding: 50px; background: #020617; color: white;">
        <h1 style="color: #ef4444;">Access Denied</h1>
        <p>An admin already exists in the system.</p>
        <p style="color: #94a3b8;">If you need to promote another user, use the POST method with the secret key.</p>
        <a href="/" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background: #334155; color: white; text-decoration: none; rounded: 8px;">Back to Home</a>
      </body></html>`,
      { status: 403, headers: { "Content-Type": "text/html" } }
    );
  } catch (error: any) {
    return new NextResponse(`<h1>Error: ${error.message}</h1>`, {
      status: 500,
      headers: { "Content-Type": "text/html" },
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please login first." },
        { status: 401 }
      );
    }

    await connectDB();

    // Check if any admin already exists
    const adminExists = await User.findOne({ role: "admin" });

    // If no admin exists, or if the user provides a secret key from env
    const { secretKey } = await request.json();
    const envKey = process.env.ADMIN_SETUP_KEY || "next-ai-2026"; // Default fallback for initial setup

    if (!adminExists || secretKey === envKey) {
      const updatedUser = await User.findOneAndUpdate(
        { email: session.user.email },
        { role: "admin" },
        { new: true }
      );

      if (!updatedUser) {
        return NextResponse.json(
          { error: "User not found in database." },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        message: `User ${session.user.email} has been promoted to Admin. Please logout and login again to refresh your session.`,
        user: { email: updatedUser.email, role: updatedUser.role },
      });
    }

    return NextResponse.json(
      {
        error:
          "An admin already exists. Use the secret key to promote another user.",
      },
      { status: 403 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

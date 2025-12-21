import { dbConnect } from "@/config/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    await dbConnect(); // ← Use the same one

    // Attempt to drop all stale indices that might cause duplicate key errors
    try {
      await User.collection.dropIndexes();
      console.log("Dropped all indices for User collection");
    } catch {
      console.log("No indices to drop or collection doesn't exist yet");
    }

    const { name, email, password } = await request.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return Response.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
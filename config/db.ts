import mongoose from "mongoose";

interface GlobalMongoose {
  mongoose?: {
    conn: mongoose.Mongoose | null;
    promise: Promise<mongoose.Mongoose> | null;
  };
}

let cached = (global as GlobalMongoose).mongoose;

if (!cached) {
  cached = (global as GlobalMongoose).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (cached && cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URI) {
    // During build, we might not have the URI, and that's okay if we don't actually query.
    // We return null to indicate no connection, and calling code should handle it.
    if (
      process.env.NEXT_PHASE === "phase-production-build" ||
      process.env.NODE_ENV === "production"
    ) {
      console.warn("MONGODB_URI is not defined. Skipping database connection.");
      return null;
    }
    throw new Error("Please define MONGODB_URI in your .env file");
  }

  if (!cached || !cached.promise) {
    const opts = {
      bufferCommands: false, // Disable buffering to surface connection issues early
    };

    cached!.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("MongoDB connected");
      return mongoose;
    });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e: any) {
    cached!.promise = null;
    if (e.message.includes("querySrv ECONNREFUSED")) {
      console.error("MongoDB Connection Error: DNS resolution failed for SRV record.");
      console.error("Hint: Try using a standard connection string (mongodb://) instead of the SRV one (mongodb+srv://) in your .env file.");
    }
    throw e;
  }

  return cached!.conn;
}

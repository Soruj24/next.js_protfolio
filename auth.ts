import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { User } from "@/models/User";
import { connectDB } from "@/config/db";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectDB();
        const user = await User.findOne({ email: credentials.email });

        if (!user) return null;

        const isPasswordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password,
        );

        if (!isPasswordMatch) return null;

        if (!user.isVerified) {
          throw new Error("Email not verified");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" || account?.provider === "github") {
        try {
          await connectDB();
          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            // Create new user if they don't exist
            const userCount = await User.countDocuments();
            const role = userCount === 0 ? "admin" : "user";

            await User.create({
              name: user.name,
              email: user.email,
              password: await bcrypt.hash(
                Math.random().toString(36).slice(-8),
                12,
              ),
              role: role,
              isVerified: true, // OAuth users are verified
            });
          }

          // Add role to the user object so it can be picked up by the jwt callback
          const dbUser = await User.findOne({ email: user.email });
          if (dbUser) {
            (user as any).role = dbUser.role;
          }
        } catch (error) {
          console.error("Error during OAuth sign in:", error);
          return false;
        }
      }
      return true;
    },
  },
});

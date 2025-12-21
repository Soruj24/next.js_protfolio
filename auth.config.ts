// auth.config.ts
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  session: {
    strategy: "jwt",
  },
  providers: [], // IMPORTANT: Empty – no Credentials here
  // Add any other options that are safe (callbacks if they don't touch DB/crypto)
} satisfies NextAuthConfig;
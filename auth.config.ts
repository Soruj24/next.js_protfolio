import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [], // আমরা এখানে প্রোভাইডার খালি রাখছি, যা auth.ts এ পূর্ণ করা হবে
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = (user as { role: string }).role;
      }
      
      // Handle session update
      if (trigger === "update" && session) {
        if (session.name) token.name = session.name;
        if (session.image) token.picture = session.image;
        if (session.role) token.role = session.role;
      }
      
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;

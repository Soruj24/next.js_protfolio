import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [], // আমরা এখানে প্রোভাইডার খালি রাখছি, যা auth.ts এ পূর্ণ করা হবে
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;

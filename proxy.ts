import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";
import { PUBLIC_ROUTES, LOGIN, ROOT } from "@/lib/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname) || nextUrl.pathname === ROOT;
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");

  // Redirect logged-in users away from login/register
  if (isPublicRoute && isLoggedIn && (nextUrl.pathname === "/login" || nextUrl.pathname === "/register")) {
    return NextResponse.redirect(new URL(ROOT, nextUrl));
  }

  // Protect admin routes
  if (isAdminRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL(LOGIN, nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

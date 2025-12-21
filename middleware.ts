import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";  

const { auth: middleware } = NextAuth(authConfig);

export default middleware((req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;

  // Your route definitions
  const PUBLIC_ROUTES = ["/login", "/register", "/"];
  const isPublic = PUBLIC_ROUTES.some((route) =>
    nextUrl.pathname.startsWith(route)
  ) || nextUrl.pathname === "/";

  // Optional: redirect logged-in users away from login/register
  if (isAuthenticated && (nextUrl.pathname === "/login" || nextUrl.pathname === "/register")) {
    return Response.redirect(new URL("/", nextUrl)); // or "/"
  }

  if (!isAuthenticated && !isPublic) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  

  // Allow otherwise
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/",
  ],
};
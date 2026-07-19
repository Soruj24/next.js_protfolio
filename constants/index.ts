export const LOGIN = "/login";
export const ROOT = "/";

export const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/projects",
  "/api/auth/callback/google",
  "/api/auth/callback/github",
  "/forget-password",
  "/reset-password",
  "/verify-otp",
];

export const HIDDEN_CHAT_ROUTES: string[] = [];

export const ADMIN_ROLE = "admin";

export const ITEMS_PER_PAGE = {
  admin: {
    projects: 6,
    skills: 4,
    inquiries: 10,
  },
  public: {
    projects: 6,
    skills: 6,
  },
} as const;

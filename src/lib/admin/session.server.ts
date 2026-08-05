import { useSession as createServerSession } from "@tanstack/react-start/server";

export type AdminSessionData = {
  accessToken?: string;
  refreshToken?: string;
  email?: string;
  userId?: string;
};

export function getAdminSessionStore() {
  const password = process.env.ADMIN_SESSION_SECRET;
  if (!password || password.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET must contain at least 32 characters.");
  }

  return createServerSession<AdminSessionData>({
    name: "reposition-lab-admin",
    password,
    maxAge: 60 * 60 * 24 * 7,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    },
  });
}

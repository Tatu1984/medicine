import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Protect the /admin area (Next.js 16 "proxy" convention, formerly middleware).
// Runs on the Edge runtime, so it does its own JWT check rather than importing
// the server-only auth lib.
const SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET || "dev-only-insecure-secret-change-me"
);

async function isAuthed(token?: string) {
  if (!token) return false;
  try {
    await jwtVerify(token, SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("rm_session")?.value;
  const authed = await isAuthed(token);

  // Already logged in → skip the login page
  if (pathname === "/admin/login") {
    if (authed) return NextResponse.redirect(new URL("/admin", req.url));
    return NextResponse.next();
  }

  // Any other /admin route requires a session
  if (!authed) {
    const url = new URL("/admin/login", req.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

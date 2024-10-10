import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // Allow requests if the token exists or the path is public
  if (token || pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  // Redirect to login if no token
  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: ["/products/upload/:path*"],
};

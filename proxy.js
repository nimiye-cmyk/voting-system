import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function proxy(req) {
    const token = req.nextauth.token;
    const isAuthPage = req.nextUrl.pathname.startsWith("/auth");

    // 1. If trying to access the admin portal, strictly verify role properties
    if (req.nextUrl.pathname.startsWith("/admin") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/auth/login?error=UnauthorizedAdmin", req.url));
    }

    // 2. If logged in, block them from looping back to login/accreditation screens
    if (isAuthPage && token) {
      return NextResponse.redirect(new URL("/Voting", req.url));
    }
  },
  {
    callbacks: {
      // Returns true if a session token exists, authorizing basic access
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/auth/login", // Fallback gate destination for unauthenticated sessions
    },
  }
);

// 🔒 CRITICAL CONFIG: Specify exactly which page tracks are locked down
export const config = {
  matcher: [
    "/Voting/:path*", 
    "/admin/:path*",
    "/Candidates/:path*"
  ],
};

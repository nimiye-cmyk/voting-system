import withAuth from "next-auth/middleware"; //  FIXED: Import as default object instead of { withAuth }
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
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/auth/login",
    },
  }
);

// Lock down your specific application page tracks
export const config = {
  matcher: [
    "/Voting/:path*", 
    "/admin/:path*",
    "/Candidates/:path*"
  ],
};

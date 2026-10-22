import { withAuth } from "next-auth/next"; //  FIXED: Import from the root next-auth package for Next.js 16 compatibility
import { NextResponse } from "next/server";

export default withAuth(
  function proxy(req) {
    const token = req.nextauth.token;
    const isAuthPage = req.nextUrl.pathname.startsWith("/auth");

    // 1. Admin route protection gate rule
    if (req.nextUrl.pathname.startsWith("/admin") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/auth/login?error=UnauthorizedAdmin", req.url));
    }

    // 2. Redirect logged-in students away from login screens
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

// Protect your specific voting system layout pages
export const config = {
  matcher: [
    "/Voting/:path*", 
    "/admin/:path*",
    "/Candidates/:path*"
  ],
};

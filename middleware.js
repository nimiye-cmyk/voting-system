import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"; // If utilizing NextAuth/Auth.js

export async function middleware(request) {
  const url = request.nextUrl.clone();

  // Check if the student is browsing an administrative folder route
  if (url.pathname.startsWith("/admin")) {
    
    // In production: fetch the decrypted validation cookie token from the request
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    // Condition 1: If there is no active logged-in user profile session
    // Condition 2: If the profile email does not belong to the IEC admin team
    const isAdminUser = token?.email === "iec-chairman@student.edu.ng"; // Set your specific admin address

    if (!token || !isAdminUser) {
      // Quietly bounce unauthorized access attempts back to the main voter portal login page
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Config blocks Next.js from wasting execution loops on assets or styling sheets
export const config = {
  matcher: ["/admin/:path*"],
};

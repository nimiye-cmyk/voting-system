import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SUG ELECT",
  description: "SUG ELECT is a platform for students to vote for their preferred candidates in the Student Union Government elections. It provides a secure and user-friendly interface for students to cast their votes and stay informed about the election process.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
 <body className="flex flex-col min-h-screen bg-neutral-50">
        <Navbar />
        {/* 'flex-grow' ensures the footer stays glued to the bottom of short pages */}
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
      </html>
  );
}

// app/layout.jsx


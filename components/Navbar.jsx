"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Candidates", href: "/Candidates" },
    { name: "Results", href: "/Result" },
    { name: "Voting", href: "/Voting" },
  ];

  return (
    <nav className="bg-white border-b border-neutral-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo Branding */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-sm transition group-hover:bg-emerald-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-neutral-900 tracking-tight text-base leading-none">SUG ELECT</span>
                <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest mt-0.5">IEC Portal</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700 font-semibold"
                      : "text-neutral-600 hover:text-emerald-600 hover:bg-neutral-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Action Gateway Buttons Group */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/auth/login"
              className={`px-4 py-2 text-sm font-semibold rounded-xl border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 text-neutral-700 transition ${
                pathname === "/auth/login" ? "bg-neutral-50 font-bold" : ""
              }`}
            >
              Voter Login
            </Link>
            <Link
              href="/auth/signin"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition shadow-sm"
            >
              Accredit / Sign Up
            </Link>
          </div>

          {/* Mobile Hamburger Button Layout Control */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-neutral-500 hover:text-emerald-600 hover:bg-neutral-50 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu Layout */}
      {isOpen && (
        <div className="md:hidden border-t border-neutral-100 bg-white px-4 pt-2 pb-5 space-y-1 shadow-md">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-base font-medium transition ${
                  isActive
                    ? "bg-emerald-600 text-white font-semibold"
                    : "text-neutral-600 hover:text-emerald-600 hover:bg-neutral-50"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          
          {/* Mobile Integrated Action Buttons Drawer Base Block */}
          <div className="pt-4 border-t border-neutral-100 mt-2 grid grid-cols-1 gap-2">
            <Link
              href="/auth/login"
              onClick={() => setIsOpen(false)}
              className={`block w-full text-center px-4 py-3 border border-neutral-200 text-neutral-700 font-semibold rounded-xl text-sm transition ${
                pathname === "/auth/login" ? "bg-neutral-50" : "bg-white"
              }`}
            >
              Voter Login
            </Link>
            <Link
              href="/auth/signin"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm transition shadow-sm"
            >
              Accredit / Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

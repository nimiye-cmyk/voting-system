import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-400 border-t-4 border-emerald-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1: Info & Security */}
          <div className="space-y-4">
            {/* UPDATED: Matches Navbar logo branding layout */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-white tracking-tight text-base leading-none">SUG ELECT</span>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mt-0.5">IEC Portal</span>
              </div>
            </div>
            
            <p className="text-sm leading-relaxed text-neutral-400">
              An independent, biometrically encrypted digital election framework built exclusively for Student Union Government elections.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-950/40 border border border-emerald-900/50 px-3 py-1.5 rounded-lg w-fit">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
              Secured by External USB Biometrics
            </div>
          </div>

          {/* Column 2: Quick Links Navigation */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Election Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-emerald-400 transition">About the IEC Process</Link></li>
              <li><Link href="/Candidates" className="hover:text-emerald-400 transition">View Aspirants & Manifestos</Link></li>
              <li><Link href="/Result" className="hover:text-emerald-400 transition">Real-Time Election Analytics</Link></li>
              <li><Link href="/Voting" className="hover:text-emerald-400 transition">Secure Ballot Verification</Link></li>
            </ul>
          </div>

          {/* Column 3: Emergency Support Statement */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4">IEC Support</h3>
            <p className="text-sm leading-relaxed mb-3 text-neutral-400">
              Encountering verification issues or credential blockages? Contact your faculty's accredited IEC representative immediately.
            </p>
            <span className="text-xs text-neutral-500 block">
              In cooperation with the School Directorate of Student Affairs.
            </span>
          </div>

        </div>

        {/* Bottom Bar Layout */}
        <div className="border-t border-neutral-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Independent Electoral Committee (IEC). All rights reserved.</p>
          <div className="flex gap-4">
            <span className="text-neutral-500">Built for seamless campus democracy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

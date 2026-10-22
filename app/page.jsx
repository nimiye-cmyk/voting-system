import React from 'react';

export default function Page() {
  return (
    <div className="bg-white text-gray-800 min-h-screen font-sans antialiased">
      
      {/* 1. Hero Section */}
      <section className="relative bg-[#0a5c36] text-white overflow-hidden py-12 sm:py-20 lg:py-32">
        {/* Decorative background grid subtle overlay */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:20px_20px] sm:bg-[size:30px_30px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Value Proposition */}
            <div className="text-center lg:text-left space-y-5 sm:space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#0e7a48] text-[#4ade80] border border-[#1b9d5e] mx-auto lg:mx-0">
                {/* Native SVG: Fingerprint Scanner Security Icon */}
                <svg className="w-3.5 h-3.5" xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 009 11a13.917 13.917 0 00-2.25-6.953m5.63 11.233A14.002 14.002 0 0012 3c-1.22 0-2.39.155-3.5.44m8.528 4.617c1.378 1.48 2.222 3.473 2.222 5.666 0 2.21-.86 4.195-2.254 5.674M15 11c0 1.25-.262 2.44-.734 3.518m-4.434-7.464A10.954 10.954 0 0112 7c2.257 0 4.316.68 6.019 1.842" />
                </svg>
                Biometric Hardware Verification Enabled
              </span>
              
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight sm:leading-none">
                Your Vote. <br />
                Your Voice. <br />
                <span className="text-[#4ade80]">Secured Instantly.</span>
              </h1>
              <p className="text-green-100 text-base sm:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed">
                A fast, transparent, and completely tamper-proof online voting framework designed to deliver secure collective decisions in real time.
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2">
                <a
                  href="/auth/signin"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#0a5c36] hover:bg-green-50 px-7 py-3.5 rounded-full font-bold text-base shadow-lg hover:shadow-xl transition-all duration-200 transform active:scale-95 w-full sm:w-auto"
                >
                  Get Started 
                  {/* Native SVG: Arrow Right Replacement */}
                  <svg className="w-5 h-5" xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <a
                  href="/about"
                  className="inline-flex items-center justify-center bg-transparent text-white hover:bg-[#0e7a48] border-2 border-white/40 hover:border-white px-7 py-3.5 rounded-full font-semibold text-base transition-all duration-200 w-full sm:w-auto"
                >
                  How It Works
                </a>
              </div>
            </div>

            {/* Right Column: Visual Mockup / Feature Card */}
            <div className="relative mx-auto w-full max-w-md lg:max-w-none pt-4 lg:pt-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#4ade80] to-transparent opacity-20 blur-2xl rounded-full"></div>
              <div className="relative bg-white text-gray-900 rounded-2xl p-5 sm:p-8 shadow-2xl border border-gray-100">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <div>
                    <h3 className="font-bold text-base sm:text-lg">Active Election</h3>
                    <p className="text-xs text-gray-500">Closes in 4 hours</p>
                  </div>
                  <span className="bg-red-50 text-red-600 text-xs font-bold px-2.5 py-1 rounded-full animate-pulse flex items-center gap-1">
                    ● Live
                  </span>
                </div>
                
                {/* Mock Voting Interaction */}
                <div className="space-y-3.5 sm:space-y-4 pt-5">
                  <p className="text-xs sm:text-sm font-semibold text-gray-700">Select your preferred representative:</p>
                  <label className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl border-2 border-[#0a5c36] bg-green-50/50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-4 border-[#0a5c36] bg-white flex-shrink-0"></div>
                      <span className="font-medium text-xs sm:text-sm">Candidate Alpha</span>
                    </div>
                    {/* Native SVG: Check Circle Replacement */}
                    <svg className="w-5 h-5 text-[#0a5c36] flex-shrink-0" xmlns="http://w3.org" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </label>
                  <label className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl border border-gray-200 opacity-60 pointer-events-none">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-gray-300 bg-white flex-shrink-0"></div>
                      <span className="font-medium text-xs sm:text-sm">Candidate Beta</span>
                    </div>
                  </label>
                  
                  <button className="w-full bg-[#0a5c36] hover:bg-[#0e7a48] text-white py-3 rounded-xl font-bold text-sm sm:text-base transition-colors mt-2 shadow-md active:scale-[0.98]">
                    Submit Ballot
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Metrics / Trust Strip */}
      <section className="bg-gray-50 border-b border-gray-100 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 text-center">
            <div className="p-2">
              <p className="text-2xl sm:text-4xl font-extrabold text-[#0a5c36]">100%</p>
              <p className="text-[11px] sm:text-sm font-medium text-gray-500 mt-1">Encrypted & Secure</p>
            </div>
            <div className="p-2">
              <p className="text-2xl sm:text-4xl font-extrabold text-[#0a5c36]">250k+</p>
              <p className="text-[11px] sm:text-sm font-medium text-gray-500 mt-1">Votes Accounted For</p>
            </div>
            <div className="p-2">
              <p className="text-2xl sm:text-4xl font-extrabold text-[#0a5c36]">&lt; 1s</p>
              <p className="text-[11px] sm:text-sm font-medium text-gray-500 mt-1">Hardware Sync Speed</p>
            </div>
            <div className="p-2">
              <p className="text-2xl sm:text-4xl font-extrabold text-[#0a5c36]">0.0%</p>
              <p className="text-[11px] sm:text-sm font-medium text-gray-500 mt-1">Double Voting Errors</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core System Features */}
      <section id="features" className="py-16 sm:py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Engineered for absolute voting integrity
            </h2>
            <p className="text-gray-500 mt-3 sm:mt-4 text-sm sm:text-lg">
              Our framework uses cloud-native tools to enforce complete transparency without compromising voter privacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Feature 1 */}
            <div className="p-6 sm:p-8 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 group">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-green-50 flex items-center justify-center text-[#0a5c36] font-bold group-hover:bg-[#0a5c36] group-hover:text-white transition-all duration-300 mb-5 sm:mb-6">
                {/* Identity Tracking SVG */}
                <svg className="w-5 h-5 sm:w-6 sm:h-6" xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Biometric Anti-Fraud</h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                Each voter is verified through a secure biometric scan, ensuring that only eligible participants can cast their vote, eliminating the risk of impersonation or fraudulent activity.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 sm:p-8 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 group">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-green-50 flex items-center justify-center text-[#0a5c36] font-bold group-hover:bg-[#0a5c36] group-hover:text-white transition-all duration-300 mb-5 sm:mb-6">
                {/* Blockchain SVG */}
                <svg className="w-5 h-5 sm:w-6 sm:h-6" xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Blockchain Transparency</h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                All votes are recorded on a decentralized blockchain ledger, providing an immutable and transparent record of the election process. This ensures that results can be independently verified by any stakeholder.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 sm:p-8 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 group">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-green-50 flex items-center justify-center text-[#0a5c36] font-bold group-hover:bg-[#0a5c36] group-hover:text-white transition-all duration-300 mb-5 sm:mb-6">
                {/* Real-Time Results SVG */}
                <svg className="w-5 h-5 sm:w-6 sm:h-6" xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18V3H3zm3 3h12v12H6V6zm3 3v6h6V9H9z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Instant Result Reporting</h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                As votes are cast, the system aggregates and displays results in real time, allowing stakeholders to monitor the election's progress and ensuring that the final outcome is delivered promptly and accurately.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
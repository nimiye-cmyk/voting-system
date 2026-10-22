export default function AboutPage() {
  const steps = [
    {
      num: "1",
      title: "Student Accreditation",
      desc: "Log in with your official school records. The system validates your Matriculation Number against the verified registry provided by the Directorate of Student Affairs."
    },
    {
      num: "2",
      title: "Biometric Enrolment",
      desc: "Link your device's native fingerprint scanner (Touch ID or Windows Hello). This binds a secure public cryptographic key to your voter profile."
    },
    {
      num: "3",
      title: "Ballot Selection",
      desc: "Browse the approved aspirants running for various executive offices including SUG President, Vice President, and PRO."
    },
    {
      num: "4",
      title: "Cryptographic Signing",
      desc: "Scan your fingerprint to authorize your ballot. The backend immediately counts the anonymous vote and completely locks your Matric Number from voting again."
    }
  ];

  return (
    <main className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Banner Section */}
        <div className="bg-emerald-700 text-white rounded-3xl p-8 md:p-12 shadow-xl mb-12 text-center md:text-left relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="bg-emerald-800 text-emerald-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              IEC Transparency Report
            </span>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mt-4 mb-4">
              About the SUG Biometric Voting System
            </h1>
            <p className="text-emerald-100 text-sm md:text-base font-light leading-relaxed">
              This system balances electoral transparency with total absolute voter anonymity. By utilizing the browser's native Web Authentication API, we eliminate ballot stuffing and double-voting entirely.
            </p>
          </div>
        </div>

        {/* The 4-Step Process Grid */}
        <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
          How Your Vote Flows
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {steps.map((step) => (
            <div key={step.num} className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm flex gap-4">
              <span className="flex items-center justify-center bg-emerald-100 text-emerald-700 font-black rounded-xl h-10 w-10 text-lg shrink-0">
                {step.num}
              </span>
              <div>
                <h3 className="font-bold text-neutral-900 text-base mb-1">{step.title}</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Security and Anonymity Guarantee FAQ */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-neutral-100 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-3">Frequently Asked Questions</h2>
          
          <div className="space-y-2">
            <h3 className="font-bold text-neutral-800 text-sm">Can school administrators see who I voted for?</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              No. When you sign your ballot, your student profile is marked as <code className="bg-neutral-100 px-1 py-0.5 rounded text-emerald-700">hasVoted: true</code> inside one collection, and your vote is sent anonymously to a completely separate pool. There is no structural path or database link connecting your personal profile directly to the ballot record.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-neutral-800 text-sm">Is my fingerprint stored on the school database?</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              No. Neither the website nor the database ever intercepts or handles your biological fingerprint lines or images. The operating system handles the scanner locally and outputs a mathematical cryptographic string to authenticate you.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firestore";
import { collection, getDocs, query, orderBy, addDoc } from "firebase/firestore";

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Application/Signup wizard states
  const [showSignup, setShowSignup] = useState(false);
  const [matricNo, setMatricNo] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [position, setPosition] = useState("");
  const [party, setParty] = useState("");
  const [bio, setBio] = useState("");
  
  // Verification middleware bridging states
  const [verifying, setVerifying] = useState(false);
  const [verifiedStudent, setVerifiedStudent] = useState(null);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Positions list
  const availablePositions = [
    "SUG President",
    "Vice President",
    "General Secretary",
    "Financial Secretary",
    "Director of Sports",
    "Director of Welfare",
  ];

  // Fetch all live approved candidates from Firestore
  async function fetchCandidates() {
    try {
      const q = query(collection(db, "candidates"), orderBy("name", "asc"));
      const querySnapshot = await getDocs(q);
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setCandidates(list);
    } catch (error) {
      console.error("Error fetching aspirants:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCandidates();
  }, []);

  // Step 1: Query backend router to extract verification parameters from the student registry
  const handleStudentVerification = async (e) => {
    e.preventDefault();
    setVerifying(true);
    setError("");
    setVerifiedStudent(null);

    try {
const response = await fetch("/api/verify-student", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ matricNo, email, phoneNo }),
});


      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Profile matching these entries was not found in the student database.");
      }

      if (data.isRegistered && !data.student) {
        throw new Error("This student record is already flagged as a registered voter or candidate entry.");
      }

      setVerifiedStudent({
        name: data.student.name,
        matricNo: data.student.matricNo,
        email: email, 
        phoneNo: data.student.phoneNo || phoneNo,
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setVerifying(false);
    }
  };

  // Step 2: Write standard text-based student data directly to Firestore "candidates" collection
  const handleCandidateRegistration = async (e) => {
    e.preventDefault();
    if (!verifiedStudent || !position) {
      setError("Please complete student profile validation check and specify target executive office position.");
      return;
    }

    setVerifying(true);
    setError("");

    try {
      await addDoc(collection(db, "candidates"), {
        name: verifiedStudent.name,
        matricNo: verifiedStudent.matricNo,
        email: verifiedStudent.email,
        phoneNo: verifiedStudent.phoneNo,
        position: position,
        party: party || "Independent",
        bio: bio || "No manifesto summary provided.",
        registeredAt: new Date().toISOString(),
      });

      setSuccessMsg("Aspirant profile compiled and published to the live registry successfully!");
      
      // Clear form inputs
      setMatricNo("");
      setEmail("");
      setPhoneNo("");
      setPosition("");
      setParty("");
      setBio("");
      setVerifiedStudent(null);
      setShowSignup(false);
      
      // Re-trigger global dashboard update
      setLoading(true);
      fetchCandidates();

    } catch (err) {
      setError("Failed to commit applicant write operations to database server: " + err.message);
    } finally {
      setVerifying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50 py-8 px-4 sm:px-6 lg:px-8 antialiased select-none">
      <div className="max-w-6xl mx-auto">
        
        {/* Page Header Area */}
        <div className="text-center mb-8 flex flex-col items-center">
          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            SUG Election 2026
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-neutral-900 mt-3 mb-2">IEC Aspirants Portal</h1>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-md leading-relaxed mb-4">
            Review profiles of accredited candidates or sign up using your database-verified student registry identity records.
          </p>

          <button
            onClick={() => { setShowSignup(!showSignup); setError(""); setSuccessMsg(""); }}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-sm
              ${showSignup ? "bg-neutral-800 text-white" : "bg-emerald-600 text-white hover:bg-emerald-700"}`}
          >
            {showSignup ? "← Back to Candidates Matrix" : "⚡ Apply for Candidacy"}
          </button>
        </div>

        {/* Global Action Banner Logs */}
        {successMsg && (
          <div className="mb-6 p-4 max-w-xl mx-auto bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl text-center">
            {successMsg}
          </div>
        )}

        {/* WIZARD VIEW PANEL CONTEXT */}
        {showSignup ? (
          <div className="max-w-xl mx-auto bg-white border border-neutral-200 rounded-2xl p-5 sm:p-8 shadow-md">
            <div className="mb-5 border-b border-neutral-100 pb-4">
              <h2 className="text-lg font-bold text-neutral-900">Aspirant Profile Authentication</h2>
              <p className="text-xs text-neutral-400 mt-0.5">Your full name and contact parameters will pull directly from the school record data stream.</p>
            </div>

            {error && (
              <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl">
                {error}
              </div>
            )}

            {!verifiedStudent ? (
              /* Step 1 Form: Registry Check */
              <form onSubmit={handleStudentVerification} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">Matriculation Number</label>
                  <input
                    type="text"
                    required
                    value={matricNo}
                    onChange={(e) => setMatricNo(e.target.value)}
                    placeholder="e.g. 2024/ND2/COMP/001"
                    className="w-full px-4 py-2.5 text-black bg-neutral-50 border border-neutral-200 focus:bg-white text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition h-11"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">Institutional Student Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@student.edu.ng"
                    className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 focus:bg-white text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition h-11"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">Registered Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    placeholder="e.g. +234 80 1234 5678"
                    className="w-full px-4 py-2.5 text-black bg-neutral-50 border border-neutral-200 focus:bg-white text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition h-11"
                  />
                </div>
                <button
                  type="submit"
                  disabled={verifying}
                  className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-sm transition disabled:opacity-40"
                >
                  {verifying ? "Checking Central Student Registry..." : "Verify Registry Records"}
                </button>
              </form>
            ) : (
              /* Step 2 Form: Position & Manifesto Info (Fingerprint Free) */
              <form onSubmit={handleCandidateRegistration} className="space-y-4">
                <div className="bg-emerald-50/50 p-4 border border-emerald-100 rounded-xl space-y-1.5 text-xs text-neutral-700">
                  <p className="font-bold text-emerald-800 uppercase tracking-wider text-[10px]">Registry Profile Match Confirmed</p>
                  <p><span className="text-neutral-400 font-medium">Candidate Name:</span> <strong className="text-neutral-900 uppercase">{verifiedStudent.name}</strong></p>
                  <p><span className="text-neutral-400 font-medium">Matriculation No:</span> <strong className="text-neutral-900 uppercase">{verifiedStudent.matricNo}</strong></p>
                  <p><span className="text-neutral-400 font-medium">Institutional Email:</span> <strong className="text-neutral-900">{verifiedStudent.email}</strong></p>
                  <p><span className="text-neutral-400 font-medium">Phone Number:</span> <strong className="text-neutral-900">{verifiedStudent.phoneNo}</strong></p>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">Target Executive Office Position</label>
                  <select
                    required
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 focus:bg-white text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition h-11"
                  >
                    <option value="">Select a Position</option>
                    <option value="President">President</option>
                    <option value="Vice President">Vice President</option>
                    <option value="Secretary">Secretary</option>
                    <option value="Treasurer">Treasurer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">Manifesto</label>
                  <textarea
                    required
                    value={manifesto}
                    onChange={(e) => setManifesto(e.target.value)}
                    className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 focus:bg-white text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition h-24"
                    placeholder="Enter your manifesto here..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={registering}
                  className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-sm transition disabled:opacity-40"
                >
                  {registering ? "Registering Candidate..." : "Register Candidate"}
                </button>
              </form>
            )}
          </div>
        ) : (
          /* Candidates Matrix View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidates.map((candidate) => (
              <div key={candidate.id} className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
                <h3 className="text-lg font-bold text-neutral-900 mb-1">{candidate.name}</h3>
                <p className="text-sm text-neutral-600 mb-2">{candidate.position}</p>
                <p className="text-base text-neutral-800">{candidate.manifesto}</p>
              </div>
            ))}
            {candidates.length === 0 && (
              <p className="text-sm text-neutral-500 col-span-full text-center">No candidates have registered yet.</p>
            )}
          </div>
        )}
        </div>
        </main>
  )}
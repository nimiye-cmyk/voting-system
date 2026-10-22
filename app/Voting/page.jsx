"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firestore";
import { collection, getDocs, query } from "firebase/firestore";
import { FingerprintVote } from "@/components/FingerprintVote";
import { useSession } from "next-auth/react";

export default function VotePage() {
  const { data: session, status: sessionStatus } = useSession();
  const [candidates, setCandidates] = useState([]);
  const [groupedCandidates, setGroupedCandidates] = useState({});
  const [loading, setLoading] = useState(true);
  
  // Track selected candidate IDs per position role key
  // Format: { "SUG President": "candidate_doc_id", "Vice President": "candidate_doc_id_2" }
  const [ballotSelections, setBallotSelections] = useState({});

  // Dynamic Session Extraction falling back securely to your local test signature criteria
  const userMatricNo = session?.user?.matricNo || "2024/ND2/COMP/001"; 

  useEffect(() => {
    async function fetchCandidatesFromRegistry() {
      try {
        const q = query(collection(db, "candidates"));
        const querySnapshot = await getDocs(q);
        const fetchedList = [];
        
        querySnapshot.forEach((doc) => {
          fetchedList.push({ id: doc.id, ...doc.data() });
        });

        setCandidates(fetchedList);

        // Group individual candidates by their running position
        const groups = fetchedList.reduce((acc, candidate) => {
          const pos = candidate.position || "Other Offices";
          if (!acc[pos]) acc[pos] = [];
          acc[pos].push(candidate);
          return acc;
        }, {});

        setGroupedCandidates(groups);
      } catch (error) {
        console.error("Error connecting to live candidates repository ledger:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCandidatesFromRegistry();
  }, []);

  // Update specific ballot selection parameters
  const selectCandidateForPosition = (positionName, candidateId) => {
    setBallotSelections((prev) => ({
      ...prev,
      [positionName]: candidateId,
    }));
  };

  // Prevent loading leaks if session checks or firestore records are pending
  if (loading || sessionStatus === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Convert selections object into a flat array of IDs to forward to the hardware signer widget
  const finalSelectedIdsArray = Object.values(ballotSelections);
  const totalPositionsToVote = Object.keys(groupedCandidates).length;

  return (
    <main className="min-h-screen bg-neutral-50 py-10 px-4 sm:px-6 lg:px-8 antialiased select-none">
      <div className="max-w-4xl mx-auto">
        
        {/* Page Header Titles */}
        <div className="text-center mb-10">
          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            SUG Live Ballot Terminal
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-neutral-900 mt-3 mb-2">Cast Your Official Ballot</h1>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto leading-relaxed">
            Select one preferred candidate across the positions listed below. Your choices will be cryptographically sealed via biometric signature.
          </p>
        </div>

        {totalPositionsToVote === 0 ? (
          <div className="text-center p-12 bg-white rounded-2xl border border-neutral-200/60 text-neutral-400 shadow-sm max-w-md mx-auto">
            No active candidate profiles were fetched from the electoral database registry.
          </div>
        ) : (
          <div className="space-y-8">
            {/* Loop through each distinct electoral office position dynamically */}
            {Object.entries(groupedCandidates).map(([positionName, positionContestants]) => (
              <div 
                key={positionName} 
                className="bg-white border border-neutral-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4"
              >
                {/* Executive Position Headline */}
                <div className="border-b border-neutral-100 pb-3">
                  <h2 className="text-lg font-black text-neutral-900 uppercase tracking-tight">{positionName}</h2>
                  <p className="text-xs text-neutral-400 mt-0.5">Select exactly one contestant to fill this administrative executive role slot.</p>
                </div>

                {/* Head-to-Head Candidate Option Comparison Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {positionContestants.map((candidate) => {
                    const isSelected = ballotSelections[positionName] === candidate.id;
                    return (
                      <div
                        key={candidate.id}
                        onClick={() => selectCandidateForPosition(positionName, candidate.id)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-3 relative group touch-manipulation active:scale-[0.99]
                          ${isSelected 
                            ? "border-emerald-600 bg-emerald-50/20 ring-2 ring-emerald-600/10" 
                            : "border-neutral-200 hover:border-neutral-300 bg-white"
                          }`}
                      >
                        <div className="flex items-start gap-3">
                          {/* Tactile Mobile Radio Target Indicator */}
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors
                            ${isSelected ? "border-emerald-600 bg-emerald-600 text-white" : "border-neutral-300 bg-white"}`}
                          >
                            {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>

                          <div className="space-y-1 min-w-0">
                            <h3 className="font-extrabold text-neutral-900 text-sm tracking-tight uppercase truncate">
                              {candidate.name}
                            </h3>
                            <p className="inline-block bg-neutral-100 text-neutral-600 text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">
                              {candidate.party || "Independent"}
                            </p>
                          </div>
                        </div>

                        {/* Brief Manifesto summary profile box logs */}
                        <p className="text-xs text-neutral-500 italic line-clamp-2 leading-relaxed px-1">
                          "{candidate.bio || "No platform summary manifesto was submitted by candidate profile scripts."}"
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Hardware Token Fingerprint Encryption Verification Hub Widget Trigger Section */}
            <div className="mt-10 border-t border-neutral-200 pt-6">
              <div className="bg-neutral-900 text-white p-6 rounded-2xl shadow-md space-y-4">
                <div className="space-y-1">
                  <h3 className="text-base font-bold tracking-tight">Authorize Cryptographic Ballot Sign Execution</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Once all candidate selections match your intent, lock your choices using your connected external USB thumbprint scanning agent.
                  </p>
                </div>

                {/* Micro Metadata Check log */}
                <div className="bg-neutral-800 p-3 rounded-xl border border-neutral-700/60 font-mono text-xs text-neutral-300 flex justify-between">
                  <span>Voter Matric: {userMatricNo}</span>
                  <span className={`${finalSelectedIdsArray.length === totalPositionsToVote ? "text-emerald-400" : "text-amber-400"} font-bold`}>
                    {finalSelectedIdsArray.length} of {totalPositionsToVote} Positions Chosen
                  </span>
                </div>

                {/* Submitting selections array cleanly down to standard native component interface hooks */}
                <FingerprintVote 
                  matricNo={userMatricNo} 
                  selectedCandidateId={finalSelectedIdsArray.length > 0 ? JSON.stringify(finalSelectedIdsArray) : null} 
                />
              </div>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}

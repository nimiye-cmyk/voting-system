"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firestore";
import { collection, onSnapshot } from "firebase/firestore";

export default function ResultsPage() {
  const [loading, setLoading] = useState(true);
  const [candidates, setCandidates] = useState([]);
  const [resultsTally, setResultsTally] = useState({});
  const [totalBallotsCast, setTotalBallotsCast] = useState(0);

  useEffect(() => {
    let unsubs = [];

    try {
      // 1. Listen to live candidates records stream
      const unsubCandidates = onSnapshot(collection(db, "candidates"), (candidateSnapshot) => {
        const candidateList = [];
        candidateSnapshot.forEach((doc) => {
          candidateList.push({ id: doc.id, ...doc.data() });
        });
        setCandidates(candidateList);

        // 2. Nest ballots listener to correlate structural tallies instantly
        const unsubBallots = onSnapshot(collection(db, "ballots"), (ballotSnapshot) => {
          setTotalBallotsCast(ballotSnapshot.size);

          // Initialize clean vote tracking map dictionary matrix
          const tallyMap = {};
          candidateList.forEach((c) => {
            tallyMap[c.id] = 0;
          });

          // Loop through cast ballots and increment candidate vote values
          ballotSnapshot.forEach((doc) => {
            const data = doc.data();
            const selections = data.selectionsArray || [];
            selections.forEach((candidateId) => {
              if (tallyMap[candidateId] !== undefined) {
                tallyMap[candidateId] += 1;
              }
            });
          });

          setResultsTally(tallyMap);
          setLoading(false);
        });

        unsubs.push(unsubBallots);
      });

      unsubs.push(unsubCandidates);

    } catch (error) {
      console.error("Error pooling structural synchronization states:", error);
      setLoading(false);
    }

    // Detach continuous web-socket listeners on component trace unmount
    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Group candidate profiles based on target office roles for head-to-head display metrics
  const positionsGroup = candidates.reduce((acc, candidate) => {
    const pos = candidate.position || "Other Offices";
    if (!acc[pos]) acc[pos] = [];
    acc[pos].push(candidate);
    return acc;
  }, {});

  return (
    <main className="min-h-screen bg-neutral-50 py-10 px-4 sm:px-6 lg:px-8 antialiased select-none">
      <div className="max-w-4xl mx-auto">
        
        {/* Results Page Dashboard Header */}
        <div className="text-center mb-10 flex flex-col items-center">
          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            Live IEC Mainframe Dashboard
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-neutral-900 mt-3 mb-2">Real-Time Election Analytics</h1>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-md leading-relaxed mb-6">
            Cryptographically accounted voter metrics streaming directly from decentralised external USB biometric signing sessions.
          </p>

          {/* Core Central Summary Metric Card Group */}
          <div className="bg-neutral-900 text-white rounded-2xl p-4 px-6 border border-neutral-800 flex items-center gap-4 shadow-sm w-fit">
            <div className="text-left">
              <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Total Ballots Cast</p>
              <p className="text-2xl font-black text-emerald-400 font-mono mt-0.5">{totalBallotsCast}</p>
            </div>
            <div className="w-px h-8 bg-neutral-800" />
            <div className="text-left">
              <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">System Status</p>
              <p className="text-xs font-bold text-neutral-200 mt-1 flex items-center gap-1">
                🔒 Sealed Ledger Enforced
              </p>
            </div>
          </div>
        </div>

        {Object.keys(positionsGroup).length === 0 ? (
          <div className="text-center p-12 bg-white rounded-2xl border border-neutral-200/60 text-neutral-400 shadow-sm max-w-md mx-auto">
            No active candidate profiles were fetched from the electoral database registry.
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(positionsGroup).map(([positionName, positionContestants]) => {
              
              // Calculate total votes generated strictly inside this office role pool category
              const totalOfficeVotes = positionContestants.reduce((sum, c) => sum + (resultsTally[c.id] || 0), 0);

              return (
                <div key={positionName} className="bg-white border border-neutral-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
                  <div className="border-b border-neutral-100 pb-3 flex justify-between items-end">
                    <div>
                      <h2 className="text-lg font-black text-neutral-900 uppercase tracking-tight">{positionName}</h2>
                      <p className="text-xs text-neutral-400 mt-0.5">Live poll split matrix analysis results</p>
                    </div>
                    <span className="font-mono text-xs text-neutral-500 bg-neutral-50 px-2.5 py-1 border rounded-lg">
                      {totalOfficeVotes} total votes
                    </span>
                  </div>

                  {/* Render Opposing Contestants Bars Stack */}
                  <div className="space-y-4 pt-2">
                    {positionContestants.map((candidate) => {
                      const candidateVotes = resultsTally[candidate.id] || 0;
                      
                      // Safeguard against division by zero errors if polls just loaded empty arrays
                      const votePercentage = totalOfficeVotes > 0 
                        ? Math.round((candidateVotes / totalOfficeVotes) * 100) 
                        : 0;

                      return (
                        <div key={candidate.id} className="space-y-1.5">
                          <div className="flex justify-between items-baseline text-sm">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="font-extrabold text-neutral-900 uppercase truncate text-sm">
                                {candidate.name}
                              </span>
                              <span className="inline-block bg-neutral-100 text-neutral-500 text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase flex-shrink-0">
                                {candidate.party}
                              </span>
                            </div>
                            <div className="font-mono text-xs text-neutral-600 flex-shrink-0 pl-2">
                              <strong className="text-neutral-900 font-bold text-sm">{candidateVotes}</strong> ({votePercentage}%)
                            </div>
                          </div>

                          {/* Graphical Visual Metric Percent Split Fill Row Track Bar Layout */}
                          <div className="w-full bg-neutral-100 h-3.5 rounded-full overflow-hidden relative border border-neutral-200/40">
                            <div 
                              className="bg-emerald-600 h-full rounded-full transition-all duration-500 border-r border-emerald-700/30"
                              style={{ width: `${votePercentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </main>
  );
}

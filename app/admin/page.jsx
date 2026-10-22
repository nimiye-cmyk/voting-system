"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firestore";
import { doc, setDoc, collection, onSnapshot, deleteDoc } from "firebase/firestore";

export default function AdminConsole() {
  // Candidate Creation State
  const [name, setName] = useState("");
  const [matricNo, setMatricNo] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [party, setParty] = useState("");
  const [position, setPosition] = useState("SUG President");
  const [bio, setBio] = useState("");
  const [candLoading, setCandLoading] = useState(false);

  // Live Candidates List State
  const [candidates, setCandidates] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);

  // Database Seed State
  const [seedStatus, setSeedStatus] = useState("idle");

  const availablePositions = [
    "SUG President",
    "Vice President",
    "General Secretary",
    "Financial Secretary",
    "Director of Sports",
    "Director of Welfare",
  ];

  // 1. Establish Real-Time WebSocket stream listener for Candidates
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "candidates"), (snapshot) => {
      const list = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setCandidates(list);
      setTableLoading(false);
    }, (error) => {
      console.error("Firestore stream error:", error);
      setTableLoading(false);
    });

    return () => unsub();
  }, []);

  // 2. Handler to register an official Candidate
  const handleAddCandidate = async (e) => {
    e.preventDefault();
    setCandLoading(true);
    try {
      const customId = `cand_${name.toLowerCase().replace(/\s+/g, "_")}`;
      
      await setDoc(doc(db, "candidates", customId), {
        name: name.trim(),
        matricNo: matricNo.trim(),
        email: email.trim().toLowerCase(),
        phoneNo: phoneNo.trim(),
        party: party.trim() || "Independent",
        position: position,
        bio: bio.trim() || "No manifesto summary provided.",
        registeredAt: new Date().toISOString(),
      });

      alert(`Candidate ${name} successfully registered into election directory!`);
      
      setName("");
      setMatricNo("");
      setEmail("");
      setPhoneNo("");
      setParty("");
      setBio("");
    } catch (error) {
      console.error(error);
      alert("Database error registering candidate profile.");
    } finally {
      setCandLoading(false);
    }
  };

  // 3. Destructive Action: Remove/Disqualify a candidate from live lists
  const handleDeleteCandidate = async (candidateId, candidateName) => {
    const confirmDelete = window.confirm(
      `SECURITY WARNING:\n\nYou are about to disqualify and delete "${candidateName}" from the election database. This will prevent students from voting for them. Proceed?`
    );
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "candidates", candidateId));
      alert("Candidate record successfully wiped from ledger.");
    } catch (error) {
      console.error(error);
      alert("Failed to delete candidate profile.");
    }
  };

  // 4. Automated Registry Script Injection
  const seedStudentDatabase = async () => {
    setSeedStatus("seeding");
    try {
      const mockStudents = [
        { matric: "2024/ND2/COMP/001", name: "Chinedu Okafor", email: "yourname@student.edu.ng", phone: "+2348012345678" },
        { matric: "2024/ND2/COMP/002", name: "Amina Yusuf", email: "amina@student.edu.ng", phone: "+2348087654321" },
        { matric: "2024/ND2/COMP/003", name: "Oluwaseun Balogun", email: "seun@student.edu.ng", phone: "+2347012345678" },
        { matric: "2024/ND2/COMP/004", name: "Blessing Effiong", email: "blessing@student.edu.ng", phone: "+2349012345678" },
      ];

      for (const student of mockStudents) {
        const safeDocId = student.matric.replace(/\//g, "_");
        
        await setDoc(doc(db, "students", safeDocId), {
          matricNo: student.matric,
          name: student.name,
          email: student.email,
          phoneNo: student.phone,
          hasVoted: false,
          isAccredited: true,
          faculty: "Engineering",
        });
      }

      setSeedStatus("success");
    } catch (error) {
      console.error(error);
      setSeedStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-neutral-100 py-8 px-4 sm:px-6 antialiased select-none">
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Upper Workspace Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Panel Box A: Candidate Configuration Registration */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-neutral-200/60">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-neutral-900">Aspirant Registration Panel</h2>
              <p className="text-xs text-neutral-400">Upload official profiles verified for ballot placement.</p>
            </div>

            <form onSubmit={handleAddCandidate} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Candidate Full Name</label>
                <input
                  type="text" required value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 focus:bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition h-11 text-black"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Matriculation No</label>
                  <input
                    type="text" required value={matricNo} onChange={(e) => setMatricNo(e.target.value)}
                    placeholder="2024/ND2/COMP/001"
                    className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 focus:bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition h-11 text-black"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Political Alliance</label>
                  <input
                    type="text" required value={party} onChange={(e) => setParty(e.target.value)}
                    placeholder="e.g. Tech Alliance"
                    className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 focus:bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition h-11 text-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Institutional Email</label>
                  <input
                    type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@student.edu.ng"
                    className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 focus:bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition h-11 text-black"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Phone Number</label>
                  <input
                    type="tel" required value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)}
                    placeholder="+234 80 1234 5678"
                    className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 focus:bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition h-11 text-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Target Executive Office</label>
                <select 
                  value={position} onChange={(e) => setPosition(e.target.value)}
                  className="w-full px-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition h-11 text-neutral-800"
                >
                  {availablePositions.map((pos) => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Manifesto Summary Bio</label>
                <textarea
                  rows={2} maxLength={180} value={bio} onChange={(e) => setBio(e.target.value)}
                  placeholder="Brief campaign agenda baseline platform statement..."
                  className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 focus:bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition resize-none leading-relaxed text-black"
                />
              </div>

              <button
                type="submit" disabled={candLoading}
                className="w-full h-11 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-sm disabled:opacity-50 active:scale-[0.99]"
              >
                              {candLoading ? "Registering Profile..." : "Authorize Candidate Listing"}
            </button>
          </form>
        </div>
</div>
</div>
</main>
  )}

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { matricNo, email, phoneNo } = await request.json();

    if (!matricNo || !email || !phoneNo) {
      return NextResponse.json(
        { error: "Matriculation Number, Email, and Phone Number are required fields." },
        { status: 400 }
      );
    }

    // Mock Database Lookup Record
    const mockStudentDatabaseRecord = {
      matricNo: "2024/ND2/COMP/001",
      email: "yourname@student.edu.ng",
      phoneNo: "+2348012345678",
      fullName: "ADAMU CHINEDU OLAOLUWA",
      isCandidateApplicant: true, // If true -> redirects to /Candidates, if false -> redirects to /Voting
      hasVoted: false,
      isAccredited: true,
    };

    if (
      matricNo.trim().toUpperCase() !== mockStudentDatabaseRecord.matricNo.toUpperCase() || 
      email.trim().toLowerCase() !== mockStudentDatabaseRecord.email.toLowerCase()
    ) {
      return NextResponse.json(
        { error: "Invalid credentials. Student record not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Student record verified. Initialize USB hardware link.",
      student: {
        name: mockStudentDatabaseRecord.fullName,
        matricNo: mockStudentDatabaseRecord.matricNo,
        isCandidate: mockStudentDatabaseRecord.isCandidateApplicant
      }
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

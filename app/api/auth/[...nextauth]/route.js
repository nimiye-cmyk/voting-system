import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Voter Credentials",
      // 1. Define the incoming form parameters parsed from the login layout submit event
      credentials: {
        voterId: { label: "Voter ID / Matric", type: "text" },
        secretPin: { label: "PIN", type: "password" },
        biometricVerified: { label: "Biometric Flag", type: "text" } // Passed as "true" from frontend hardware check
      },
      async authorize(credentials, req) {
        const { voterId, secretPin, biometricVerified } = credentials;

        // 2. Fallback boundary security check
        if (!voterId || !secretPin) {
          throw new Error("Voter Identification Code and Secret PIN are required.");
        }

        // 🔥 CRITICAL HARDWARE SECURITY ENFORCEMENT
        if (biometricVerified !== "true") {
          throw new Error("Biometric authorization missing. Please use your external USB thumbprint scanner.");
        }

        // 3. Mock Database Lookup Configuration (Hook your live database pool query here)
        const mockVoterDatabaseRecord = {
          id: "usr_9941",
          voterId: "SUG-2026-9941",
          matricNo: "2024/ND2/COMP/001",
          secretPin: "123456", 
          name: "ADAMU CHINEDU OLAOLUWA",
          role: "voter",
          hasVoted: false,
        };

        // Validate alphanumeric parameter matches
        const inputLower = voterId.trim().toLowerCase();
        const dbVoterLower = mockVoterDatabaseRecord.voterId.toLowerCase();
        const dbMatricLower = mockVoterDatabaseRecord.matricNo.toLowerCase();

        if (inputLower !== dbVoterLower && inputLower !== dbMatricLower) {
          throw new Error("Access Denied: Invalid Voter Code or Matric Number.");
        }

        if (secretPin !== mockVoterDatabaseRecord.secretPin) {
          throw new Error("Access Denied: Incorrect Secret Login PIN.");
        }

        if (mockVoterDatabaseRecord.hasVoted) {
          throw new Error("Security Restriction: This student profile has already cast a ballot.");
        }

        // 4. Return valid user object payload session token parameters to NextAuth on successful verification
        return {
          id: mockVoterDatabaseRecord.id,
          name: mockVoterDatabaseRecord.name,
          matricNo: mockVoterDatabaseRecord.matricNo,
          role: mockVoterDatabaseRecord.role
        };
      }
    })
  ],
  callbacks: {
    // Inject custom matric token information parameters inside JWT cookies
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.matricNo = user.matricNo;
        token.role = user.role;
      }
      return token;
    },
    // Make variables instantly readable client-side via standard useSession() hooks
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.matricNo = token.matricNo;
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: "/auth/login", // Redirects unauthorised sessions directly to your sleek mobile interface
    error: "/auth/login",  // Appends ?error= message string parameters straight inside the URL block
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

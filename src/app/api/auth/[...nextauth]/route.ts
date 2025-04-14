import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// In a real application, you would:
// 1. Connect to MongoDB
// 2. Verify credentials against stored admin user
// 3. Return session data

// For demo purposes, we're using hardcoded credentials
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // This is where you would verify the user credentials
        if (credentials?.username === "admin" && credentials?.password === "password") {
          return {
            id: "1",
            name: "Admin",
            email: "admin@example.com",
            role: "admin",
          }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key",
})

export { handler as GET, handler as POST }

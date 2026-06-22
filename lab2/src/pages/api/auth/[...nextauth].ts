import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "mock",
      clientSecret: process.env.GITHUB_SECRET || "mock",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "mock",
      clientSecret: process.env.GOOGLE_SECRET || "mock",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.username === "admin" &&
          credentials?.password === "admin"
        ) {
          return { id: "1", name: "Nancy", email: "nancy@example.com" };
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({


  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        if (!email || !password) {
          return null;
        }

        try {
          const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/user/${email}`
          );

          if (!data) {
            return null;
          }

          const isValid = bcrypt.compareSync(password, data.password);

          if (!isValid) {
            return null;
          }

          return data;
        } catch (error) {
          console.error("Error in authorize:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {},
  pages: {
    signIn: "/login", // Custom login page
  },
});

export { handler as GET, handler as POST };

import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

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
        const { data } = await axios.get(
          `https://babel-forge.vercel.app/api/user/${email}`
        );
        if (!data) {
          return null;
        }
        const isValid = bcrypt.compareSync(password, data.password);

        if (!isValid) {
          return null;
        }
        return data;
      },
    }),
  ],
  callbacks: {},
  pages: {
    signIn: "/login", // Custom login page
  },
});

export { handler as GET, handler as POST };

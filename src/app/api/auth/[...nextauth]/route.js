import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import {console} from "next/dist/compiled/@edge-runtime/primitives";

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
        console.log(credentials)
        if (!email || !password) {
          return null;
        }
        const { data } = await axios.get(
          `https://babelforgeserver.vercel.app/api/user/${email}`
        );
        console.log("Data::", data);
        if (!data) {
          return null;
        }
        const isValid = bcrypt.compareSync(password, data.password);
        console.log("isValid:", isValid);
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

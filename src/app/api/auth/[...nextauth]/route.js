import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import GoogleProvider from 'next-auth/providers/google';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const handler = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;

        // Check if email and password are provided
        if (!email || !password) {
          return null; // Return null if credentials are missing
        }

        // Add a 2-second delay before proceeding with authentication
        await delay(2000);

        // try {
        //   const { data } = await axios.get(
        //       `https://babelforgeserver.vercel.app/api/user/${email}`
        //   );
        //
        //   if (!data) {
        //     return null; // User not found
        //   }
        //
        //   // Validate password
        //   const isValid = bcrypt.compareSync(password, data.password);
        //
        //   if (!isValid) {
        //     return null; // Invalid password
        //   }
        //
        //   return data; // Return user data on successful login
        // } catch (error) {
        //   console.error("Error in authorize:", error);
        // return null
        // }

          return credentials; // Handle error by returning null

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
    signIn: '/login', // Custom login page
  },
});

export { handler as GET, handler as POST };

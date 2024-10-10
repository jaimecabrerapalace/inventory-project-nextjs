import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" }, // Updated placeholder to reflect username
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          return null; // Return null if missing credentials
        }

        // Fetch the user from the database
        const user = await prisma.usuario.findUnique({
          where: { username: credentials.username }
        });

        if (!user) {
          return null; // Return null if user not found
        }

        // Compare the hashed password with the provided password
        const isPasswordValid = credentials.password === user.password;

        if (!isPasswordValid) {
          return null; // Return null if password doesn't match
        }

        // Return the user object for the session with id and username
        return {
          id: user.id,
          username: user.username,
          // You can include more properties if needed
        };
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login", // Custom sign-in page
  },
  callbacks: {
    async jwt({ token, user }) {
      // Persist the user id and username in the JWT token
      if (user) {
        token.id = user.id;
        token.username = user.username; // Include username in token
      }
      return token;
    },
    async session({ session, token }) {
      // Send user information to the client side via session object
      if (session.user) {
        session.user.id = token.id;
        session.user.username = token.username; // Attach username to session user
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

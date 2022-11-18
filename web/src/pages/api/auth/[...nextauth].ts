import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  events: {
    async createUser({ user }) {
      await prisma.site.create({
        data: {
          domain: user.name?.toLowerCase().split(" ").join("") as string,
          description: "A cool description for my blog site",
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    },
  },
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },

    redirect({ baseUrl }) {
      return `${baseUrl}/dashboard`;
    },
  },

  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),

    // ...add more providers here
  ],
};

export default NextAuth(authOptions);

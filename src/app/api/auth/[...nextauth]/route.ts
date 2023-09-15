import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import MyAdapter from "@/db/adapter";
import sql from "@/db/db";

import { Session } from "next-auth";

export interface SessionWithId extends Session {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id: string | null;
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASS,
        },
      },
      from: process.env.EMAIL_SERVER_USER,
    }),
  ],
  adapter: MyAdapter(sql),
  callbacks: {
    session: ({ session, user }) => {
      const sessionWithId: SessionWithId = {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };
      return sessionWithId;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import MyAdapter from "@/db/adapter";
import sql from "@/db/db";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: MyAdapter(sql),
});

export { handler as GET, handler as POST };

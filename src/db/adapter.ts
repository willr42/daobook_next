import postgres from "postgres";
import { createUser, getUserByAccount, getUserByEmail, getUserById } from "./userQueries";
import { User } from "@/types";

/** @return { import("next-auth/adapters").Adapter } */
export default function MyAdapter(client: postgres.Sql, options = {}) {
  return {
    async createUser(userData: User) {
      const createdUser = await createUser(client, userData);
      return createdUser;
    },

    async getUser(id: string) {
      const foundUser = await getUserById(client, id);
      return foundUser;
    },

    async getUserByEmail(email: string) {
      const foundUser = await getUserByEmail(client, email);
      return foundUser;
    },

    async getUserByAccount({ providerAccountId, provider }) {
      const foundUser = await getUserByAccount(client, providerAccountId);
      return foundUser;
    },
    // TODO: finish rest of methods
    async updateUser(user) {
      return;
    },
    async deleteUser(userId) {
      return;
    },
    async linkAccount(account) {
      return;
    },
    async unlinkAccount({ providerAccountId, provider }) {
      return;
    },
    async createSession({ sessionToken, userId, expires }) {
      return;
    },
    async getSessionAndUser(sessionToken) {
      return;
    },
    async updateSession({ sessionToken }) {
      return;
    },
    async deleteSession(sessionToken) {
      return;
    },
    async createVerificationToken({ identifier, expires, token }) {
      return;
    },
    async useVerificationToken({ identifier, token }) {
      return;
    },
  };
}

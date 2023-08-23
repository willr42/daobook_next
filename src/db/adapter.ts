import postgres from "postgres";
import {
  createUser,
  deleteUser,
  getUserByAccount,
  getUserByEmail,
  getUserById,
  updateUserData,
} from "./userQueries";
import { User, Account } from "@/types";
import {
  createAccount,
  createSession,
  createVerificationToken,
  deleteSession,
  getSessionAndUser,
  unlinkAccount,
  updateSession,
  UseVerificationToken,
} from "./authQueries";

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

    async updateUser(user: User) {
      const updatedUser = await updateUserData(client, user);
      return updatedUser;
    },

    async deleteUser(userId: string) {
      const deletedUserCount = await deleteUser(client, userId);
      return deletedUserCount;
    },

    async linkAccount(account: Account) {
      const linkedAccount = await createAccount(client, account);
      return linkedAccount;
    },

    async unlinkAccount({ providerAccountId, provider }) {
      const deletedAccountCount = await unlinkAccount(client, providerAccountId);
      return deletedAccountCount;
    },

    async createSession({ sessionToken, userId, expires }) {
      const createdSession = await createSession(client, { sessionToken, userId, expires });
      return createdSession;
    },

    async getSessionAndUser(sessionToken) {
      const sessionAndUser = await getSessionAndUser(client, sessionToken);
      return sessionAndUser;
    },

    async updateSession({ sessionToken }) {
      const updatedSession = await updateSession(client, sessionToken);
      return updatedSession;
    },

    async deleteSession(sessionToken) {
      const deletedSessionCount = await deleteSession(client, sessionToken);
      return deletedSessionCount;
    },

    async createVerificationToken({ identifier, expires, token }) {
      const createdToken = await createVerificationToken(client, { identifier, expires, token });
      return createdToken;
    },

    async useVerificationToken({ identifier, token }) {
      const foundToken = await UseVerificationToken(client, { identifier, token });
      return foundToken;
    },
  };
}

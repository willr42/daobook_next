import postgres from "postgres";
import {
  createUser,
  deleteUser,
  getUserByAccount,
  getUserByEmail,
  getUserById,
  updateUserData,
} from "./userQueries";
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
import { VerificationToken } from "next-auth/adapters";

/** @return { import("next-auth/adapters").Adapter } */
export default function MyAdapter(client: postgres.Sql, options = {}) {
  return {
    async createUser(userData) {
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

    async updateUser(user) {
      const updatedUser = await updateUserData(client, user);
      return updatedUser;
    },

    async deleteUser(userId) {
      const deletedUserCount = await deleteUser(client, userId);
    },

    async linkAccount(account) {
      const linkedAccount = await createAccount(client, account);
      return linkedAccount;
    },

    async unlinkAccount({ providerAccountId, provider }) {
      const deletedAccountCount = await unlinkAccount(client, providerAccountId);
    },

    async createSession({ sessionToken, userId, expires }) {
      const createdSession = await createSession(client, { sessionToken, userId, expires });
      return createdSession;
    },

    async getSessionAndUser(sessionToken: string) {
      const sessionAndUser = await getSessionAndUser(client, sessionToken);
      return sessionAndUser;
    },

    async updateSession(sessionData) {
      const updatedSession = await updateSession(client, sessionData);
      return updatedSession;
    },

    async deleteSession(sessionToken) {
      const deletedSessionCount = await deleteSession(client, sessionToken);
    },

    async createVerificationToken({ identifier, expires, token }) {
      const createdToken = await createVerificationToken(client, { identifier, expires, token });
      return createdToken as VerificationToken;
    },

    async useVerificationToken({ identifier, token }) {
      const foundToken = await UseVerificationToken(client, { identifier, token });
      return foundToken as VerificationToken;
    },
  };
}

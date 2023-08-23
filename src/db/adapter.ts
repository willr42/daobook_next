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
import { createAccount, unlinkAccount } from "./accountQueries";

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
    //TODO insert new session into DB
    async createSession({ sessionToken, userId, expires }) {
      return;
    },
    // TODO return {user: User, session:Session} from db
    async getSessionAndUser(sessionToken) {
      return;
    },
    // TODO update session info in db
    async updateSession({ sessionToken }) {
      return;
    },
    // TODO delete session from DB
    async deleteSession(sessionToken) {
      return;
    },
    // TODO create verificationToken table, this is disconnected from all other tables
    // identifier: string, token: string, expires: timestamp
    async createVerificationToken({ identifier, expires, token }) {
      return;
    },
    async useVerificationToken({ identifier, token }) {
      return;
    },
  };
}

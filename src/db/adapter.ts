import postgres from "postgres";
import {
  createUser,
  deleteUser,
  getUserByAccount,
  getUserByEmail,
  getUserById,
  updateUserData,
} from "./userQueries";
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
    async updateUser(user: User) {
      const updatedUser = await updateUserData(client, user);
      return updatedUser;
    },
    async deleteUser(userId: string) {
      const deletedUserCount = await deleteUser(client, userId);
      return deletedUserCount;
    },
    // TODO: insert new account and return account
    async linkAccount(account) {
      return;
    },
    // TODO: delete account from DB
    async unlinkAccount({ providerAccountId, provider }) {
      return;
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

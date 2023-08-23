import { Account, User } from "@/types";
import { AdapterSession } from "next-auth/adapters";
import postgres from "postgres";

const createAccount = async (db: postgres.Sql, account: Account) => {
  const [dbAccount]: [Account?] = await db`
      INSERT INTO
      accounts ${db(account)}
      RETURNING *
  `;

  if (!dbAccount) {
    throw new Error("Something went wrong in creation");
  }

  return dbAccount;
};

const unlinkAccount = async (db: postgres.Sql, accountId: string) => {
  const deletedAccount = await db`
    DELETE FROM accounts
    WHERE account_id = ${accountId}`;
  return deletedAccount.count;
};

const createSession = async (db: postgres.Sql, sessionData: AdapterSession) => {
  const [createdSession]: [AdapterSession] = await db`
  INSERT INTO
  sessions ${db(sessionData)}
  RETURNING *`;

  return createdSession;
};

const updateSession = async (db: postgres.Sql, sessionData: AdapterSession) => {
  const [updatedSession]: [AdapterSession] = await db`
  UPDATE sessions
  SET ${db(sessionData)}
  WHERE id = ${sessionData.userId}
  RETURNING *`;

  return updatedSession;
};

const deleteSession = async (db: postgres.Sql, sessionToken) => {
  const deletedSession = await db`
    DELETE FROM sessions
    WHERE session_token = ${sessionToken}`;
  return deletedSession.count;
};

export { createAccount, unlinkAccount, createSession, updateSession, deleteSession };

import { Account, Session, User } from "@/types";
import postgres from "postgres";
import { getUserById } from "./userQueries";

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

const createSession = async (db: postgres.Sql, sessionData: Session) => {
  const [createdSession]: [Session?] = await db`
  INSERT INTO
  sessions ${db(sessionData)}
  RETURNING *`;

  if (!createdSession) {
    throw new Error("Something went wrong");
  }

  return createdSession;
};

const getSessionAndUser = async (db: postgres.Sql, sessionToken: string) => {
  const sessionCols = ["id", "expires", "sessionToken", "userId"];
  const [foundSession]: [Session?] = await db`
  SELECT ${db(sessionCols)}
  FROM sessions
  WHERE session_token = ${sessionToken}`;

  if (!foundSession) {
    return null;
  }

  const foundUser = await getUserById(db, foundSession.userId);

  if (!foundUser) {
    return null;
  }

  return {
    user: foundUser,
    session: foundSession,
  };
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

const createVerificationToken = async (db: postgres.Sql, verificationTokenData) => {
  const [verificationToken] = await db`
      INSERT INTO
      verification_tokens ${db(verificationTokenData)}
      RETURNING *
  `;

  if (!verificationToken) {
    throw new Error("Something went wrong in creation");
  }

  return verificationToken;
};

const UseVerificationToken = async (db: postgres.Sql, verificationTokenData) => {
  const [foundToken] = await db`
  SELECT ${db(["identifier", "expires", "token"])}
  FROM verification_tokens
  WHERE identifier = ${verificationTokenData.identifier}
  AND token = ${verificationTokenData.token}`;

  return foundToken;
};

export {
  createAccount,
  unlinkAccount,
  createSession,
  getSessionAndUser,
  updateSession,
  deleteSession,
  createVerificationToken,
  UseVerificationToken,
};

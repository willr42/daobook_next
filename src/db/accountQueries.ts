import { Account, User } from "@/types";
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

export { createAccount, unlinkAccount };

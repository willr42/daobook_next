import { Patient, User, UserToInsert } from "@/types";
import postgres from "postgres";

const createUser = async (db: postgres.Sql, doctor: UserToInsert) => {
  if (!doctor.pass) {
    throw new Error("No password provided");
  }

  const [dbUser]: [User?] = await db`
      INSERT INTO
      users ${db(doctor)}
      RETURNING id, first_name, last_name, email, email_verified, ahpra, role
  `;

  if (!dbUser) {
    throw new Error("Something went wrong in creation");
  }

  return dbUser;
};

const createPatient = async (db: postgres.Sql, patient: Patient) => {
  const [dbPatient]: [Patient?] = await db`
      INSERT INTO
      patients ${db(patient)}
      RETURNING patient_id, first_name, last_name, email, dob
  `;

  if (!dbPatient) {
    throw new Error("Something went wrong in creation");
  }
  return dbPatient;
};

const getUserCols = ["id", "role", "firstName", "lastName", "email", "emailVerified"];

const getUserById = async (db: postgres.Sql, userId: string) => {
  const [foundUser]: [User?] = await db`
  SELECT ${db(getUserCols)}
  FROM users
  WHERE id = ${userId}`;

  if (!foundUser) {
    throw new Error("User not found");
  }

  return foundUser;
};

const getUserByEmail = async (db: postgres.Sql, email: string) => {
  const [foundUser]: [User?] = await db`
  SELECT ${db(getUserCols)}
  FROM users
  WHERE email = ${email}`;

  if (!foundUser) {
    throw new Error("User not found");
  }

  return foundUser;
};

const getUserByAccount = async (db: postgres.Sql, providerAccountId: string) => {
  const [foundUser]: [User?] = await db`
  SELECT ${db(getUserCols)}
  FROM users
  JOIN accounts ON users.id = accounts.id
  WHERE accounts.providerAccountId = ${providerAccountId}`;

  if (!foundUser) {
    throw new Error("User not found");
  }

  return foundUser;
};

const updateUserData = async (db: postgres.Sql, user: User) => {
  const [updatedUser]: [User?] = await db`
  UPDATE users
  SET ${db(user)}
  WHERE id = ${user.id}
  RETURNING id, first_name, last_name, email, email_verified, ahpra, role`;

  if (!updatedUser) {
    throw new Error("User not updated");
  }

  return updatedUser;
};

const deleteUser = async (db: postgres.Sql, userId: string) => {
  const deletedUser = await db`
  DELETE FROM users
  WHERE id = ${userId}`;
  return deletedUser.count;
};

export {
  createUser,
  createPatient,
  getUserByEmail,
  getUserById,
  getUserByAccount,
  updateUserData,
  deleteUser,
};

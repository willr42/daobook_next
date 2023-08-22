import postgres from "postgres";

const createDoctorUser = async (db: postgres.Sql, doctor: User) => {

    if (!doctor.pass) {
      throw new Error("No password provided");
    }

    const [dbUser] = await db`
      INSERT INTO
      users ${db(doctor)}
      RETURNING user_id, first_name, last_name, email, email_verified, ahpra, role
  `;

    return dbUser;
};

const createPatient = async (db: postgres.Sql, patient: Patient) => {

    const [dbPatient] = await db`
      INSERT INTO
      patients ${db(patient)}
      RETURNING patient_id, first_name, last_name, email, dob
  `;
    return dbPatient;
};

const getUserCols = ["userId", "role", "firstName", "lastName", "email", "emailVerified"]

const getUserById = async (db: postgres.Sql, userId: string) => {

  const [foundUser] = await db`
  SELECT ${db(getUserCols)}
  FROM users
  WHERE user_id = ${userId}`;

  return foundUser;
};

const getUserByEmail = async (db: postgres.Sql, email: string) => {

  const [foundUser] = await db`
  SELECT user_id, role, first_name, last_name, email, email_verified
  FROM users
  WHERE email = ${email}`;

  return foundUser;
};
export { createDoctorUser, createPatient, getUserByEmail, getUserById };

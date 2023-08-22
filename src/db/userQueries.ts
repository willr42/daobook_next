import postgres from "postgres";

const createDoctorUser = async (db: postgres.Sql, doctor: User) => {
    if (!doctor.pass) {
      throw new Error("No password provided");
    }

    const [doctorUser] = await db`
      INSERT INTO
      users (pass, role, first_name, last_name, ahpra, email) 
      VALUES
      (${doctor.pass}, ${doctor.role}, ${doctor.firstName}, ${doctor.lastName}, ${doctor.ahpra}, ${doctor.email})
      RETURNING user_id, first_name, last_name, email, email_verified, ahpra, role
  `;

    const finalDoctor = {
      userId: doctorUser.user_id,
      email: doctorUser.email,
      emailVerified: doctorUser.email_verified,
      firstName: doctorUser.first_name,
      lastName: doctorUser.last_name,
      ahpra: doctorUser.ahpra,
      role: doctorUser.role
    };

    return finalDoctor;
};

const createPatient = async (db: postgres.Sql, patient: Patient) => {
    const [patientUser] = await db`
      INSERT INTO
      patients (first_name, last_name, email, dob) 
      VALUES
      (${patient.firstName}, ${patient.lastName}, ${patient.email}, ${patient.dob})
      RETURNING patient_id, first_name, last_name, email, dob
  `;

    const finalPatient = {
      patientId: patientUser.patient_id,
      email: patientUser.email,
      firstName: patientUser.first_name,
      lastName: patientUser.last_name,
      dob: patientUser.dob,
    };

    return finalPatient;
};

const getUserById = async (db: postgres.Sql, userId: string) => {
  const [foundUser] = await db`
  SELECT user_id, role, first_name, last_name, email, email_verified
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

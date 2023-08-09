import postgres from "postgres";

const createDoctorUser = async (db: postgres.Sql, doctor: DoctorUser) => {
  const createdDoctor = await db.begin(async (db) => {
    if (!doctor.pass) {
      throw new Error("No password provided");
    }

    const [doctorUser] = await db`
      INSERT INTO
      users (pass, role_id, first_name, last_name, email) 
      VALUES
      (${doctor.pass}, ${doctor.role_id}, ${doctor.first_name}, ${doctor.last_name}, ${doctor.email})
      RETURNING user_id
  `;

    const [doctorDoctor] = await db`
        INSERT INTO
        doctors (doctor_id, ahpra)
        VALUES
        (${doctorUser.user_id}, ${doctor.ahpra})
        RETURNING *`;
    return doctorDoctor;
  });
  return createdDoctor;
};

const createPatientUser = async (db: postgres.Sql, patient: PatientUser) => {
  const createdPatient = await db.begin(async (db) => {
    if (!patient.pass) {
      throw new Error("No password provided");
    }

    const [patientUser] = await db`
      INSERT INTO
      users (pass, role_id, first_name, last_name, email) 
      VALUES
      (${patient.pass}, ${patient.role_id}, ${patient.first_name}, ${patient.last_name}, ${patient.email})
      RETURNING user_id
  `;

    const [patientPatient] = await db`
        INSERT INTO
        patients (patient_id, dob)
        VALUES
        (${patientUser.user_id}, ${patient.dob})
        RETURNING *`;
    return patientPatient;
  });
  return createdPatient;
};

export { createDoctorUser, createPatientUser };

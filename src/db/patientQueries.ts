import { Patient, DatabasePatient } from "@/types";
import postgres from "postgres";

const LimitedPatientInfoCol = ["patient_id", "first_name", "last_name"];

const getAllPatients = async (db: postgres.Sql, userEmail: string) => {
  if (!userEmail) {
    return null;
  }

  const foundPatients: DatabasePatient[] = await db`
  SELECT ${db(LimitedPatientInfoCol)}
  FROM patients
  JOIN users
  ON patients.doctor_id = users.id
  WHERE users.email = ${userEmail}`;

  if (!foundPatients) {
    return null;
  }

  return foundPatients;
};

const PatientInfoCols = ["patient_id", "first_name", "last_name", "email", "dob"];

const getPatient = async (db: postgres.Sql, patientId: string) => {
  if (!patientId) {
    return null;
  }

  const [foundPatient]: [DatabasePatient?] = await db`
  SELECT ${db(PatientInfoCols)}
  FROM patients
  WHERE patient_id = ${patientId}`;

  if (!foundPatient) {
    return null;
  }

  return foundPatient;
};

const createNewPatient = async (db: postgres.Sql, patient: Patient) => {
  const [existingPatient] = await db`
  SELECT ${db(PatientInfoCols)}
  FROM patients
  WHERE email = ${patient.email}`;

  if (existingPatient) {
    throw new Error("Patient with that email already exists");
  }

  const [dbPatient]: [DatabasePatient?] = await db`
      INSERT INTO
      patients ${db(patient)}
      RETURNING patient_id, first_name, last_name, email, dob
  `;

  if (!dbPatient) {
    throw new Error("Something went wrong in creation");
  }
  return dbPatient;
};

export { getAllPatients, getPatient, createNewPatient };

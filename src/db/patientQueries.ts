import { Patient, PatientDatabase } from "@/types";
import postgres from "postgres";

const LimitedPatientInfoCol = ["patient_id", "first_name", "last_name"];

const getAllPatients = async (db: postgres.Sql, userEmail: string) => {
  if (!userEmail) {
    return null;
  }
  const foundPatients: Patient[] = await db`
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

const createNewPatient = async (db: postgres.Sql, patient: Patient) => {
  const [dbPatient]: [PatientDatabase?] = await db`
      INSERT INTO
      patients ${db(patient)}
      RETURNING patient_id, first_name, last_name, email, dob
  `;

  if (!dbPatient) {
    throw new Error("Something went wrong in creation");
  }
  return dbPatient;
};
export { getAllPatients, createNewPatient };

import { Patient } from "@/types";
import postgres from "postgres";

const LimitedPatientInfoCol = ["patient_id", "first_name", "last_name"];

const getAllPatients = async (db: postgres.Sql, userEmail: string) => {
  if (!userEmail) {
    return null;
  }
  console.log("User email: ", userEmail);
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

export { getAllPatients };

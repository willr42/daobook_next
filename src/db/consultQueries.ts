import { Consult } from "@/types";
import postgres from "postgres";

const createConsult = async (db: postgres.Sql, consult: Consult) => {
  const [createdConsult] = await db`
  INSERT INTO
  consults ${db(consult)}
    RETURNING *
  `;
  return createdConsult;
};

const LimitedConsultsInfoCol = ["consult_id", "consult_time"];

const getConsults = async (db: postgres.Sql, patientId: string) => {
  if (!patientId) {
    return null;
  }

  const foundConsults: Consult[] = await db`
  SELECT ${db(LimitedConsultsInfoCol)}
  FROM consults
  WHERE patient_id = ${patientId}`;

  if (!foundConsults) {
    return null;
  }

  return foundConsults;
};

const getConsult = async (db: postgres.Sql, patientId: string, consultId: string) => {
  if (!consultId) {
    return null;
  }

  const LimitedConsultInfoCol = [
    "consultTime",
    "mainComplaint",
    "sessionNotes",
    "tongue",
    "pulse",
    "prescriptionName",
    "prescriptionComposition",
    "prescriptionDosage",
    "prescriptionNotes",
  ];

  const [foundConsult]: [Consult] = await db`
  SELECT ${db(LimitedConsultInfoCol)} 
  FROM consults
  WHERE patient_id = ${patientId}
  AND consult_id = ${consultId}`;

  return foundConsult;
};

const updateConsult = async (db: postgres.Sql, newConsultData: Consult) => {
  if (!newConsultData) {
    return null;
  }

  const [updatedConsult]: [Consult] = await db`
  UPDATE consults
  SET ${db(newConsultData)}
  WHERE patient_id = ${newConsultData.patientId}
  AND consult_id = ${newConsultData.consultId}
  RETURNING *`;

  return updatedConsult;
};

export { createConsult, getConsults, getConsult, updateConsult };

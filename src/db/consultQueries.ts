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

const LimitedConsultInfoCol = ["consult_id", "consult_time"];

const getConsults = async (db: postgres.Sql, patientId: string) => {
  if (!patientId) {
    return null;
  }

  const foundConsults: Consults[] = await db`
  SELECT ${db(LimitedConsultInfoCol)}
  FROM consults
  WHERE patient_id = ${patientId}`;

  if (!foundConsults) {
    return null;
  }

  return foundConsults;
};

export { createConsult, getConsults };

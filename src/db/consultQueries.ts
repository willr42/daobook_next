import postgres from "postgres";

const createConsult = async (db: postgres.Sql, consult: Consult) => {
  const [createdConsult] = await db`
  INSERT INTO
  consults (patient_id, doctor_id, consult_time, main_complaint, tongue, pulse,
     prescription_name, prescription_composition, prescription_dosage, prescription_notes)
  VALUES
  (${consult.patient_id}, ${consult.doctor_id}, ${consult.consult_time}, ${consult.main_complaint}, ${consult.tongue}, ${consult.pulse},
     ${consult.prescription_name}, ${consult.prescription_composition}, ${consult.prescription_dosage}, ${consult.prescription_notes})
    RETURNING *
  `;
  return createdConsult;
};

export { createConsult };

import postgres from "postgres";

const createConsult = async (db: postgres.Sql, consult: Consult) => {
  const [createdConsult] = await db`
  INSERT INTO
  consults (patient_id, user_id, consult_time, main_complaint, tongue, pulse,
     prescription_name, prescription_composition, prescription_dosage, prescription_notes)
  VALUES
  (${consult.patientId}, ${consult.userId}, ${consult.consultTime}, ${consult.mainComplaint}, ${consult.tongue}, ${consult.pulse},
     ${consult.prescriptionName}, ${consult.prescriptionComposition}, ${consult.prescriptionDosage}, ${consult.prescriptionNotes})
    RETURNING *
  `;
  return createdConsult;
};

export { createConsult };

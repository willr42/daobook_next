import sql from "@/db/db";
import postgres, { Row } from "postgres";
import * as argon2 from "argon2";
import { createDoctorUser, createPatientUser } from "./userQueries";
import { createConsult } from "./consultQueries";

const seedRoles = async (sql: postgres.Sql) => {
  const [adminRole] = await sql`
      INSERT INTO 
      roles (role_name)
      SELECT ('administrator')
      WHERE NOT EXISTS 
        (SELECT 1 
        FROM roles 
        WHERE role_name = 'administrator')
      RETURNING *`;

  const [patientRole] = await sql`
      INSERT INTO
      roles (role_name)
      SELECT ('patient')
      WHERE NOT EXISTS 
        (SELECT 1 
        FROM roles 
        WHERE role_name = 'patient')
      RETURNING *`;

  const [doctorRole] = await sql`
      INSERT INTO
      roles (role_name)
      SELECT ('doctor')
      WHERE NOT EXISTS 
        (SELECT 1 
        FROM roles 
        WHERE role_name = 'doctor')
      RETURNING *`;

  return {
    adminRole,
    patientRole,
    doctorRole,
  };
};

type roleObj = {
  adminRole: Row;
  patientRole: Row;
  doctorRole: Row;
};

const seedUsers = async (sql: postgres.Sql, roleObj: roleObj) => {
  const doctorHash = await argon2.hash("doctorPass");

  const doctorToInsert: DoctorUser = {
    first_name: "doctorFirst",
    last_name: "doctorLast",
    email: "testDoctor@example.com",
    pass: doctorHash,
    role_id: roleObj.doctorRole.role_id,
    ahpra: "MED0001206214",
  };

  const doctorUser = await createDoctorUser(sql, doctorToInsert);

  const patientHash = await argon2.hash("patientPass");
  const patientDob = new Date(1993, 7, 15);

  const patientToInsert: PatientUser = {
    first_name: "patientFirst",
    last_name: "patientLast",
    email: "testPatient@example.com",
    pass: patientHash,
    role_id: roleObj.patientRole.role_id,
    dob: patientDob,
  };

  const patientUser = await createPatientUser(sql, patientToInsert);

  return {
    doctorUser,
    patientUser,
  };
};

type usersObj = {
  doctorUser: postgres.Row;
  patientUser: postgres.Row;
};

const seedConsults = async (sql: postgres.Sql, usersObj: usersObj) => {
  const consultToInsert: Consult = {
    patient_id: usersObj.patientUser.patient_id,
    doctor_id: usersObj.doctorUser.doctor_id,
    consult_time: new Date(2023, 5, 5, 9, 30),
    main_complaint: "Test main complaint",
    tongue: "Test tongue value",
    pulse: "Test pulse value",
    prescription_name: "Test prescription name",
    prescription_composition: "Test prescription composition",
    prescription_dosage: "Test prescription dosage",
    prescription_notes: "Test prescription notes",
  };
  const insertedConsult = await createConsult(sql, consultToInsert);
  return insertedConsult;
};

const runSeed = async (sql: postgres.Sql) => {
  try {
    const roleObj = await seedRoles(sql);
    console.log(roleObj);
    const usersObj = await seedUsers(sql, roleObj);
    console.log(usersObj);
    const consultObj = await seedConsults(sql, usersObj);
    console.log(consultObj);
  } catch (error) {
    console.error(error);
  }
};

runSeed(sql);

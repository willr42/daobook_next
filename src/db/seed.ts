import sql from "@/db/db";
import postgres from "postgres";
import * as argon2 from "argon2";
import { createDoctorUser, createPatient, getUserByEmail, getUserById } from "./userQueries";
import { createConsult } from "./consultQueries";

const seedUsers = async (sql: postgres.Sql) => {
  const userHash = await argon2.hash("doctorPass");

  const doctorToInsert: User = {
    firstName: "doctorFirst",
    lastName: "doctorLast",
    email: "testDoctor@example.com",
    pass: userHash,
    role: "user",
    ahpra: "MED0001206214",
  };

  const doctorUser = await createDoctorUser(sql, doctorToInsert);

  const patientDob = new Date(1993, 7, 15);

  const patientToInsert: Patient = {
    firstName: "patientFirst",
    lastName: "patientLast",
    email: "testPatient@example.com",
    dob: patientDob,
  };

  const patient = await createPatient(sql, patientToInsert);

  return {
    doctorUser,
    patient,
  };
};

type usersObj = {
  doctorUser: UserDatabase;
  patient: PatientDatabase;
};

const seedConsults = async (sql: postgres.Sql, usersObj: usersObj) => {
  const consultToInsert: Consult = {
    patientId: usersObj.patient.patientId,
    userId: usersObj.doctorUser.userId,
    consultTime: new Date(2023, 5, 5, 9, 30),
    mainComplaint: "Test main complaint",
    tongue: "Test tongue value",
    pulse: "Test pulse value",
    prescriptionName: "Test prescription name",
    prescriptionComposition: "Test prescription composition",
    prescriptionDosage: "Test prescription dosage",
    prescriptionNotes: "Test prescription notes",
  };
  const insertedConsult = await createConsult(sql, consultToInsert);
  return insertedConsult;
};

const runSeed = async (sql: postgres.Sql) => {
  try {
    const usersObj = await seedUsers(sql);
    console.log(usersObj);
    const consultObj = await seedConsults(sql, usersObj);
    console.log(consultObj);
  } catch (error) {
    console.error(error);
  }
};

runSeed(sql);

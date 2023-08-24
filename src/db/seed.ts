import sql from "@/db/db";
import postgres from "postgres";
import * as argon2 from "argon2";
import { createUser, createPatient, updateUserData } from "./userQueries";
import { createConsult } from "./consultQueries";
import { Patient, PatientDatabase, User, Consult, UserToInsert } from "@/types";

const seedUsers = async (sql: postgres.Sql) => {
  const doctorToInsert: UserToInsert = {
    name: "doctorFirst doctorLast",
    email: "testDoctor@example.com",
    role: "user",
    ahpra: "MED0001206214",
  };

  const doctorUser = await createUser(sql, doctorToInsert);

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
  doctorUser: User;
  patient: PatientDatabase;
};

const seedConsults = async (sql: postgres.Sql, usersObj: usersObj) => {
  const consultToInsert: Consult = {
    patientId: usersObj.patient.patientId,
    id: usersObj.doctorUser.id,
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
    const consultObj = await seedConsults(sql, usersObj);
    const userUpdate = {
      ...usersObj.doctorUser,
      firstName: "updatedFirst",
      lastName: "updatedLast",
    };
    const updatedUser = await updateUserData(sql, userUpdate);
    console.log(updatedUser);
  } catch (error) {
    console.error(error);
  }
};

runSeed(sql);

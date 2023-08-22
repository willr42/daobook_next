import { AdapterUser } from "next-auth/adapters";

export interface User extends AdapterUser {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  ahpra: string;
  pass?: string;
}

export interface UserToInsert extends Partial<User> {
  id?: string;
  emailVerified?: Date;
}

export interface Patient {
  firstName: string;
  lastName: string;
  email: string;
  dob: Date;
}

export interface PatientDatabase extends Patient {
  patientId: string;
}

export type Consult = {
  patientId: string;
  id: string;
  consultTime: Date;
  mainComplaint: string;
  tongue: string;
  pulse: string;
  prescriptionName: string;
  prescriptionComposition: string;
  prescriptionDosage: string;
  prescriptionNotes: string;
};

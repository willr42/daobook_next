import { AdapterAccount, AdapterSession, AdapterUser } from "next-auth/adapters";

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
  image?: string;
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

type ProviderType = "email" | "oauth" | "credentials";

export interface Account extends AdapterAccount {
  id: string;
  type: ProviderType;
  provider: string;
  providerAccountId: string;
  refreshToken: string;
  accessToken: string;
  expiresAt: Date;
  tokenType: string;
  scope: string;
  idToken: string;
  sessionState: string;
}

export interface Session extends AdapterSession {}

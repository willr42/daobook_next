interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  ahpra: string;
  pass?: string;
}

interface UserDatabase extends User {
  userId: string;
  emailVerified: Date;
  updatedAt?: Date;
}

interface Patient {
  firstName: string;
  lastName: string;
  email: string;
  dob: Date;
}

interface PatientDatabase extends Patient {
  patientId: string;
}

type Consult = {
  patientId: string;
  userId: string;
  consultTime: Date;
  mainComplaint: string;
  tongue: string;
  pulse: string;
  prescriptionName: string;
  prescriptionComposition: string;
  prescriptionDosage: string;
  prescriptionNotes: string;
};

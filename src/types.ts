interface User {
  role_id: number;
  first_name: string;
  last_name: string;
  email: string;
  pass?: string;
}

interface DoctorUser extends User {
  ahpra: string;
}

interface PatientUser extends User {
  dob: Date;
}

interface UserDatabase extends User {
  user_id: number;
  created_at: Date;
  updated_at: Date;
}

type Consult = {
  patient_id: number;
  doctor_id: number;
  consult_time: Date;
  main_complaint: string;
  tongue: string;
  pulse: string;
  prescription_name: string;
  prescription_composition: string;
  prescription_dosage: string;
  prescription_notes: string;
};

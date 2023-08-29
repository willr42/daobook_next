"use server";

import sql from "@/db/db";
import { createNewPatient } from "@/db/patientQueries";

export type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  dob: Date;
  phoneNumber: string;
  medications: string;
  healthHistory: string;
};

export async function action(data: FormData) {
  const newPatient = await createNewPatient(sql, data);
  return newPatient;
}

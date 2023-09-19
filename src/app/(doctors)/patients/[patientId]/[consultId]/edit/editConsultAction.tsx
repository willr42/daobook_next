"use server";

import { updateConsult } from "@/db/consultQueries";
import sql from "@/db/db";

export type FormData = {
  patientId: string;
  id: string;
  consultId: string;
  consultTime: Date;
  mainComplaint: string;
  sessionNotes: string;
  tongue: string;
  pulse: string;
  prescriptionName: string;
  prescriptionComposition: string;
  prescriptionDosage: string;
  prescriptionNotes: string;
};

export async function action(data: FormData) {
  const finalData = data;

  try {
    const updatedConsult = await updateConsult(sql, data);
    return { data: updatedConsult, error: null };
  } catch (e) {
    if (typeof e === "string") {
      return { error: e, data: null };
    } else if (e instanceof Error) {
      return { error: e.message, data: null };
    }
  }
}

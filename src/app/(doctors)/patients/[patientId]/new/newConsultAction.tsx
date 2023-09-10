"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import sql from "@/db/db";
import { getServerSession } from "next-auth";

export type FormData = {
  patientId: string;
  id: string;
  consultTime: string;
  mainComplaint: string;
  tongue: string;
  pulse: string;
  prescriptionName: string;
  prescriptionComposition: string;
  prescriptionDosage: string;
  prescriptionNotes: string;
};

export async function action(data: FormData) {
  const sessionData = await getServerSession(authOptions);
  const finalData = data;
  finalData.id = sessionData?.user?.id;
  console.log(finalData);
  try {
    // TODO: new consult
    // const newConsult = await createNewConsult(sql, data);
    let newConsult;
    return { data: newConsult, error: null };
  } catch (e) {
    if (typeof e === "string") {
      return { error: e, data: null };
    } else if (e instanceof Error) {
      return { error: e.message, data: null };
    }
  }
}

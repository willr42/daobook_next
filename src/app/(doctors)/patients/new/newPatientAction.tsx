"use server";

import { SessionWithId, authOptions } from "@/app/api/auth/[...nextauth]/route";
import sql from "@/db/db";
import { createNewPatient } from "@/db/patientQueries";
import { getServerSession } from "next-auth";

export type FormData = {
  doctorId: string | null | undefined;
  firstName: string;
  lastName: string;
  email: string;
  dob: Date;
  phoneNumber: string;
  medications: string;
  healthHistory: string;
};

export async function action(data: FormData) {
  const sessionData = (await getServerSession(authOptions)) as SessionWithId;
  const finalData = data;
  finalData.doctorId = sessionData?.user?.id;
  try {
    if (!finalData.doctorId) {
      throw new Error("Something went wrong");
    }
    const newPatient = await createNewPatient(sql, data);
    return { data: newPatient, error: null };
  } catch (e) {
    if (typeof e === "string") {
      return { error: e, data: null };
    } else if (e instanceof Error) {
      return { error: e.message, data: null };
    }
  }
}

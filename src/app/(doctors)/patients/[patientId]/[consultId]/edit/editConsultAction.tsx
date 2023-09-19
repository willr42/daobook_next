"use server";

import { updateConsult } from "@/db/consultQueries";
import sql from "@/db/db";
import { ConsultFormData } from "../page";

export async function action(data: ConsultFormData) {
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

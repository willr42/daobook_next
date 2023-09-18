"use server";

import { SessionWithId, authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createConsult } from "@/db/consultQueries";
import sql from "@/db/db";
import { Consult } from "@/types";
import { getServerSession } from "next-auth";

export async function action(data: Consult) {
  const sessionData = (await getServerSession(authOptions)) as SessionWithId;
  const finalData = data;
  finalData.id = sessionData?.user?.id;

  try {
    const newConsult = await createConsult(sql, finalData);
    return { data: newConsult, error: null };
  } catch (e) {
    if (typeof e === "string") {
      return { error: e, data: null };
    } else if (e instanceof Error) {
      return { error: e.message, data: null };
    }
  }
}

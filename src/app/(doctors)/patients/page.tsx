import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import sql from "@/db/db";
import { getAllPatients } from "@/db/patientQueries";
import { getServerSession } from "next-auth";
import Link from "next/link";

const getPatients = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null;
  }

  const res = await getAllPatients(sql, session?.user?.email);
  return res;
};

export default async function PatientList() {
  const patientData = await getPatients();
  return (
    <div>
      {patientData?.length > 0
        ? patientData.map((patient) => (
            <Link key={patient.email} href={`/patients/${patient.patientId}`}>
              {patient.firstName}
            </Link>
          ))
        : null}
    </div>
  );
}

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import sql from "@/db/db";
import { getAllPatients } from "@/db/patientQueries";
import { getServerSession } from "next-auth";

const getPatients = async () => {
  const session = await getServerSession(authOptions);
  const res = await getAllPatients(sql, session?.user?.email);
  return res;
};

export default async function PatientList() {
  const patientData = await getPatients();
  return (
    <div>
      {patientData?.length > 0
        ? patientData.map((patient) => <p key={patient.email}>{patient.firstName}</p>)
        : null}
    </div>
  );
}

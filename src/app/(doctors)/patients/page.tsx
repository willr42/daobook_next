import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import StyledLink from "@/components/StyledLink";
import sql from "@/db/db";
import { getAllPatients } from "@/db/patientQueries";
import { getServerSession } from "next-auth";

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
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Your clinic patients.</h1>
      {patientData?.length > 0
        ? patientData.map((patient) => (
            <StyledLink
              key={patient.email}
              href={`/patients/${patient.patientId}`}
              linkText={`${patient.firstName} ${patient.lastName}`}
            ></StyledLink>
          ))
        : null}
    </div>
  );
}

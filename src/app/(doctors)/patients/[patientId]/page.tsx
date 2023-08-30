import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import sql from "@/db/db";
import { getPatient } from "@/db/patientQueries";

const getPatientData = async (patientId) => {
  const res = await getPatient(sql, patientId);
  return res;
};

export default async function PatientPage({ params }: { params: { patientId: string } }) {
  const patientData = await getPatientData(params.patientId);
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="font-bold">First Name</p>
        <p>{patientData?.firstName}</p>
      </div>
      <div>
        <p className="font-bold">Last Name</p>
        <p>{patientData?.lastName}</p>
      </div>
      <div>
        <p className="font-bold">Email</p>
        <p>{patientData?.email}</p>
      </div>
      <div>
        <p className="font-bold">Date of birth</p>
        <p>{patientData?.dob.toLocaleDateString()}</p>
      </div>
    </div>
  );
}

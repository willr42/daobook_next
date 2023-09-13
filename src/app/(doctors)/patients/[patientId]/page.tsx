import sql from "@/db/db";
import { getPatient } from "@/db/patientQueries";
import { getConsults } from "@/db/consultQueries";
import StyledLink from "@/components/StyledLink";

const getPatientData = async (patientId: string) => {
  const res = await getPatient(sql, patientId);
  return res;
};

const getConsultData = async (patientId: string) => {
  const res = await getConsults(sql, patientId);
  return res;
};

export default async function PatientPage({ params }: { params: { patientId: string } }) {
  const patientData = await getPatientData(params.patientId);
  const consultData = await getConsultData(params.patientId);
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl">Patient Info</h1>
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
      <div>
        <h2 className="text-xl">Consults</h2>
        {consultData && consultData.length > 0
          ? consultData.map((consult) => (
              <StyledLink
                linkText={consult.consultTime?.toLocaleDateString()}
                href={`${params.patientId}/${consult.id}`}
                key={consult.id}
              />
            ))
          : null}
      </div>
    </div>
  );
}

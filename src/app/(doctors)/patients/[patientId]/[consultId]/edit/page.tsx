import { getConsult } from "@/db/consultQueries";
import sql from "@/db/db";
import EditConsult from "./EditConsult";

const getConsultData = async (patientId: string, consultId: string) => {
  const res = await getConsult(sql, patientId, consultId);
  return res;
};

const EditPage = async ({ params }: { params: { patientId: string; consultId: string } }) => {
  const consultData = await getConsultData(params.patientId, params.consultId);

  if (!consultData) {
    return <></>;
  }

  const finalConsultData = consultData;
  finalConsultData.consultId = params.consultId;
  finalConsultData.patientId = params.patientId;

  return <EditConsult consultData={consultData} />;
};

export default EditPage;

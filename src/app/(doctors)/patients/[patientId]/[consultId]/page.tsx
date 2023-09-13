import StyledLink from "@/components/StyledLink";
import { getConsult } from "@/db/consultQueries";
import sql from "@/db/db";
import { Consult } from "@/types";

const getConsultData = async (patientId: string, consultId: string) => {
  const res = await getConsult(sql, patientId, consultId);
  return res;
};

const ConsultDataDisplay = ({ data }: { data: Consult | null }) => {
  if (!data) {
    return <></>;
  }

  return (
    <>
      {Object.entries(data).map((entry) => (
        <div key={entry[0]}>
          <p className="font-bold">{consultKeyToHeading(entry[0])}</p>
          <p>{entry[1] as string}</p>
        </div>
      ))}
    </>
  );
};

const consultKeyToHeading = (consultKey: string) => {
  const separated = consultKey.split(/(?=[A-Z])/);
  separated[0] = separated[0].at(0)?.toUpperCase() + separated[0].substring(1);
  return separated.join(" ");
};

async function ConsultPage({ params }: { params: { patientId: string; consultId: string } }) {
  const consultData = await getConsultData(params.patientId, params.consultId);
  const consultTime = consultData?.consultTime;
  delete consultData?.consultTime;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl">
        {consultTime?.toLocaleDateString(undefined, {
          day: "2-digit",
          month: "long",
          year: "2-digit",
        })}{" "}
        Consult
      </h1>
      <ConsultDataDisplay data={consultData} />
      <StyledLink href="." linkText="Back" />
    </div>
  );
}

export default ConsultPage;

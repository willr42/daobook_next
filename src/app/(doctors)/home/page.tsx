import StyledLink from "@/components/StyledLink";

export default async function Dashboard() {
  return (
    <>
      <h1>Welcome to your dashboard.</h1>
      <div className="flex h-48 gap-5">
        <StyledLink
          href="/patients/new"
          linkText="New Patient"
          className="flex flex-col justify-center p-5"
        />
        <StyledLink
          href="/patients"
          linkText="Patient List"
          className="flex flex-col justify-center p-5"
        />
      </div>
    </>
  );
}

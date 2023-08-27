import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import StyledLink from "@/components/StyledLink";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

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
          href="/patients/list"
          linkText="Patient List"
          className="flex flex-col justify-center p-5"
        />
      </div>
    </>
  );
}

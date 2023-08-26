import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import StyledLink from "@/components/StyledLink";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  if (!session) {
    redirect("/");
  }

  return (
    <>
      <h1>Welcome to your dashboard.</h1>
      <div className="flex h-48 gap-5">
        <StyledLink
          href="./new-consult"
          linkText="New Patient"
          className="flex flex-col justify-center p-5"
        />
        <StyledLink
          href="./patient-list"
          linkText="Patient List"
          className="flex flex-col justify-center p-5"
        />
      </div>
    </>
  );
}

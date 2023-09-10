import StyledLink from "@/components/StyledLink";
import TitleLockup from "@/components/TitleLockup";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Root() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/home");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 border-4 bg-primary p-24">
      <TitleLockup isSmall={true} isSubtitled={true} />
      <div>
        <StyledLink linkText="Sign in" href="/api/auth/signin" />
      </div>
    </main>
  );
}

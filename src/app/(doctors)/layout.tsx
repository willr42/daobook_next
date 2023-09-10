import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DoctorHeader from "@/components/DoctorHeader";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DoctorLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }
  return (
    <>
      <DoctorHeader />
      <div className="mt-5 flex flex-col items-center gap-7">{children}</div>
    </>
  );
}

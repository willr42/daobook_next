import DoctorHeader from "@/components/DoctorHeader";

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DoctorHeader />
      <div className="mt-5 flex flex-col items-center gap-7">{children}</div>
    </>
  );
}

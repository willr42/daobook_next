"use client";

import { SessionProvider } from "next-auth/react";
import DoctorHeader from "@/components/DoctorHeader";

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DoctorHeader />
      <SessionProvider>
        <div className="flex flex-col items-center gap-7">{children}</div>
      </SessionProvider>
    </>
  );
}

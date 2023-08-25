"use client";

import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;

  if (status === "unauthenticated") {
    redirect("/");
  }

  if (status === "loading") {
    return <p>Hang on...</p>;
  }

  return (
    <>
      <h1>Protected page</h1>
      <p>Signed in as {userEmail}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
}

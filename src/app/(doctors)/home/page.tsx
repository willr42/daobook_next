"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;

  if (status === "loading") {
    return <p>Hang on...</p>;
  }

  if (status === "authenticated") {
    return (
      <>
        <p>Signed in as {userEmail}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center border-4 bg-primary p-24">
      <button onClick={() => signIn("github")}>Sign in</button>
    </main>
  );
}

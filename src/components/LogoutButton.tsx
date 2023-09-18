"use client";

import { signOut } from "next-auth/react";
import Button from "./Button";

const LogoutButton = () => {
  return (
    <Button buttonText="Logout" onClick={() => signOut()} buttonType="button" disabled={false} />
  );
};

export default LogoutButton;

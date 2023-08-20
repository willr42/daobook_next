"use client";

import Button from "./Button";

const LogoutButton = () => {
  return <Button buttonText="Logout" onClick={(e) => console.log(e)} />;
};

export default LogoutButton;

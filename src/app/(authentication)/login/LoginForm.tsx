"use client";

import Input from "@/components/Input";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
    setError,
    clearErrors,
    reset,
  } = useForm<FormData>({ reValidateMode: "onChange" });

  return (
    <form className="flex grow flex-col items-center justify-center gap-6">
      <h1 className="text-xl">Login</h1>
      <Input
        label="First Name"
        fieldName="firstName"
        register={register}
        defaultValue="Sue"
        required={true}
      />
    </form>
  );
};

export default LoginForm;

"use client";

import { startTransition } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import { action, type FormData } from "./newPatientAction";
import DateInput from "@/components/DateInput";

export default function NewPatientForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    startTransition(() => {
      action(data);
    });
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <Input
        label="First Name"
        fieldName="firstName"
        register={register}
        defaultValue="Sue"
        required={true}
      />
      <Input
        label="Last Name"
        fieldName="lastName"
        register={register}
        defaultValue="Richards"
        required={true}
      />
      <Input
        label="Email"
        fieldName="email"
        register={register}
        defaultValue="sue@example.com"
        required={true}
      />
      <DateInput
        label="Date of Birth"
        fieldName="dob"
        register={register}
        defaultValue={new Date(1985, 9, 26)}
        required={true}
      />
      <Button buttonType="submit" buttonText="Add Patient" />
    </form>
  );
}

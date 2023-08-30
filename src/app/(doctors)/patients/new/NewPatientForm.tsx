"use client";

import { startTransition, useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import { action, type FormData } from "./newPatientAction";
import DateInput from "@/components/DateInput";
import StyledLink from "@/components/StyledLink";

export default function NewPatientForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<FormData>();

  const [newPatientId, setNewPatientId] = useState("");

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      const newPatient = await action(data);
      console.log(newPatient);
      // TODO handle on frontend error
      setNewPatientId(newPatient.patientId);
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
      {!isSubmitted ? (
        <Button
          buttonType="submit"
          buttonText={isSubmitting ? "Sending..." : "Submit"}
          disabled={isSubmitting}
        />
      ) : newPatientId ? (
        <StyledLink href={`/patients/${newPatientId}/new`} linkText="New consult" />
      ) : null}
      <StyledLink
        href="/home"
        linkText="Back"
        className={isSubmitted ? "opacity-100 transition-opacity duration-500" : "opacity-0"}
      />
    </form>
  );
}

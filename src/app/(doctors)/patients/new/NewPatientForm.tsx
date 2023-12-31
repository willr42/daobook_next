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
    setError,
    clearErrors,
    reset,
  } = useForm<FormData>({ reValidateMode: "onChange" });

  const [newPatientId, setNewPatientId] = useState<string | undefined>();

  const onSubmit = handleSubmit((data) => {
    startTransition(() => {
      const newPatient = action(data);

      newPatient.then((result) => {
        if (result?.error) {
          setError("root.serverError", {
            message: result?.error,
          });
        } else {
          setNewPatientId(result?.data?.patientId);
        }
      });
    });
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <Input label="First Name" fieldName="firstName" register={register} required={true} />
      <Input label="Last Name" fieldName="lastName" register={register} required={true} />
      <Input label="Email" fieldName="email" register={register} required={true} />
      <DateInput
        label="Date of Birth"
        fieldName="dob"
        register={register}
        defaultValue={new Date(1985, 9, 26)}
        required={true}
      />
      {errors?.root?.serverError.message && <p>{errors?.root.serverError.message}</p>}
      {!isSubmitted ? (
        <Button
          buttonType="submit"
          buttonText={isSubmitting ? "Sending..." : "Submit"}
          disabled={isSubmitting}
        />
      ) : errors.root ? (
        <Button
          buttonType="reset"
          buttonText="Reset?"
          disabled={false}
          onClick={(e) => {
            e.preventDefault();
            reset({}, { keepValues: true });
            console.log(errors.root);
          }}
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

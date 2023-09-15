"use client";

import { startTransition, useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import { action, type FormData } from "./newConsultAction";
import DateInput from "@/components/DateInput";
import StyledLink from "@/components/StyledLink";
import { usePathname } from "next/navigation";

const NewConsult = () => {
  // This seems unidiomatic but not sure of a better way
  const pathName = usePathname();
  const routePatientId = pathName.split("/")[2];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
    setError,
    reset,
  } = useForm<FormData>({ reValidateMode: "onChange" });

  const onSubmit = handleSubmit((data) => {
    // Add missing fields
    data.patientId = routePatientId;
    data.consultTime = new Date(data.consultTime);

    startTransition(async () => {
      const newConsult = await action(data);

      if (newConsult?.error) {
        setError("root.serverError", {
          message: newConsult?.error,
        });
      }
    });
  });
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <h1 className="text-xl">New Consult</h1>
      <DateInput
        label="Consult Date"
        fieldName="consultTime"
        register={register}
        defaultValue={new Date()}
        required={true}
      />
      <Input label="Main complaint" fieldName="mainComplaint" register={register} required={true} />
      <Input label="Session notes" fieldName="sessionNotes" register={register} required={true} />
      <Input label="Tongue" fieldName="tongue" register={register} required={true} />
      <Input label="Pulse" fieldName="pulse" register={register} required={true} />
      <hr />
      <h2>Prescription</h2>
      <Input
        label="Formula name"
        fieldName="prescriptionName"
        register={register}
        required={true}
      />
      <Input
        label="Composition"
        fieldName="prescriptionComposition"
        register={register}
        required={true}
      />
      <Input
        label="Dosage & administration"
        fieldName="prescriptionDosage"
        register={register}
        required={true}
      />
      <Input
        label="Lifestyle notes"
        fieldName="prescriptionNotes"
        register={register}
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
      ) : (
        <p className="text-center font-bold text-primary">Submitted!</p>
      )}
      <StyledLink
        href="/home"
        linkText="Back"
        className={isSubmitted ? "opacity-100 transition-opacity duration-500" : "opacity-0"}
      />
    </form>
  );
};

export default NewConsult;

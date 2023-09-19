"use client";

import ConsultForm from "@/components/ConsultForm";
import { startTransition } from "react";
import { useForm } from "react-hook-form";
import { action } from "./newConsultAction";
import { ConsultFormData } from "../[consultId]/page";

const NewConsult = ({ params }: { params: { patientId: string } }) => {
  const { handleSubmit, register, reset, formState, setError } = useForm<ConsultFormData>({
    reValidateMode: "onChange",
  });

  const onSubmit = handleSubmit((data) => {
    // Add missing fields
    data.patientId = params.patientId;
    if (!data.consultTime) {
      data.consultTime = new Date();
    }
    data.consultTime = new Date(data.consultTime);

    startTransition(() => {
      const newConsult = action(data);

      newConsult.then((result) => {
        if (result?.error) {
          setError("root.serverError", {
            message: result?.error,
          });
        }
      });
    });
  });

  return (
    <ConsultForm onSubmit={onSubmit} register={register} formState={formState} reset={reset} />
  );
};

export default NewConsult;

"use client";

import ConsultForm from "@/components/ConsultForm";
import { startTransition } from "react";
import { useForm } from "react-hook-form";
import { action, type FormData } from "./newConsultAction";

const NewConsult = ({ params }: { params: { patientId: string } }) => {
  const { handleSubmit, register, reset, formState, setError } = useForm<FormData>({
    reValidateMode: "onChange",
  });

  const onSubmit = handleSubmit((data) => {
    // Add missing fields
    data.patientId = params.patientId;
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
    <ConsultForm onSubmit={onSubmit} register={register} formState={formState} reset={reset} />
  );
};

export default NewConsult;

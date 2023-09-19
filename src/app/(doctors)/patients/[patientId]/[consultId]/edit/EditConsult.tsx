"use client";

import ConsultForm from "@/components/ConsultForm";
import { Consult } from "@/types";
import { startTransition } from "react";
import { useForm } from "react-hook-form";
import { FormData, action } from "./editConsultAction";

const EditConsult = ({ consultData }: { consultData: Consult }) => {
  const { handleSubmit, register, reset, formState, setError } = useForm<FormData>({
    reValidateMode: "onChange",
  });

  const onSubmit = handleSubmit((data) => {
    // Add missing fields
    data.consultId = consultData.consultId;
    data.patientId = consultData.patientId;
    data.consultTime = new Date(data.consultTime);

    startTransition(async () => {
      const updatedConsult = await action(data);

      if (updatedConsult?.error) {
        setError("root.serverError", {
          message: updatedConsult?.error,
        });
      }
    });
  });
  return (
    <>
      <h1 className="text-xl">Edit Consult</h1>
      <ConsultForm
        onSubmit={onSubmit}
        existingData={consultData}
        register={register}
        formState={formState}
        reset={reset}
      />
    </>
  );
};

export default EditConsult;

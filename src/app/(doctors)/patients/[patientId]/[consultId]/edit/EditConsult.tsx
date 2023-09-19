"use client";

import ConsultForm from "@/components/ConsultForm";
import { Consult } from "@/types";
import { startTransition } from "react";
import { useForm } from "react-hook-form";
import { action } from "./editConsultAction";
import { ConsultFormData } from "../page";

const EditConsult = ({ consultData }: { consultData: Consult }) => {
  const { handleSubmit, register, reset, formState, setError } = useForm<ConsultFormData>({
    reValidateMode: "onChange",
  });

  const onSubmit = handleSubmit((data) => {
    // Add missing fields
    data.consultId = consultData.consultId;
    data.patientId = consultData.patientId;
    data.consultTime = new Date(data.consultTime);

    startTransition(() => {
      const updatedConsult = action(data);

      updatedConsult.then((result) => {
        if (result?.error) {
          setError("root.serverError", {
            message: result?.error,
          });
        }
      });
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

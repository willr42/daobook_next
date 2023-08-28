"use client";

import { startTransition } from "react";
import { useForm } from "react-hook-form";
import { action, type FormData } from "./newPatientAction";

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
    <form onSubmit={onSubmit}>
      <input defaultValue="test" {...register("firstName")} />
    </form>
  );
}

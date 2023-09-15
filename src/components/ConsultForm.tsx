import Button from "@/components/Button";
import StyledLink from "@/components/StyledLink";
import { FormEventHandler } from "react";
import { FormState, UseFormRegister, UseFormReset, useForm } from "react-hook-form";
import DateInput from "./DateInput";
import Input from "./Input";
import { FormData } from "@/app/(doctors)/patients/[patientId]/[consultId]/edit/editConsultAction";

type ConsultFormProps = {
  onSubmit: FormEventHandler;
  existingData?: FormData;
  register: UseFormRegister<FormData>;
  reset: UseFormReset<FormData>;
  formState: FormState<FormData>;
};

const ConsultForm = ({ onSubmit, existingData, register, formState, reset }: ConsultFormProps) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <DateInput
        label="Consult Date"
        fieldName="consultTime"
        register={register}
        defaultValue={existingData?.consultTime ?? new Date()}
        required={true}
      />
      <Input
        label="Main complaint"
        fieldName="mainComplaint"
        register={register}
        required={true}
        defaultValue={existingData?.mainComplaint ?? ""}
      />
      <Input
        label="Session notes"
        fieldName="sessionNotes"
        register={register}
        required={true}
        defaultValue={existingData?.sessionNotes ?? ""}
      />
      <Input
        label="Tongue"
        fieldName="tongue"
        register={register}
        required={true}
        defaultValue={existingData?.tongue ?? ""}
      />
      <Input
        label="Pulse"
        fieldName="pulse"
        register={register}
        required={true}
        defaultValue={existingData?.pulse ?? ""}
      />
      <hr />
      <h2>Prescription</h2>
      <Input
        label="Formula name"
        fieldName="prescriptionName"
        register={register}
        required={true}
        defaultValue={existingData?.prescriptionName ?? ""}
      />
      <Input
        label="Composition"
        fieldName="prescriptionComposition"
        register={register}
        required={true}
        defaultValue={existingData?.prescriptionComposition ?? ""}
      />
      <Input
        label="Dosage & administration"
        fieldName="prescriptionDosage"
        register={register}
        required={true}
        defaultValue={existingData?.prescriptionDosage ?? ""}
      />
      <Input
        label="Lifestyle notes"
        fieldName="prescriptionNotes"
        register={register}
        required={true}
        defaultValue={existingData?.prescriptionNotes ?? ""}
      />

      {formState.errors?.root?.serverError.message && (
        <p>{formState.errors?.root.serverError.message}</p>
      )}

      {!formState.isSubmitted ? (
        <Button
          buttonType="submit"
          buttonText={formState.isSubmitting ? "Sending..." : "Submit"}
          disabled={formState.isSubmitting}
        />
      ) : formState.errors.root ? (
        <Button
          buttonType="reset"
          buttonText="Reset?"
          disabled={false}
          onClick={(e) => {
            e.preventDefault();
            reset({}, { keepValues: true });
            console.log(formState.errors.root);
          }}
        />
      ) : (
        <p className="text-center font-bold text-primary">Submitted!</p>
      )}
      <StyledLink
        href="/home"
        linkText="Back"
        className={
          formState.isSubmitted ? "opacity-100 transition-opacity duration-500" : "opacity-0"
        }
      />
    </form>
  );
};

export default ConsultForm;

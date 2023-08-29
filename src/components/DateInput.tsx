type InputProp = {
  label: string;
  fieldName: string;
  register: Function;
  required: boolean;
  defaultValue: Date;
};

export default function DateInput({
  label,
  fieldName,
  register,
  required,
  defaultValue,
}: InputProp) {
  return (
    <div className="flex flex-col">
      <label className="text-xl" htmlFor={fieldName}>
        {label}
      </label>
      <input
        id={fieldName}
        {...register(fieldName, { required: required })}
        defaultValue={defaultValue.toISOString().split("T")[0]}
        className="w-full rounded-2xl border-2 border-[#DFDFDF] p-2 px-4 placeholder:text-[#DFDFDF]"
        type="date"
      />
    </div>
  );
}

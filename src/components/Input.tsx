type InputProp = {
  label: string;
  fieldName: string;
  register: Function;
  required: boolean;
  defaultValue: string;
};

export default function Input({ label, fieldName, register, required, defaultValue }: InputProp) {
  return (
    <div className="flex flex-col">
      <label className="text-xl" htmlFor={fieldName}>
        {label}
      </label>
      <input
        id={fieldName}
        {...register(fieldName, { required: required })}
        defaultValue={defaultValue}
        placeholder={label}
        className="w-full rounded-2xl border-2 border-[#DFDFDF] p-2 px-4 placeholder:text-[#DFDFDF]"
      />
    </div>
  );
}

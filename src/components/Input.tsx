type InputProp = {
  label: string;
  fieldName: string;
  register: Function;
  required: boolean;
  defaultValue?: string;
  onBlur?: Function;
};

export default function Input({
  label,
  fieldName,
  register,
  required,
  defaultValue,
  onBlur,
}: InputProp) {
  return (
    <div className="flex flex-col">
      <label className="text-md" htmlFor={fieldName}>
        {label}
      </label>
      <input
        id={fieldName}
        {...register(fieldName, { required: required, onBlur: onBlur })}
        defaultValue={defaultValue}
        placeholder={label}
        className="w-full rounded-2xl border-2 border-[#DFDFDF] p-2 px-4 placeholder:text-[#DFDFDF]"
      />
    </div>
  );
}

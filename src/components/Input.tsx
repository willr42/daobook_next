type InputProp = {
  label: string;
  register: Function;
  required: boolean;
  defaultValue: string;
};

export default function Input({ label, register, required, defaultValue }: InputProp) {
  return (
    <>
      <label>{label}</label>
      <input {...(register(label), { required })} defaultValue={defaultValue} />
    </>
  );
}

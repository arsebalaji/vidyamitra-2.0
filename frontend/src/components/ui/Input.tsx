import { useId, type InputHTMLAttributes } from "react";
export default function Input({
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const id = useId();
  return (
    <label className="field" htmlFor={id}>
      {label}
      <input id={id} {...props} />
    </label>
  );
}

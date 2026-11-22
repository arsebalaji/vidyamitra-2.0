import type { SelectHTMLAttributes, ReactNode } from "react";
export default function Select({
  label,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="field">
      {label}
      <select {...props}>{children}</select>
    </label>
  );
}

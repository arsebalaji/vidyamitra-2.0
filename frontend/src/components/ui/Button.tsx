import type { ButtonHTMLAttributes } from "react";
export default function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "soft" | "danger";
}) {
  return (
    <button
      className={
        (variant === "soft"
          ? "soft-button"
          : variant === "danger"
            ? "danger-button"
            : "button") +
        " " +
        className
      }
      {...props}
    />
  );
}

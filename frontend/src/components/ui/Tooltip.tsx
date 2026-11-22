import { useId, type ReactNode } from "react";
export default function Tooltip({
  text,
  children,
}: {
  text: string;
  children: ReactNode;
}) {
  const id = useId();
  return (
    <span title={text} aria-describedby={id} tabIndex={0}>
      {children}
      <span id={id} role="tooltip" className="sr-only">
        {text}
      </span>
    </span>
  );
}

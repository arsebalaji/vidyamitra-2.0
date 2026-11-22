import { useState } from "react";
export default function ChatInput({
  onSend,
  disabled = false,
  label,
}: {
  onSend: (s: string) => void;
  disabled?: boolean;
  label: string;
}) {
  const [value, setValue] = useState("");
  return (
    <form
      className="chat-compose"
      onSubmit={(e) => {
        e.preventDefault();
        if (value.trim()) {
          onSend(value);
          setValue("");
        }
      }}
    >
      <textarea
        aria-label={label}
        maxLength={1500}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="button" disabled={disabled || !value.trim()}>
        {label}
      </button>
    </form>
  );
}

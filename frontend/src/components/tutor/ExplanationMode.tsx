import type { TutorRequest } from "../../../../shared/types";
import { useWords } from "../../app/providers";
export default function ExplanationMode({
  value,
  onChange,
}: {
  value: TutorRequest["mode"];
  onChange: (v: TutorRequest["mode"]) => void;
}) {
  const t = useWords();
  return (
    <div className="mode-options">
      {(["simple", "steps", "example", "hint"] as const).map((m) => (
        <button
          key={m}
          className={"soft-button " + (value === m ? "selected" : "")}
          onClick={() => onChange(m)}
        >
          {t(m)}
        </button>
      ))}
    </div>
  );
}

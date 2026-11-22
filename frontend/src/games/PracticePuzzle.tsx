import { useState } from "react";
import { equivalent } from "../features/adaptive-learning/engine";
export default function PracticePuzzle({
  title,
  prompt,
  answer,
  explanation,
}: {
  title: string;
  prompt: string;
  answer: string;
  explanation: string;
}) {
  const [value, setValue] = useState(""),
    [checked, setChecked] = useState(false);
  return (
    <section className="card">
      <h2>{title}</h2>
      <p>{prompt}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setChecked(true);
        }}
      >
        <label className="field">
          Answer · సమాధానం
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setChecked(false);
            }}
          />
        </label>
        <button className="button">Check · చూడండి</button>
      </form>
      {checked && (
        <div className="hint-box" role="status">
          {equivalent(value, answer) ? "✓" : "Try again · మళ్లీ ప్రయత్నించండి"}
          <p>{explanation}</p>
        </div>
      )}
    </section>
  );
}

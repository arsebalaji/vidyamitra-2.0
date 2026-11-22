import { useState } from "react";
const values = ["1/2", "3/6", "2/3", "4/6"];
export default function MathMemory() {
  const [open, setOpen] = useState<number[]>([]),
    [matched, setMatched] = useState<number[]>([]);
  function choose(i: number) {
    if (open.includes(i) || matched.includes(i)) return;
    const next = [...open, i];
    if (next.length === 2) {
      if (Math.floor(next[0] / 2) === Math.floor(next[1] / 2))
        setMatched((m) => [...m, ...next]);
      setOpen(next);
    } else setOpen(next);
  }
  return (
    <section className="card">
      <h2>Math memory</h2>
      <p>Match equivalent fractions.</p>
      <div className="game-options">
        {values.map((v, i) => (
          <button
            className="game-option"
            key={i}
            disabled={matched.includes(i) || open.length === 2}
            onClick={() => choose(i)}
          >
            {open.includes(i) || matched.includes(i) ? v : "?"}
          </button>
        ))}
      </div>
      {open.length === 2 && (
        <button className="button" onClick={() => setOpen([])}>
          Continue
        </button>
      )}
      <p>{matched.length / 2} / 2 pairs</p>
    </section>
  );
}

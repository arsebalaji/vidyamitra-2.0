import { useState } from "react";
export default function AngleVisualizer() {
  const [angle, setAngle] = useState(60),
    rad = (angle * Math.PI) / 180;
  return (
    <section className="card">
      <h2>{angle}°</h2>
      <svg viewBox="0 0 300 200" role="img" aria-label={angle + " degrees"}>
        <path
          d={
            "M260 160 L80 160 L" +
            (80 + 150 * Math.cos(rad)) +
            " " +
            (160 - 150 * Math.sin(rad))
          }
          fill="none"
          stroke="#5B5FEF"
          strokeWidth="5"
        />
      </svg>
      <input
        aria-label="Angle"
        type="range"
        min="0"
        max="180"
        value={angle}
        onChange={(e) => setAngle(+e.target.value)}
      />
    </section>
  );
}

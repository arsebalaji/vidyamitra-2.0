import { useState } from "react";
export default function GeometryExplorer() {
  const [width, setWidth] = useState(4),
    [height, setHeight] = useState(3);
  return (
    <section className="card">
      <svg viewBox="0 0 220 180" aria-label="Rectangle">
        <rect
          x="10"
          y="10"
          width={width * 20}
          height={height * 20}
          rx="4"
          fill="#b7a7ed"
        />
      </svg>
      <label className="field">
        Width
        <input
          type="range"
          min="1"
          max="10"
          value={width}
          onChange={(e) => setWidth(+e.target.value)}
        />
      </label>
      <label className="field">
        Height
        <input
          type="range"
          min="1"
          max="8"
          value={height}
          onChange={(e) => setHeight(+e.target.value)}
        />
      </label>
      <p>
        Area = {width} × {height} = {width * height}
      </p>
    </section>
  );
}

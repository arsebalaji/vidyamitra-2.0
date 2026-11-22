export default function NumberLine({ value }: { value: number }) {
  const x = 40 + (Math.max(-1, Math.min(1, value)) + 1) * 360;
  return (
    <svg viewBox="0 0 800 120" role="img" aria-label={"Number line: " + value}>
      <line x1="40" x2="760" y1="55" y2="55" stroke="#aaa" strokeWidth="3" />
      {[-1, -0.5, 0, 0.5, 1].map((n, i) => (
        <text
          key={n}
          x={40 + i * 180}
          y="90"
          textAnchor="middle"
          fill="#20243A"
        >
          {n}
        </text>
      ))}
      <circle cx={x} cy="55" r="10" fill="#5B5FEF" />
    </svg>
  );
}

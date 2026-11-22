export default function ProgressRing({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  const percent = Math.max(0, Math.min(100, value));
  return (
    <div
      className="goal-ring"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      style={{ background: "conic-gradient(#16B8A6 " + percent + "%,#eee 0)" }}
    >
      <div>
        <strong>{percent}%</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}

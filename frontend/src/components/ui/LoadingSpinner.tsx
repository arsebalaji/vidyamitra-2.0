export default function LoadingSpinner({
  label = "Loading…",
}: {
  label?: string;
}) {
  return (
    <div role="status" aria-live="polite">
      <span aria-hidden="true">◌ </span>
      {label}
    </div>
  );
}

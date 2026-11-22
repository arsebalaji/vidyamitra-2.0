export default function LanguageCard({
  label,
  enabled,
  selected,
  onSelect,
}: {
  label: string;
  enabled: boolean;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      disabled={!enabled}
      className={"card language-choice " + (selected ? "selected" : "")}
      onClick={onSelect}
    >
      {label}
      {!enabled && <small>Review required</small>}
    </button>
  );
}

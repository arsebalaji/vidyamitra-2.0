export default function AnswerOptions({
  options,
  onChoose,
  disabled = false,
}: {
  options: string[];
  onChoose: (s: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="game-options">
      {options.map((o) => (
        <button
          key={o}
          className="game-option"
          disabled={disabled}
          onClick={() => onChoose(o)}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

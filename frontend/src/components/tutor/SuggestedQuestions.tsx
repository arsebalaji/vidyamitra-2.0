export default function SuggestedQuestions({
  questions,
  onChoose,
}: {
  questions: string[];
  onChoose: (s: string) => void;
}) {
  return (
    <div className="mode-options">
      {questions.map((q) => (
        <button key={q} className="soft-button" onClick={() => onChoose(q)}>
          {q}
        </button>
      ))}
    </div>
  );
}

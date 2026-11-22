export default function QuizResults({
  correct,
  total,
}: {
  correct: number;
  total: number;
}) {
  return (
    <div className="card">
      <strong>
        {correct} / {total}
      </strong>
      <p>{total ? Math.round((correct / total) * 100) : 0}%</p>
    </div>
  );
}

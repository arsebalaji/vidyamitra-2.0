import ProgressBar from "../ui/ProgressBar";
export default function QuizProgress({
  answered,
  total,
}: {
  answered: number;
  total: number;
}) {
  return (
    <ProgressBar
      value={total > 0 ? Math.min(100, (answered / total) * 100) : 0}
    />
  );
}

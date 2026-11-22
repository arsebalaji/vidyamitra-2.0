import ProgressRing from "../ui/ProgressRing";
import { useWords } from "../../app/providers";
export default function DailyGoal({
  completed,
  attempts,
}: {
  completed: number;
  attempts: number;
}) {
  const t = useWords();
  return (
    <section className="card goal-card">
      <h3>{t("goal")}</h3>
      <ProgressRing
        value={(completed ? 50 : 0) + (Math.min(3, attempts) / 3) * 50}
        label={t("mastery")}
      />
      <p>{t("goalText")}</p>
    </section>
  );
}

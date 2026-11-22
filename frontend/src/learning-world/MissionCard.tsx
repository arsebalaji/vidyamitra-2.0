import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useWords } from "../app/providers";
export default function MissionCard({
  title,
  description,
  to,
  number,
  completed = false,
}: {
  title: string;
  description: string;
  to: string;
  number: number;
  completed?: boolean;
}) {
  const t = useWords();
  return (
    <article className="card mission-card">
      <span className="pill">
        {completed ? (
          <CheckCircle2 size={18} />
        ) : (
          String(number).padStart(2, "0")
        )}
      </span>
      <h2>{title}</h2>
      <p>{description}</p>
      <Link className="button" to={to}>
        {t(completed ? "revision" : "learn")}
        <ArrowRight size={17} />
      </Link>
    </article>
  );
}

import { Medal } from "lucide-react";
export default function AchievementCard({
  title,
  earned,
  description,
}: {
  title: string;
  earned: boolean;
  description: string;
}) {
  return (
    <article className={"card achievement " + (earned ? "" : "unearned")}>
      <span className="medallion">
        <Medal size={48} />
      </span>
      <h2>{title}</h2>
      <p>{description}</p>
    </article>
  );
}

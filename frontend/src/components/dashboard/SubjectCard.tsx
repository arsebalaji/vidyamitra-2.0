import { Link } from "react-router-dom";
import { useWords } from "../../app/providers";
export default function SubjectCard() {
  const t = useWords();
  return (
    <Link className="card lesson-tile" to="/lessons">
      <h2>{t("class")}</h2>
      <p>{t("chapter")}</p>
      <span>{t("pack")}</span>
    </Link>
  );
}

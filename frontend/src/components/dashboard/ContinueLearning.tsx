import { Link } from "react-router-dom";
import { useWords } from "../../app/providers";
export default function ContinueLearning({ lessonId }: { lessonId: string }) {
  const t = useWords();
  return (
    <Link className="button" to={"/lessons/" + lessonId}>
      {t("continue")}
    </Link>
  );
}

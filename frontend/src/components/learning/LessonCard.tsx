import { Link } from "react-router-dom";
import type { Lesson, Lang } from "../../../../shared/types";
export default function LessonCard({
  lesson,
  lang,
}: {
  lesson: Lesson;
  lang: Lang;
}) {
  return (
    <Link to={"/lessons/" + lesson.id} className="card lesson-tile">
      <h2>{lesson.title[lang]}</h2>
      <p>{lesson.summary[lang]}</p>
      <small>{lesson.minutes} min</small>
    </Link>
  );
}

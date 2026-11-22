import type { Lesson, Lang } from "../../../../shared/types";
import { saveLesson } from "../../db/lessons";
export default function DownloadCard({
  lesson,
  lang,
  onError,
}: {
  lesson: Lesson;
  lang: Lang;
  onError: (e: unknown) => void;
}) {
  return (
    <section className="card">
      <h3>{lesson.title[lang]}</h3>
      <button
        className="soft-button"
        onClick={() => saveLesson(lesson).catch(onError)}
      >
        {lang === "te" ? "భద్రపరచండి" : "Save for offline"}
      </button>
    </section>
  );
}

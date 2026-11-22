import { pack } from "../../services/api";
import { useApp } from "../../app/providers";
import LessonCard from "./LessonCard";
export default function LearningPath() {
  const { lang } = useApp();
  return (
    <div className="lesson-grid">
      {pack.lessons.map((lesson) => (
        <LessonCard key={lesson.id} lesson={lesson} lang={lang} />
      ))}
    </div>
  );
}

import { pack } from "../services/api";
export function validLessonQuery() {
  const id = new URLSearchParams(window.location.search).get("lesson");
  return pack.lessons.some((l) => l.id === id) ? id! : "addition";
}

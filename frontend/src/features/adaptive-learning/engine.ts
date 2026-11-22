import type {
  Question,
  Lesson,
  Lang,
  TutorResponse,
} from "../../../../shared/types";
export function fraction(s: string): [bigint, bigint] | null {
  const m = s.trim().match(/^([+-]?\d{1,9})(?:\s*\/\s*([+-]?\d{1,9}))?$/);
  if (!m) return null;
  const n = BigInt(m[1]),
    d = BigInt(m[2] ?? 1);
  return d === 0n ? null : [n, d];
}
export function equivalent(a: string, b: string) {
  const x = fraction(a),
    y = fraction(b);
  return !!x && !!y && x[0] * y[1] === y[0] * x[1];
}
export function gameRound(round: number) {
  const n = (round % 4) + 1,
    d = n + 2,
    answer = `${n * 2}/${d * 2}`;
  const choices = [answer, `${n * 2 + 1}/${d * 2}`, `${n * 2 - 1}/${d * 2}`];
  const offset = round % 3;
  return {
    n,
    d,
    answer,
    options: [...choices.slice(offset), ...choices.slice(0, offset)],
  };
}
export interface Attempt {
  id?: number;
  profileId: string;
  questionId: string;
  lessonId: string;
  correct: boolean;
  hint: boolean;
  at: number;
}
export function mastery(attempts: Attempt[]) {
  const a = attempts.slice(-10);
  return a.length
    ? Math.round(
        (a.reduce((n, x) => n + (x.correct ? (x.hint ? 0.5 : 1) : 0), 0) /
          a.length) *
          100,
      )
    : 0;
}
export function nextQuestion(
  questions: Question[],
  attempts: Attempt[],
): Question {
  const recent = attempts.slice(-3),
    errors = recent.filter((a) => !a.correct).length;
  const level =
    errors >= 2
      ? 1
      : mastery(attempts) >= 80 && attempts.length >= 3
        ? 3
        : mastery(attempts) >= 50
          ? 2
          : 1;
  const last = attempts.at(-1)?.questionId;
  return [...questions].sort((a, b) => {
    const score = (q: Question) =>
      Math.abs(q.level - level) * 100 +
      (q.id === last ? 50 : 0) +
      attempts.filter((a) => a.questionId === q.id).length;
    return score(a) - score(b);
  })[0];
}
export function offlineReply(
  lesson: Lesson,
  lang: Lang,
  mode: string,
): TutorResponse {
  const answer =
    mode === "hint"
      ? lesson.summary[lang]
      : mode === "example"
        ? lesson.steps.map((s) => s.example).join("\n\n")
        : mode === "simple"
          ? lesson.steps[0].body[lang]
          : lesson.steps
              .map(
                (s, i) =>
                  `${i + 1}. ${s.title[lang]}\n${s.body[lang]}\n${s.example}`,
              )
              .join("\n\n");
  return { answer, source: "offline", lesson_id: lesson.id };
}

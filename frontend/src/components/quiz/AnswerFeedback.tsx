import { useApp, useWords } from "../../app/providers";
import type { CheckResponse } from "../../../../shared/types";
export default function AnswerFeedback({ result }: { result: CheckResponse }) {
  const { lang } = useApp(),
    t = useWords();
  return (
    <div
      className={"result " + (result.correct ? "success" : "retry")}
      role="status"
    >
      <h3>{t(result.correct ? "correct" : "incorrect")}</h3>
      <p>{result.explanation[lang]}</p>
      <strong>{result.answer}</strong>
    </div>
  );
}

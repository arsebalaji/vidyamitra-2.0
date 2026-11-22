import type { Lesson, Lang } from "../../../../shared/types";
export default function StepExplanation({
  step,
  lang,
}: {
  step: Lesson["steps"][number];
  lang: Lang;
}) {
  return (
    <section>
      <h2>{step.title[lang]}</h2>
      <p className="lesson-body">{step.body[lang]}</p>
      <div className="math-example" dir="ltr">
        {step.example}
      </div>
    </section>
  );
}

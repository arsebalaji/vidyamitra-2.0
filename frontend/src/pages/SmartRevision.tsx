import { Link } from "react-router-dom";
import { useApp, useWords } from "../app/providers";
import { pack } from "../services/api";
import PageTitle from "../components/layout/PageTitle";
export default function SmartRevision() {
  const { attempts, lang } = useApp(),
    t = useWords();
  const ids = new Set(
    attempts.filter((a) => !a.correct).map((a) => a.lessonId),
  );
  const lessons = pack.lessons.filter((l) => ids.has(l.id));
  return (
    <>
      <PageTitle title={t("revision")} sub={t("chooseDiscovery")} />
      <div className="universe-grid">
        {(lessons.length ? lessons : pack.lessons.slice(0, 3)).map((l) => (
          <article className="card mission-card" key={l.id}>
            <h2>{l.title[lang]}</h2>
            <p>{l.summary[lang]}</p>
            <Link to={"/quiz?lesson=" + l.id} className="button">
              {t("practice")}
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}

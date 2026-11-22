import { useApp, useWords } from "../app/providers";
import { pack } from "../services/api";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db/database";
import PageTitle from "../components/layout/PageTitle";
import MissionCard from "../learning-world/MissionCard";
export default function LearningUniverse() {
  const { lang, profile } = useApp(),
    t = useWords();
  const completed = useLiveQuery(
    () =>
      db.completions
        .where("profileId")
        .equals(profile?.id || "")
        .toArray(),
    [profile?.id],
    [],
  );
  return (
    <>
      <PageTitle title={t("universe")} sub={t("chooseDiscovery")} />
      <div className="universe-grid">
        {pack.lessons.map((l, i) => (
          <MissionCard
            key={l.id}
            title={l.title[lang]}
            description={l.summary[lang]}
            to={"/lessons/" + l.id}
            number={i + 1}
            completed={completed.some((c) => c.lessonId === l.id && c.done)}
          />
        ))}
      </div>
    </>
  );
}

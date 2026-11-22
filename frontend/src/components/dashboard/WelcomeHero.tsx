import { Link } from "react-router-dom";
import { useWords } from "../../app/providers";
import MitraMascot from "../mascot/MitraMascot";
export default function WelcomeHero({ lessonId }: { lessonId: string }) {
  const t = useWords();
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="pill">{t("new")}</span>
        <h2>{t("daily")}</h2>
        <p>{t("dailyBody")}</p>
        <Link className="button white" to={"/lessons/" + lessonId}>
          {t("continue")}
        </Link>
      </div>
      <div className="hero-art">
        <MitraMascot size={180} />
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";
import { ArrowUpRight, BookOpen, Globe, Sparkles } from "lucide-react";
import { useWords } from "../../app/providers";
export default function AdventureHero({ lessonId }: { lessonId: string }) {
  const t = useWords();
  return (
    <section className="adventure-hero">
      <div className="adventure-copy">
        <span className="adventure-eyebrow">
          <Sparkles size={15} />
          {t("adventureTag")}
        </span>
        <h2>
          <span>{t("adventureLearn")}</span>
          <br />
          <span>{t("adventurePractice")}</span>
          <br />
          <mark>{t("adventureGrow")}</mark>
          <span className="hero-spark">✦</span>
        </h2>
        <p>{t("adventureBody")}</p>
        <div className="adventure-actions">
          <Link className="button" to={"/lessons/" + lessonId}>
            <BookOpen size={18} />
            {t("continue")}
            <ArrowUpRight size={17} />
          </Link>
          <Link className="hero-language" to="/language">
            <Globe size={17} />
            {t("language")}
          </Link>
        </div>
        <span className="adventure-scope">
          {t("class")} · {t("chapter")}
        </span>
      </div>
      <div className="adventure-image">
        <img
          src="/illustrations/student-team.png"
          alt=""
          fetchPriority="high"
        />
        <div className="adventure-sticker">
          <Sparkles size={18} />
          <span>{t("helloMitra")}</span>
        </div>
      </div>
    </section>
  );
}


import { useWords } from "../app/providers";
import { Link } from "react-router-dom";
export default function Privacy() {
  const t = useWords();
  return (
    <section className="card">
      <h1>{t("settings")}</h1>
      <p>{t("privacy")}</p>
      <p>{t("onlineConsent")}</p>
      <p>{t("photoConsent")}</p>
      <Link className="button" to="/settings">
        {t("export")} / {t("delete")}
      </Link>
    </section>
  );
}

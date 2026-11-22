import { Link } from "react-router-dom";
import { useWords } from "../app/providers";
import Card from "../components/ui/Card";
export default function Onboarding() {
  const t = useWords();
  return (
    <Card>
      <h1>{t("welcome")}</h1>
      <p>{t("privacy")}</p>
      <Link className="button" to="/states">
        {t("begin")}
      </Link>
    </Card>
  );
}

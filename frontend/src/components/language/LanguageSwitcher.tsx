import { Link } from "react-router-dom";
import { useApp } from "../../app/providers";
import {languageInfo} from "../../i18n/languageRegistry";
export default function LanguageSwitcher() {
  const { uiLang } = useApp();
  return (
    <Link className="language-btn" to="/language">
      {languageInfo(uiLang).nativeName}
    </Link>
  );
}


import { Link } from "react-router-dom";
import { Menu, Wifi, WifiOff, Globe } from "lucide-react";
import { useApp, useWords } from "../../app/providers";
import {languageInfo} from "../../i18n/languageRegistry";
export default function Header({
  setMenu,
  connected,
}: {
  setMenu: (v: boolean) => void;
  connected: boolean;
}) {
  const { uiLang, profile } = useApp(),
    t = useWords();
  return (
    <header className="topbar">
      <button
        className="mobile-menu icon-btn"
        aria-label="Open menu"
        onClick={() => setMenu(true)}
      >
        <Menu />
      </button>
      <div className="breadcrumb">
        {t("home")} <span>/</span> {t("class")}
      </div>
      <div className="top-actions">
        <span className={"connection " + (!connected ? "off" : "")}>
          {connected ? <Wifi size={15} /> : <WifiOff size={15} />}
          <span>{t(connected ? "network" : "disconnected")}</span>
        </span>
        <Link className="language-btn" to="/language">
          <Globe size={17} />
          {languageInfo(uiLang).nativeName}
        </Link>
        <Link to="/profiles" className="avatar" title={t("switch")}>
          {profile?.name.slice(0, 1) || "M"}
        </Link>
      </div>
    </header>
  );
}


import { Link, NavLink } from "react-router-dom";
import { X, BookOpen, ShieldCheck, Settings } from "lucide-react";
import Star from "../mascot/MitraMascot";
import Navbar from "./Navbar";
import { useWords } from "../../app/providers";
export default function Sidebar({
  menu,
  setMenu,
}: {
  menu: boolean;
  setMenu: (v: boolean) => void;
}) {
  const t = useWords();
  return (
    <aside className={menu ? "sidebar open" : "sidebar"}>
      <Link className="brand" to="/">
        <Star size={43} />
        <span>
          VidyaMitra<span className="brand-tag">YOUR LEARNING COMPANION</span>
        </span>
      </Link>
      <button
        className="close-nav icon-btn"
        onClick={() => setMenu(false)}
        aria-label="Close menu"
      >
        <X />
      </button>
      <div className="school-label">
        <span className="school-icon">
          <BookOpen size={20} />
        </span>
        <div>
          <strong>{t("class")}</strong>
          <small>{t("board")}</small>
        </div>
      </div>
      <span className="nav-label">{t("learn")}</span>
      <Navbar />
      <div className="sidebar-bottom">
        <div className="mitra-note">
          <Star size={55} />
          <p>{t("tip")}</p>
        </div>
        <NavLink to="/guardian">
          <ShieldCheck size={19} />
          {t("guardian")}
        </NavLink>
        <NavLink to="/settings">
          <Settings size={19} />
          {t("settings")}
        </NavLink>
      </div>
    </aside>
  );
}

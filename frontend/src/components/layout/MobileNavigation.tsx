import { NavLink } from "react-router-dom";
import {
  House,
  BookOpen,
  Sparkles,
  Gamepad2,
  ChartNoAxesCombined,
} from "lucide-react";
import { useWords } from "../../app/providers";
export default function MobileNavigation() {
  const t = useWords();
  return (
    <nav className="mobile-dock" aria-label="Main navigation">
      {[
        ["/", "home", House],
        ["/lessons", "lessons", BookOpen],
        ["/tutor", "tutor", Sparkles],
        ["/games", "games", Gamepad2],
        ["/progress", "progress", ChartNoAxesCombined],
      ].map(([path, key, Icon]: any) => (
        <NavLink end={path === "/"} key={path} to={path} aria-label={t(key)}>
          <Icon size={21} />
          <span>{t(key)}</span>
        </NavLink>
      ))}
    </nav>
  );
}

import { NavLink } from "react-router-dom";
import {
  House,
  BookOpen,
  Sparkles,
  Target,
  FlaskConical,
  Gamepad2,
  ChartNoAxesCombined,
  Download,
} from "lucide-react";
import { useWords } from "../../app/providers";
const nav = [
  ["/", House, "home"],
  ["/universe", BookOpen, "universe"],
  ["/lessons", BookOpen, "lessons"],
  ["/revision", Target, "revision"],
  ["/tutor", Sparkles, "tutor"],
  ["/quiz", Target, "quiz"],
  ["/visual", FlaskConical, "visual"],
  ["/games", Gamepad2, "games"],
  ["/progress", ChartNoAxesCombined, "progress"],
  ["/offline", Download, "offline"],
] as const;

export default function Navbar() {
  const t = useWords();
  return (
    <nav>
      {nav.map(([path, Icon, label]) => (
        <NavLink end={path === "/"} key={path} to={path}>
          <Icon size={20} />
          <span>{t(label)}</span>
          {path === "/tutor" && <span className="tiny-tag">AI</span>}
        </NavLink>
      ))}
    </nav>
  );
}

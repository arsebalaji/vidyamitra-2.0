import { NavLink } from "react-router-dom";
import { House, BookOpen, Target, Sparkles } from "lucide-react";
import { useWords } from "../../app/providers";
export default function BottomNavigation() {
  const t = useWords();
  return (
    <nav aria-label="Learning shortcuts" className="button-row">
      {[
        ["/", House, "home"],
        ["/lessons", BookOpen, "lessons"],
        ["/quiz", Target, "quiz"],
        ["/tutor", Sparkles, "tutor"],
      ].map(([path, Icon, key]: any) => (
        <NavLink key={path} to={path} className="soft-button">
          <Icon size={18} />
          {t(key)}
        </NavLink>
      ))}
    </nav>
  );
}

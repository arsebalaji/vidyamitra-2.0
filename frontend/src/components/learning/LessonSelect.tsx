import { useApp, useWords } from "../../app/providers";
import { pack } from "../../services/api";
export default function LessonSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (s: string) => void;
}) {
  const { lang } = useApp(),
    t = useWords();
  return (
    <label className="field">
      {t("select")}
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {pack.lessons.map((l) => (
          <option key={l.id} value={l.id}>
            {l.title[lang]}
          </option>
        ))}
      </select>
    </label>
  );
}

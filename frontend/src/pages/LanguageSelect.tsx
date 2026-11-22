import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Search, ArrowRight } from "lucide-react";
import i18n from "../i18n";
import { useApp, useWords } from "../app/providers";
import { languageRegistry } from "../i18n/languageRegistry";
export default function Languages() {
  const { uiLang } = useApp(),
    t = useWords(),
    [query, setQuery] = useState("");
  const languages = languageRegistry.filter((l) =>
    (l.name + " " + l.nativeName).toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <section className="language-heading">
        <span className="pill">🌍 {t("languageCount")}</span>
        <h1>{t("languageIntro")}</h1>
        <p>{t("languageDescription")}</p>
        <label className="language-search">
          <Search size={20} />
          <input
            aria-label={t("searchLanguages")}
            placeholder={t("searchLanguages")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </section>
      <div className="language-grid">
        {languages.map((l, i) => (
          <button
            key={l.code}
            aria-pressed={uiLang === l.code}
            className={
              "card language-choice " + (uiLang === l.code ? "selected" : "")
            }
            onClick={() => {
              localStorage.setItem("language", l.code);
              void i18n.changeLanguage(l.code);
            }}
          >
            <span className="language-letter" aria-hidden="true">
              {l.glyph}
            </span>
            <span>
              <strong dir={l.direction}>{l.nativeName}</strong>
              <small>{l.name}</small>
              <em>
                {l.status === "mvp"
                  ? t("supported")
                  : t(l.code === "hi" ? "lessonPreview" : "interfacePreview")}
              </em>
            </span>
            {uiLang === l.code && (
              <Check className="language-check" size={20} />
            )}
          </button>
        ))}
      </div>
      {!languages.length && <p role="status">{t("languageSearchEmpty")}</p>}
      <Link className="button space-top" to="/">
        {t("next")}
        <ArrowRight size={18} />
      </Link>
    </>
  );
}

import { useApp, useWords } from "../../app/providers";
export default function LanguageNotice() {
  const { uiLang } = useApp(),
    t = useWords();
  if (uiLang === "te" || uiLang === "en") return null;
  return (
    <aside className="language-notice" role="status">
      <span>🌐</span>
      <p>
        {t("previewNotice")}{" "}
        {t(uiLang === "hi" ? "hindiReview" : "contentFallback")}
      </p>
    </aside>
  );
}

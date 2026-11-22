import { speak } from "../../services/voiceService";
import { useApp, useWords } from "../../app/providers";
export default function LessonAudioPlayer({ text }: { text: string }) {
  const { lang, notify } = useApp(),
    t = useWords();
  return (
    <div className="button-row">
      <button className="soft-button" onClick={() => speak(text, lang, notify)}>
        {t("listen")}
      </button>
      <button
        className="soft-button"
        onClick={() => window.speechSynthesis?.cancel()}
      >
        {t("stop")}
      </button>
    </div>
  );
}

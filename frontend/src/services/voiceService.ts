import type { Lang } from "../../../shared/types";
export function speak(text: string, lang: Lang, notify: (s: string) => void) {
  if (!("speechSynthesis" in window)) {
    notify(
      lang === "te"
        ? "ఈ బ్రౌజర్‌లో చదివి వినిపించడం లేదు."
        : "Speech playback unavailable.",
    );
    return;
  }
  speechSynthesis.cancel();
  const voices = speechSynthesis.getVoices();
  const voice = voices.find((v) => v.lang.startsWith(lang));
  if (!voice) {
    notify(
      lang === "te"
        ? "ఈ పరికరంలో తెలుగు గొంతు అందుబాటులో లేదు."
        : "No matching voice installed on this device.",
    );
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang+"-IN";
  utterance.voice = voice;
  speechSynthesis.speak(utterance);
}


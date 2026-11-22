import {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
  type ReactNode,
} from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLiveQuery } from "dexie-react-hooks";
import {
  BookOpen,
  House,
  Sparkles,
  Target,
  ChartNoAxesCombined,
  Download,
  Settings,
  Users,
  Medal,
  Mic,
  Camera,
  FlaskConical,
  Gamepad2,
  Check,
  ChevronRight,
  Globe,
  Wifi,
  WifiOff,
  ShieldCheck,
  Volume2,
  Menu,
  X,
  Send,
  Lightbulb,
  Leaf,
  Flame,
  CheckCircle2,
  CloudOff,
  Plus,
  Trash2,
} from "lucide-react";
import type {
  Lang,
  Lesson,
  TutorRequest,
  TutorResponse,
  CheckResponse,
} from "../../../shared/types";
import { db, initialize, type Profile } from "../db/database";
import { pack, getLesson, check, chat, photo } from "../services/api";
import {
  mastery,
  nextQuestion,
  fraction,
  equivalent,
  type Attempt,
} from "../features/adaptive-learning/engine";
import i18n from "../i18n";
import PlayGarden from "../games/FractionMatch";
import { useApp, useWords } from "../app/providers";
import Star from "../components/mascot/MitraMascot";
import PageTitle from "../components/layout/PageTitle";
import Card from "../components/ui/Card";
import ProgressBar from "../components/ui/ProgressBar";
import LessonSelect from "../components/learning/LessonSelect";
import { validLessonQuery } from "../utils/lessonQuery";
import { speak } from "../services/voiceService";
export default function Tutor({
  initial = "chat",
}: {
  initial?: "chat" | "voice" | "photo";
}) {
  const t = useWords(),
    { lang, uiLang, notify } = useApp(),
    [lessonId, setLessonId] = useState(validLessonQuery()),
    [mode, setMode] = useState<TutorRequest["mode"]>("steps"),
    [online, setOnline] = useState(false),
    [consent, setConsent] = useState(false),
    [photoConsent, setPhotoConsent] = useState(false),
    [tab, setTab] = useState(initial),
    [message, setMessage] = useState(""),
    [responses, setResponses] = useState<
      { question: string; reply: TutorResponse }[]
    >([]),
    [busy, setBusy] = useState(false),
    [file, setFile] = useState<File | null>(null),
    [preview, setPreview] = useState(""),
    [listening, setListening] = useState(false);
  const recognition = useRef<any>(null);
  useEffect(
    () => () => {
      recognition.current?.abort();
      window.speechSynthesis?.cancel();
    },
    [],
  );
  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);
  async function ask(e?: React.FormEvent) {
    e?.preventDefault();
    setBusy(true);
    try {
      const reply = await chat({
        message,
        lesson_id: lessonId,
        language: online ? uiLang : lang,
        mode,
        online,
        consent,
      });
      setResponses((x) => [...x, { question: message || t(mode), reply }]);
      setMessage("");
    } catch (e) {
      notify((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  function startVoice() {
    const Speech =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!Speech) {
      notify(t("unsupported"));
      return;
    }
    const r = new Speech();
    recognition.current = r;
    r.lang = uiLang === "ur" ? "ur-IN" : uiLang+"-IN";
    r.interimResults = false;
    r.onresult = (e: any) => {
      setMessage(e.results[0][0].transcript);
      setTab("chat");
    };
    r.onerror = () => {
      setListening(false);
      notify(t("unsupported"));
    };
    r.onend = () => setListening(false);
    r.start();
    setListening(true);
  }
  async function sendPhoto() {
    if (!file || !photoConsent) return;
    setBusy(true);
    try {
      const reply = await photo(file, uiLang, photoConsent);
      setResponses((x) => [...x, { question: t("photo"), reply }]);
      setFile(null);
      setPhotoConsent(false);
      setTab("chat");
    } catch (e) {
      notify((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <PageTitle title={t("tutor")} sub={t("about")} />
      <div className="tutor-layout">
        <Card className="chat-card">
          <div className="tabs">
            {(["chat", "voice", "photo"] as const).map((x, i) => (
              <button
                className={tab === x ? "active" : ""}
                key={x}
                onClick={() => setTab(x)}
              >
                {
                  [
                    <Sparkles size={18} />,
                    <Mic size={18} />,
                    <Camera size={18} />,
                  ][i]
                }
                {t(x === "chat" ? "tutor" : x)}
              </button>
            ))}
          </div>
          {tab === "voice" && (
            <div className="voice-panel">
              <Mic size={48} />
              <h2>{t("voice")}</h2>
              <p>{t("voiceNote")}</p>
              <button
                className="button"
                disabled={listening}
                onClick={startVoice}
              >
                {listening ? "…" : t("mic")}
              </button>
              {listening && (
                <button
                  className="soft-button"
                  onClick={() => recognition.current?.stop()}
                >
                  {t("stop")}
                </button>
              )}
            </div>
          )}
          {tab === "photo" && (
            <div className="photo-panel">
              <Camera size={40} />
              <h2>{t("photo")}</h2>
              <p>{t("photoNote")}</p>
              <label className="field">
                {t("photo")}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  capture="environment"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f && f.size > 4000000) {
                      notify("Maximum 4 MB");
                      e.target.value = "";
                      return;
                    }
                    setFile(f ?? null);
                    setPhotoConsent(false);
                  }}
                />
              </label>
              {preview && (
                <img src={preview} className="photo-preview" alt={t("photo")} />
              )}
              <label className="check-label">
                <input
                  type="checkbox"
                  checked={photoConsent}
                  onChange={(e) => setPhotoConsent(e.target.checked)}
                />
                {t("photoConsent")}
              </label>
              <button
                className="button"
                disabled={!file || !photoConsent || busy}
                onClick={sendPhoto}
              >
                {t(busy ? "photoBusy" : "upload")}
              </button>
            </div>
          )}
          {tab === "chat" && (
            <>
              <div className="chat-history" aria-live="polite">
                <div className="mitra-message">
                  <img className="tutor-orbit-avatar" src="/illustrations/mitra-orbit.svg" alt="Mitra" />
                  <div>
                    <strong>Mitra</strong>
                    <p>{t("question")}</p>
                    <small>
                      {t("local")} ·{" "}
                      {lang === "te"
                        ? "ఎంచుకున్న పాఠం ఆధారంగా సహాయం. ఏ ప్రశ్నకైనా స్వయంచాలక సమాధానం కాదు."
                        : "Guidance from your selected lesson, not a generated answer to arbitrary questions."}
                    </small>
                  </div>
                </div>
                {responses.map((r, i) => (
                  <div key={i}>
                    <div className="user-message">{r.question}</div>
                    <div className="answer-message">
                      <span className="badge">
                        {r.reply.source === "offline"
                          ? t("local")
                          : "Gemini · AI"}
                      </span>
                      <p>{r.reply.answer}</p>
                      <button
                        className="soft-button"
                        onClick={() => speak(r.reply.answer, lang, notify)}
                      >
                        <Volume2 size={16} />
                        {t("listen")}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <form className="chat-compose" onSubmit={ask}>
                <label className="sr-only" htmlFor="question">
                  {t("question")}
                </label>
                <textarea
                  id="question"
                  maxLength={1500}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t("question")}
                />
                <button
                  className="button"
                  disabled={busy || (online && !consent)}
                >
                  <Send size={18} />
                  {busy ? "…" : t("send")}
                </button>
              </form>
            </>
          )}
        </Card>
        <div>
          <Card className="tutor-options">
            <LessonSelect value={lessonId} onChange={setLessonId} />
            <div className="mode-options">
              {(["simple", "steps", "example", "hint"] as const).map((m) => (
                <button
                  className={
                    mode === m ? "soft-button selected" : "soft-button"
                  }
                  key={m}
                  onClick={() => setMode(m)}
                >
                  {t(m)}
                </button>
              ))}
            </div>
            <label className="check-label">
              <input
                type="checkbox"
                checked={online}
                onChange={(e) => {
                  setOnline(e.target.checked);
                  setConsent(false);
                }}
              />
              {t("online")}
            </label>
            {online && (
              <label className="check-label">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                {t("onlineConsent")}
              </label>
            )}
            <p className="small-note">{t("privacy")}</p>
            <Link to="/visual" className="text-link">
              {t("visual")}
            </Link>
          </Card>
        </div>
      </div>
    </>
  );
}


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
export default function Quiz() {
  const t = useWords(),
    { lang, profile, attempts, notify } = useApp(),
    [lessonId, setLessonId] = useState(validLessonQuery()),
    [answer, setAnswer] = useState(""),
    [hint, setHint] = useState(false),
    [result, setResult] = useState<CheckResponse | null>(null),
    [busy, setBusy] = useState(false);
  const pool = pack.questions.filter((q) => q.lessonId === lessonId),
    [qid, setQid] = useState("");
  const relevant = attempts.filter((a) => a.lessonId === lessonId);
  const q = pool.find((q) => q.id === qid) || nextQuestion(pool, relevant);
  useEffect(() => {
    if (!result) setQid(nextQuestion(pool, relevant).id);
  }, [lessonId]);
  function next() {
    setQid(nextQuestion(pool, relevant).id);
    setAnswer("");
    setHint(false);
    setResult(null);
  }
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!profile || busy || result) return;
    if (!fraction(answer)) {
      notify(
        lang === "te"
          ? "సరైన భిన్నం రాయండి. హారం సున్నా కాకూడదు."
          : "Enter an integer or fraction with a nonzero denominator.",
      );
      return;
    }
    setBusy(true);
    const question = q;
    setQid(q.id);
    try {
      const r = await check(question, answer);
      await db.attempts.add({
        profileId: profile.id,
        questionId: question.id,
        lessonId,
        correct: r.correct,
        hint,
        at: Date.now(),
      });
      setResult(r);
    } catch {
      notify(t("saveError"));
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <PageTitle title={t("quiz")} sub={t("tip")} />
      <div className="reader-layout">
        <Card className="quiz-card">
          <LessonSelect
            value={lessonId}
            onChange={(v) => {
              setLessonId(v);
              setResult(null);
              setHint(false);
              setAnswer("");
              setQid("");
            }}
          />
          <div className="section-heading">
            <span className="badge">
              {t("practice")} · {q.level}/3
            </span>
            <span>
              {t("mastery")}: {mastery(relevant)}%
            </span>
          </div>
          <ProgressBar value={mastery(relevant)} />
          <h2 className="quiz-question">{q.prompt[lang]}</h2>
          <form onSubmit={submit}>
            <label className="field">
              {t("answer")}
              <input
                inputMode="text"
                value={answer}
                maxLength={30}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={!!result || busy}
                required
                autoComplete="off"
              />
            </label>
            <div className="button-row">
              <button
                className="button"
                disabled={!!result || busy || !answer.trim()}
              >
                {busy ? "…" : t("check")}
              </button>
              <button
                type="button"
                className="soft-button"
                disabled={!!result}
                onClick={() => setHint(true)}
              >
                <Lightbulb size={18} />
                {t("hint")}
              </button>
            </div>
          </form>
          {hint && <div className="hint-box">{q.hint[lang]}</div>}
          {result && (
            <div
              className={"result " + (result.correct ? "success" : "retry")}
              role="status"
            >
              <h3>{t(result.correct ? "correct" : "incorrect")}</h3>
              <p>{result.explanation[lang]}</p>
              <strong dir="ltr">{result.answer}</strong>
              <button className="button space-top" onClick={next}>
                {t("next")}
              </button>
            </div>
          )}
        </Card>
        <Card className="reader-help">
          <Star size={100} />
          <h3>{t("recommend")}</h3>
          <p>
            {relevant.slice(-3).filter((a) => !a.correct).length >= 2
              ? lang === "te"
                ? "సులభమైన ప్రశ్నతో మళ్లీ మొదలుపెడదాం. సూచనను చూడండి."
                : "Let’s start again with an easier question. Try the hint."
              : t("tip")}
          </p>
          <Link className="soft-button" to={"/lessons/" + lessonId}>
            {t("read")}
          </Link>
        </Card>
      </div>
    </>
  );
}

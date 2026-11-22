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
export default function Reader() {
  const { id } = useParams(),
    t = useWords(),
    { lang, profile, notify } = useApp(),
    [lesson, setLesson] = useState<Lesson | null>(null),
    [failed, setFailed] = useState(false),
    [step, setStep] = useState(0),
    [busy, setBusy] = useState(false),
    navigate = useNavigate();
  useEffect(() => {
    let alive = true;
    Promise.all([getLesson(id!), db.completions.get(profile?.id + ":" + id)])
      .then(([l, c]) => {
        if (alive) {
          setLesson(l);
          setStep(Math.min(c?.step ?? 0, l.steps.length - 1));
        }
      })
      .catch(() => {
        if (alive) setFailed(true);
      });
    return () => {
      alive = false;
      window.speechSynthesis?.cancel();
    };
  }, [id, profile?.id]);
  async function save(next: number, done = false) {
    if (!profile || !lesson) return;
    setBusy(true);
    try {
      const previous = await db.completions.get(profile.id + ":" + id);
      await db.completions.put({
        key: profile.id + ":" + id,
        profileId: profile.id,
        lessonId: id!,
        step: next,
        done: done || previous?.done || false,
      });
      setStep(next);
      if (done) {
        notify(t("saved"));
        navigate("/quiz?lesson=" + id);
      }
    } catch {
      notify(t("saveError"));
    } finally {
      setBusy(false);
    }
  }
  if (failed)
    return (
      <Card>
        <h2>{t("error")}</h2>
        <Link to="/lessons" className="button">
          {t("lessons")}
        </Link>
      </Card>
    );
  if (!lesson) return <p>{t("loading")}</p>;
  const s = lesson.steps[step];
  return (
    <>
      <PageTitle title={lesson.title[lang]} sub={t("chapter")} />
      <div className="reader-layout">
        <Card className="reader">
          <div className="section-heading">
            <span className="badge">
              {step + 1} / {lesson.steps.length}
            </span>
            <button
              className="soft-button"
              onClick={() => speak(s.body[lang], lang, notify)}
            >
              <Volume2 size={17} />
              {t("listen")}
            </button>
            <button
              className="icon-btn"
              aria-label={t("stop")}
              onClick={() => speechSynthesis.cancel()}
            >
              <X size={17} />
            </button>
          </div>
          <ProgressBar value={((step + 1) / lesson.steps.length) * 100} />
          <h2>{s.title[lang]}</h2>
          <p className="lesson-body">{s.body[lang]}</p>
          <div className="math-example" dir="ltr">
            {s.example}
          </div>
          <div className="reader-controls">
            <button
              className="soft-button"
              disabled={step === 0 || busy}
              onClick={() => save(step - 1)}
            >
              {t("back")}
            </button>
            <button
              className="button"
              disabled={busy}
              onClick={() =>
                step === lesson.steps.length - 1
                  ? save(step, true)
                  : save(step + 1)
              }
            >
              {t(step === lesson.steps.length - 1 ? "complete" : "next")}
            </button>
          </div>
        </Card>
        <Card className="reader-help">
          <Star size={90} />
          <h3>{t("hint")}</h3>
          <p>{lesson.summary[lang]}</p>
          <Link to={"/tutor?lesson=" + id} className="soft-button">
            <Sparkles size={18} />
            {t("tutor")}
          </Link>
          <Link to="/visual" className="text-link">
            {t("visual")}
          </Link>
        </Card>
      </div>
    </>
  );
}

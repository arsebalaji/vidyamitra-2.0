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
export default function Offline() {
  const t = useWords(),
    { lang, notify } = useApp(),
    [ready, setReady] = useState(
      localStorage.getItem("offline-ready") === "yes",
    );
  const downloads = useLiveQuery(() => db.downloads.toArray(), [], []);
  useEffect(() => {
    const f = () => setReady(true);
    window.addEventListener("offline-ready", f);
    return () => window.removeEventListener("offline-ready", f);
  }, []);
  async function save(id?: string) {
    try {
      await db.downloads.bulkPut(
        pack.lessons
          .filter((l) => !id || l.id === id)
          .map((l) => ({ id: l.id, lesson: l, savedAt: Date.now() })),
      );
      await navigator.storage?.persist?.();
      notify(t("saved"));
    } catch {
      notify(t("saveError"));
    }
  }
  return (
    <>
      <PageTitle
        title={t("offline")}
        sub={t(ready ? "offlineReady" : "offlineWait")}
      >
        <button className="button" onClick={() => save()}>
          <Download size={18} />
          {t("all")}
        </button>
      </PageTitle>
      <p className="hint-box">{t("downloadNote")}</p>
      <Card>
        {pack.lessons.map((l) => {
          const has = downloads.some((d) => d.id === l.id);
          return (
            <div className="lesson-row" key={l.id}>
              <span className="stat-icon teal">
                {has ? <Check /> : <BookOpen />}
              </span>
              <div>
                <h3>{l.title[lang]}</h3>
                <small>{has ? t("saved") : t("available")}</small>
              </div>
              <button
                className="soft-button"
                onClick={() =>
                  has
                    ? db.downloads
                        .delete(l.id)
                        .catch(() => notify(t("saveError")))
                    : save(l.id)
                }
              >
                {t(has ? "remove" : "download")}
              </button>
            </div>
          );
        })}
      </Card>
    </>
  );
}

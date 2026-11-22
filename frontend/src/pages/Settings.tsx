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
export default function Preferences() {
  const t = useWords(),
    { profile, notify, switchProfile } = useApp(),
    [large, setLarge] = useState(localStorage.getItem("large") === "true"),
    [motion, setMotion] = useState(localStorage.getItem("motion") === "true"),
    [install, setInstall] = useState<any>(null),
    navigate = useNavigate();
  useEffect(() => {
    const fn = (e: Event) => {
      e.preventDefault();
      setInstall(e);
    };
    window.addEventListener("beforeinstallprompt", fn);
    return () => window.removeEventListener("beforeinstallprompt", fn);
  }, []);
  function setting(key: string, value: boolean) {
    localStorage.setItem(key, String(value));
    document.documentElement.classList.toggle(
      key === "large" ? "large" : "reduced",
      value,
    );
    if (key === "large") setLarge(value);
    else setMotion(value);
  }
  async function exportData() {
    if (!profile) return;
    const data = {
      version: 1,
      profile,
      attempts: await db.attempts
        .where("profileId")
        .equals(profile.id)
        .toArray(),
      completions: await db.completions
        .where("profileId")
        .equals(profile.id)
        .toArray(),
    };
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "vidyamitra-progress.json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  async function remove() {
    if (!profile || !confirm(t("clearConfirm"))) return;
    try {
      await db.transaction(
        "rw",
        db.profiles,
        db.attempts,
        db.completions,
        async () => {
          await db.attempts.where("profileId").equals(profile.id).delete();
          await db.completions.where("profileId").equals(profile.id).delete();
          await db.profiles.delete(profile.id);
        },
      );
      await initialize();
      const p = await db.profiles.toCollection().first();
      switchProfile(p!.id);
      navigate("/profiles");
    } catch {
      notify(t("saveError"));
    }
  }
  return (
    <>
      <PageTitle title={t("settings")} sub={t("settingsSaved")} />
      <Card>
        <h2>{t("language")}</h2>
        <Link to="/language" className="soft-button">
          <Globe size={18} />
          {t("chooseLanguage")}
        </Link>
        <hr />
        <label className="check-label">
          <input
            type="checkbox"
            checked={large}
            onChange={(e) => setting("large", e.target.checked)}
          />
          {t("large")}
        </label>
        <label className="check-label">
          <input
            type="checkbox"
            checked={motion}
            onChange={(e) => setting("motion", e.target.checked)}
          />
          {t("motion")}
        </label>
        <hr />
        <h2>{t("profiles")}</h2>
        <p>{t("privacy")}</p>
        <div className="button-row">
          <button
            className="soft-button"
            onClick={() => exportData().catch(() => notify(t("error")))}
          >
            <Download size={18} />
            {t("export")}
          </button>
          <button className="danger-button" onClick={remove}>
            <Trash2 size={18} />
            {t("delete")}
          </button>
        </div>
        {install && (
          <button
            className="button space-top"
            onClick={async () => {
              await install.prompt();
              setInstall(null);
            }}
          >
            {t("install")}
          </button>
        )}
      </Card>
    </>
  );
}

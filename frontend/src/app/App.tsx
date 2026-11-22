import MobileNavigation from '../components/layout/MobileNavigation';
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
import { AppContext } from "./providers";
import AppRouter from "./router";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import {resolveLanguage} from '../i18n/languageRegistry';
import LanguageNotice from '../components/language/LanguageNotice';
export default function App() {
  const t = useWords(),
    location = useLocation();
  const [ready, setReady] = useState(false),
    [fatal, setFatal] = useState(""),
    [active, setActive] = useState(
      localStorage.getItem("profile") || "demo-mitra",
    ),
    [toast, setToast] = useState(""),
    [menu, setMenu] = useState(false),
    [connected, setConnected] = useState(navigator.onLine);
  const profiles = useLiveQuery(() => db.profiles.toArray(), [], []),
    attempts = useLiveQuery(
      () => db.attempts.where("profileId").equals(active).toArray(),
      [active],
      [],
    );
  const selectedLanguage=resolveLanguage(i18n.language);
  const uiLang=selectedLanguage.code;
  const lang=selectedLanguage.contentLanguage as Lang;
  useEffect(() => {
    initialize()
      .then(() => setReady(true))
      .catch(() => setFatal(t("saveError")));
    const online = () => setConnected(navigator.onLine);
    window.addEventListener("online", online);
    window.addEventListener("offline", online);
    return () => {
      window.removeEventListener("online", online);
      window.removeEventListener("offline", online);
    };
  }, []);
  useEffect(() => {
    document.documentElement.lang = uiLang;
    document.documentElement.dir = selectedLanguage.direction;
  }, [uiLang]);
  useEffect(() => {
    document.documentElement.classList.toggle(
      "large",
      localStorage.getItem("large") === "true",
    );
    document.documentElement.classList.toggle(
      "reduced",
      localStorage.getItem("motion") === "true",
    );
  }, []);
  useEffect(() => {
    setMenu(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(""), 6000);
      return () => clearTimeout(timer);
    }
  }, [toast]);
  const profile = profiles.find((p) => p.id === active) ?? profiles[0] ?? null;
  useEffect(() => {
    if (profile && profile.id !== active) setActive(profile.id);
  }, [profile, active]);
  function switchProfile(id: string) {
    setActive(id);
    localStorage.setItem("profile", id);
  }
  if (fatal)
    return (
      <main className="fatal">
        <Star />
        <h1>{fatal}</h1>
        <button onClick={() => location && window.location.reload()}>
          {t("retry")}
        </button>
      </main>
    );
  if (!ready)
    return (
      <main className="fatal">
        <Star />
        <p>{t("loading")}</p>
      </main>
    );
  return (
    <AppContext.Provider
      value={{ profile, lang, uiLang, attempts, notify: setToast, switchProfile }}
    >
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="app-shell">
        <Sidebar menu={menu} setMenu={setMenu} />
        {menu && (
          <button
            className="scrim"
            aria-label="Close menu"
            onClick={() => setMenu(false)}
          />
        )}
        <div className="workspace">
          <Header setMenu={setMenu} connected={connected} />
          <main id="main">
            <LanguageNotice/>
            <AppRouter active={active} />
          </main>
          <footer>
            <span>✦ VidyaMitra AI</span>
            <span>{t("about")}</span>
            <Link to="/welcome">{t("begin")}</Link>
          </footer>
        </div>
      </div>
      <MobileNavigation/>
      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
    </AppContext.Provider>
  );
}


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
export default function Profiles() {
  const t = useWords(),
    { profile, switchProfile, notify } = useApp(),
    navigate = useNavigate(),
    [name, setName] = useState("");
  const profiles = useLiveQuery(() => db.profiles.toArray(), [], []);
  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      const id = crypto.randomUUID();
      await db.profiles.add({
        id,
        name: name.trim().slice(0, 24),
        color: "#5B5FEF",
        created: Date.now(),
      });
      switchProfile(id);
      setName("");
      navigate("/");
    } catch {
      notify(t("saveError"));
    }
  }
  return (
    <>
      <PageTitle title={t("profiles")} sub={t("privacy")} />
      <div className="language-grid">
        {profiles.map((p) => (
          <button
            key={p.id}
            className={
              "card profile-card " + (profile?.id === p.id ? "selected" : "")
            }
            onClick={() => {
              switchProfile(p.id);
              navigate("/");
            }}
          >
            <span className="avatar large-avatar">{p.name.slice(0, 1)}</span>
            <h2>{p.name}</h2>
            <span>{t(profile?.id === p.id ? "chosen" : "switch")}</span>
          </button>
        ))}
      </div>
      <Card className="space-top">
        <form onSubmit={add}>
          <label className="field">
            {t("name")}
            <input
              maxLength={24}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <button className="button" disabled={!name.trim()}>
            <Plus size={18} />
            {t("add")}
          </button>
        </form>
      </Card>
    </>
  );
}

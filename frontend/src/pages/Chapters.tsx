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
export default function Lessons() {
  const t = useWords(),
    { lang, profile } = useApp();
  const completions = useLiveQuery(
    () =>
      db.completions
        .where("profileId")
        .equals(profile?.id || "")
        .toArray(),
    [profile?.id],
    [],
  );
  return (
    <>
      <PageTitle title={t("chapter")} sub={t("pack")}>
        <Link to="/curriculum" className="soft-button">
          {t("curriculum")}
        </Link>
      </PageTitle>
      <div className="lesson-grid">
        {pack.lessons.map((l, i) => (
          <Link className="card lesson-tile" key={l.id} to={"/lessons/" + l.id}>
            <div className="tile-top">
              <span className="number-box">
                {String(i + 1).padStart(2, "0")}
              </span>
              {completions.find((c) => c.lessonId === l.id)?.done ? (
                <CheckCircle2 className="teal-text" />
              ) : (
                <BookOpen className="text-muted" />
              )}
            </div>
            <div className={"lesson-art lesson-art-" + i} aria-hidden="true">
              <span>{["½", "⅔", "−½", "＋", "×", "(a+b)", "↔", "∞"][i]}</span>
              <div className="art-grid">
                {Array.from({ length: 6 }, (_, j) => (
                  <i key={j} />
                ))}
              </div>
              <span className="art-spark">✦</span>
            </div>
            <h2>{l.title[lang]}</h2>
            <p>{l.summary[lang]}</p>
            <div className="tile-bottom">
              <span>
                {l.minutes} min · 3 {t("steps")}
              </span>
              <ChevronRight />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

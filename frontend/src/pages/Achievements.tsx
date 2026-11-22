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
export default function Achievements() {
  const t = useWords(),
    { profile, attempts } = useApp();
  const done = useLiveQuery(
    () =>
      db.completions
        .where("profileId")
        .equals(profile?.id || "")
        .toArray(),
    [profile?.id],
    [],
  );
  const conditions = [
    done.some((c) => c.done),
    attempts.length >= 5,
    done.filter((c) => c.done).length === 8,
    attempts.filter((a) => a.correct && !a.hint).length >= 10,
  ];
  return (
    <>
      <PageTitle title={t("achievements")} sub={t("tip")} />
      <div className="language-grid">
        {conditions.map((earned, i) => (
          <Card
            key={i}
            className={"achievement " + (!earned ? "unearned" : "")}
          >
            <span className="medallion">
              <Medal size={50} />
            </span>
            <h2>{t("badge" + (i + 1))}</h2>
            <p>{t(earned ? "earned" : "locked")}</p>
            <small>
              {
                [
                  "1 " + t("finished"),
                  "5 " + t("attempts"),
                  "8 " + t("finished"),
                  "10 ✓ · " + t("practice"),
                ][i]
              }
            </small>
          </Card>
        ))}
      </div>
    </>
  );
}

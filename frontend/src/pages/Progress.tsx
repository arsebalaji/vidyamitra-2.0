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
export default function Progress({ guardian = false }: { guardian?: boolean }) {
  const t = useWords(),
    { attempts, profile, lang } = useApp();
  const done = useLiveQuery(
    () =>
      db.completions
        .where("profileId")
        .equals(profile?.id || "")
        .toArray(),
    [profile?.id],
    [],
  );
  const weak = [...pack.lessons].sort(
    (a, b) =>
      mastery(attempts.filter((x) => x.lessonId === a.id)) -
      mastery(attempts.filter((x) => x.lessonId === b.id)),
  )[0];
  return (
    <>
      <PageTitle
        title={t(guardian ? "guardian" : "progress")}
        sub={guardian ? t("guardianNote") : profile?.name}
      />
      <div className="stat-row">
        <Card>
          <Target />
          <strong>{attempts.length}</strong>
          <p>{t("attempts")}</p>
        </Card>
        <Card>
          <CheckCircle2 />
          <strong>
            {attempts.length
              ? Math.round(
                  (attempts.filter((a) => a.correct).length / attempts.length) *
                    100,
                )
              : 0}
            %
          </strong>
          <p>{t("accuracy")}</p>
        </Card>
        <Card>
          <BookOpen />
          <strong>{done.filter((c) => c.done).length}/8</strong>
          <p>{t("finished")}</p>
        </Card>
      </div>
      {!attempts.length && <p className="hint-box">{t("empty")}</p>}
      <Card>
        <h2>{t("mastery")}</h2>
        {pack.lessons.map((l) => {
          const a = attempts.filter((x) => x.lessonId === l.id);
          return (
            <div className="mastery-row" key={l.id}>
              <div>
                <strong>{l.title[lang]}</strong>
                <small>
                  {a.length} {t("attempts")} · {a.filter((x) => x.hint).length}{" "}
                  {t("hint")}
                </small>
              </div>
              <ProgressBar value={mastery(a)} />
              <strong>{mastery(a)}%</strong>
            </div>
          );
        })}
      </Card>
      <Card className="space-top">
        <h3>{t("recommend")}</h3>
        <p>{weak.title[lang]}</p>
        <Link className="button" to={"/quiz?lesson=" + weak.id}>
          {t("practice")}
        </Link>
      </Card>
    </>
  );
}

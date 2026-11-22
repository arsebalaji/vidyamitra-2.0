import AdventureHero from '../components/dashboard/AdventureHero';
import LearningWorldCard from '../components/dashboard/LearningWorldCard';
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
export default function Dashboard() {
  const t = useWords(),
    { profile, lang, attempts } = useApp();
  const completed = useLiveQuery(
    () =>
      db.completions
        .where("profileId")
        .equals(profile?.id || "")
        .toArray(),
    [profile?.id],
    [],
  );
  const done = completed.filter((x) => x.done).length;
  const resume =
    pack.lessons.find(
      (l) => !completed.find((c) => c.lessonId === l.id && c.done),
    ) ?? pack.lessons[0];
  return (
    <>
      <PageTitle title={t("greeting")} sub={t("subtitle")}>
        <Link className="soft-button" to="/curriculum">
          <BookOpen size={17} />
          {t("class")}
          <ChevronRight size={16} />
        </Link>
      </PageTitle>
      <div className="dashboard-grid">
        <div className="dashboard-main">
          <AdventureHero lessonId={resume.id}/>
          <div className="world-shortcuts"><LearningWorldCard title={t("lessons")} subtitle={t("chapter")} icon="✦" to="/universe" tone="blue"/><LearningWorldCard title={t("practice")} subtitle={t("quiz")} icon="✎" to="/quiz" tone="purple"/><LearningWorldCard title={t("games")} subtitle={t("adventurePlay")} icon="⌘" to="/games" tone="teal"/><LearningWorldCard title={t("progress")} subtitle={t("achievements")} icon="★" to="/progress" tone="orange"/></div>
          <div className="section-heading">
            <h2>{t("quick")}</h2>
            <span className="text-muted">{t("discover")}</span>
          </div>
          <div className="quick-grid">
            {[
              [Camera, "photo", "/photo", "peach"],
              [Sparkles, "tutor", "/tutor", "purple"],
              [Mic, "voice", "/voice", "teal"],
              [Gamepad2, "games", "/games", "yellow"],
            ].map(([Icon, key, path, color]: any) => (
              <Link className="quick-card" key={key} to={path}>
                <span className={"stat-icon " + color}>
                  <Icon size={24} />
                </span>
                <strong>{t(key)}</strong>
                <ChevronRight size={17} />
              </Link>
            ))}
          </div>
          <div className="stat-row">
            <Card>
              <span className="stat-icon purple">
                <BookOpen />
              </span>
              <div>
                <strong>
                  {done}
                  <small> / 8</small>
                </strong>
                <p>{t("finished")}</p>
              </div>
            </Card>
            <Card>
              <span className="stat-icon teal">
                <Target />
              </span>
              <div>
                <strong>{attempts.length}</strong>
                <p>{t("attempts")}</p>
              </div>
            </Card>
            <Card>
              <span className="stat-icon yellow">
                <Medal />
              </span>
              <div>
                <strong>
                  {attempts.length
                    ? Math.round(
                        (attempts.filter((a) => a.correct).length /
                          attempts.length) *
                          100,
                      )
                    : 0}
                  <small>%</small>
                </strong>
                <p>{t("accuracy")}</p>
              </div>
            </Card>
          </div>
          <div className="section-heading">
            <h2>{t("journey")}</h2>
            <Link to="/lessons">
              {t("view")} <ChevronRight size={16} />
            </Link>
          </div>
          <Card className="chapter-card">
            <div className="chapter-illustration">
              <span>⅔</span>
              <span>¼</span>
              <div className="fraction-blocks">
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
            <div className="chapter-info">
              <span className="eyebrow">{t("board")} · 01</span>
              <h2>{t("chapter")}</h2>
              <p>{t("pack")}</p>
              <ProgressBar value={(done / 8) * 100} />
              <div className="chapter-bottom">
                <span>
                  {done}/8 {t("finished")}
                </span>
                <Link to="/lessons" className="text-link">
                  {t("learn")} <ChevronRight size={17} />
                </Link>
              </div>
            </div>
          </Card>
          <div className="orbit-lesson-list">
            {pack.lessons.slice(0, 3).map((lesson, index) => (
              <Link to={"/lessons/" + lesson.id} key={lesson.id}>
                <span className="orbit-lesson-number">0{index + 1}</span>
                <div>
                  <strong>{lesson.title[lang]}</strong>
                  <small>{lesson.summary[lang]}</small>
                </div>
                <ChevronRight size={20} />
              </Link>
            ))}
          </div>
        </div>
        <aside className="dashboard-rail">
          <Card className="goal-card">
            <div className="section-heading">
              <h3>{t("goal")}</h3>
              <span className="sun-icon">☀</span>
            </div>
            <div
              className="goal-ring"
              style={{
                background: `conic-gradient(#16B8A6 ${Math.min(100, (done ? 50 : 0) + (Math.min(3, attempts.length) / 3) * 50)}%, #e4edf7 0)`,
              }}
            >
              <div>
                <Leaf size={28} />
                <strong>
                  {done > 0 ? 1 : 0}
                  <small>/1</small>
                </strong>
                <span>{t("finished")}</span>
              </div>
            </div>
            <p>{t("goalText")}</p>
            <Link to="/quiz" className="button full">
              {t("practice")}
            </Link>
          </Card>
          <Card className="recommend-card">
            <span className="stat-icon yellow">
              <Lightbulb />
            </span>
            <h3>{t("recommend")}</h3>
            <p>{resume.title[lang]}</p>
            <Link to={"/lessons/" + resume.id} className="text-link">
              {t("read")}
              <ChevronRight size={16} />
            </Link>
          </Card>
          <Link to="/offline" className="offline-callout">
            <CloudOff size={25} />
            <div>
              <strong>{t("offline")}</strong>
              <p>{t("saved")}</p>
            </div>
            <ChevronRight size={17} />
          </Link>
          <Link to="/achievements" className="achievement-link">
            <Medal size={20} />
            {t("achievements")}
            <ChevronRight size={16} />
          </Link>
        </aside>
      </div>
    </>
  );
}

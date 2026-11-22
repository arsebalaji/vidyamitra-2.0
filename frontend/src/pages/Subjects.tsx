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
export default function Curriculum() {
  const t = useWords();
  const chapters = [
    "Linear Equations in One Variable",
    "Construction of Quadrilaterals",
    "Exponents and Powers",
    "Comparing Quantities using Proportion",
    "Square Roots and Cube Roots",
    "Frequency Distribution Tables and Graphs",
    "Exploring Geometrical Figures",
    "Area of Plane Figures",
    "Direct and Inverse Proportions",
    "Algebraic Expressions",
    "Factorisation",
    "Visualising 3-D in 2-D",
    "Surface Areas and Volume (Cube and Cuboid)",
    "Playing with Numbers",
  ];
  return (
    <>
      <PageTitle
        title={t("curriculum")}
        sub={t("board") + " · " + t("class")}
      />
      <Card>
        <p>India · Telangana · Class 8 · Mathematics</p>
        <Link className="lesson-row" to="/lessons">
          <span className="number-box">01</span>
          <div>
            <h3>{t("chapter")}</h3>
            <span className="badge">{t("available")}</span>
          </div>
          <ChevronRight />
        </Link>
        {chapters.map((c, i) => (
          <div className="lesson-row muted" key={c}>
            <span className="number-box">{String(i + 2).padStart(2, "0")}</span>
            <div>
              <h3 lang="en">{c}</h3>
              <small>{t("planned")}</small>
            </div>
          </div>
        ))}
      </Card>
    </>
  );
}

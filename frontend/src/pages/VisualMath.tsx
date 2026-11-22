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
export default function Visualizer() {
  const t = useWords(),
    [n, setN] = useState(3),
    [d, setD] = useState(4);
  return (
    <>
      <PageTitle title={t("visual")} sub={t("visualHint")} />
      <Card className="visualizer">
        <div className="fraction-display">
          {n}
          <span />
          {d}
        </div>
        <div className="fraction-pieces">
          {Array.from({ length: d }, (_, i) => (
            <div key={i} className={i < Math.abs(n) ? "filled" : ""}>
              {i + 1}/{d}
            </div>
          ))}
        </div>
        <svg
          viewBox="0 0 800 120"
          role="img"
          aria-label={`${n}/${d} on number line`}
        >
          <line
            x1="40"
            x2="760"
            y1="55"
            y2="55"
            stroke="#9ca3af"
            strokeWidth="3"
          />
          {Array.from({ length: 9 }, (_, i) => (
            <g key={i}>
              <line
                x1={40 + i * 90}
                x2={40 + i * 90}
                y1="45"
                y2="65"
                stroke="#626780"
              />
              <text
                x={40 + i * 90}
                y="90"
                textAnchor="middle"
                fill="#20243A"
                fontSize="18"
              >
                {(i - 4) / 4}
              </text>
            </g>
          ))}
          <circle cx={400 + (n / d) * 360} cy="55" r="10" fill="#5B5FEF" />
          <text
            x={400 + (n / d) * 360}
            y="25"
            textAnchor="middle"
            fill="#4548b8"
            fontSize="20"
          >
            {n}/{d}
          </text>
        </svg>
        <div className="slider-grid">
          <label className="field">
            {t("numerator")}: {n}
            <input
              type="range"
              min={-d}
              max={d}
              value={n}
              onChange={(e) => setN(+e.target.value)}
            />
          </label>
          <label className="field">
            {t("denominator")}: {d}
            <input
              type="range"
              min="1"
              max="12"
              value={d}
              onChange={(e) => {
                const x = +e.target.value;
                setD(x);
                setN(Math.max(-x, Math.min(x, n)));
              }}
            />
          </label>
        </div>
        <p className="text-muted">
          {n}/{d} = {(n / d).toFixed(3)}
        </p>
      </Card>
    </>
  );
}

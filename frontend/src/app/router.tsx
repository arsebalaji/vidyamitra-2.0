import LearningUniverse from "../pages/LearningUniverse";
import GameArena from "../pages/GameArena";
import BrainTraining from "../pages/BrainTraining";
import SmartRevision from "../pages/SmartRevision";
import VirtualScienceLab from "../pages/VirtualScienceLab";
import EquationBattle from "../games/mathematics/EquationBattle";
import NumberLineRace from "../games/mathematics/NumberLineRace";
import FindTheMistake from "../games/mathematics/FindTheMistake";
import { Route, Routes, useLocation, Link } from "react-router-dom";
import { useWords } from "./providers";
import PageTitle from "../components/layout/PageTitle";
import Dashboard from "../pages/Dashboard";
import Welcome from "../pages/Welcome";
import Languages from "../pages/LanguageSelect";
import Profiles from "../pages/ProfileSelect";
import Curriculum from "../pages/Subjects";
import Lessons from "../pages/Chapters";
import Reader from "../pages/Lesson";
import Tutor from "../pages/AITutor";
import Quiz from "../pages/Quiz";
import Visualizer from "../pages/VisualMath";
import Game from "../pages/Games";
import Progress from "../pages/Progress";
import Offline from "../pages/Downloads";
import Achievements from "../pages/Achievements";
import Preferences from "../pages/Settings";
import Onboarding from "../pages/Onboarding";
import StateSelect from "../pages/StateSelect";
import BoardSelect from "../pages/BoardSelect";
import ClassSelect from "../pages/ClassSelect";
import SubjectSelect from "../pages/SubjectSelect";
import CreateProfile from "../pages/CreateProfile";
import Privacy from "../pages/Privacy";
export default function AppRouter({ active }: { active: string }) {
  const location = useLocation(),
    t = useWords();
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/language" element={<Languages />} />
      <Route path="/profiles" element={<Profiles />} />
      <Route path="/curriculum" element={<Curriculum />} />
      <Route path="/lessons" element={<Lessons />} />
      <Route
        path="/lessons/:id"
        element={<Reader key={location.pathname + active} />}
      />
      <Route path="/tutor" element={<Tutor key={active} />} />
      <Route path="/voice" element={<Tutor initial="voice" key={active} />} />
      <Route path="/photo" element={<Tutor initial="photo" key={active} />} />
      <Route path="/quiz" element={<Quiz key={active} />} />
      <Route path="/visual" element={<Visualizer />} />
      <Route path="/games" element={<GameArena />} />
      <Route path="/games/fractions" element={<Game key={active} />} />
      <Route path="/games/equations" element={<EquationBattle />} />
      <Route path="/games/number-line" element={<NumberLineRace />} />
      <Route path="/games/find-mistake" element={<FindTheMistake />} />
      <Route path="/universe" element={<LearningUniverse />} />
      <Route path="/brain-training" element={<BrainTraining key={active} />} />
      <Route path="/revision" element={<SmartRevision />} />
      <Route path="/science-lab" element={<VirtualScienceLab />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/guardian" element={<Progress guardian />} />
      <Route path="/offline" element={<Offline />} />
      <Route path="/achievements" element={<Achievements />} />
      <Route path="/settings" element={<Preferences />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/states" element={<StateSelect />} />
      <Route path="/boards" element={<BoardSelect />} />
      <Route path="/classes" element={<ClassSelect />} />
      <Route path="/subjects" element={<SubjectSelect />} />
      <Route path="/profiles/new" element={<CreateProfile />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route
        path="*"
        element={
          <>
            <PageTitle title="404" />
            <Link className="button" to="/">
              {t("home")}
            </Link>
          </>
        }
      />
    </Routes>
  );
}

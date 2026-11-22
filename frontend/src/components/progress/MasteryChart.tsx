import type { Attempt } from "../../features/adaptive-learning/engine";
import { mastery } from "../../features/adaptive-learning/engine";
import ProgressBar from "../ui/ProgressBar";
export default function MasteryChart({ attempts }: { attempts: Attempt[] }) {
  return <ProgressBar value={mastery(attempts)} />;
}

import { learningStreak } from "../../features/progress";
export default function LearningStreak({
  timestamps,
}: {
  timestamps: number[];
}) {
  return <span>{learningStreak(timestamps)} · active days / అభ్యాస రోజులు</span>;
}

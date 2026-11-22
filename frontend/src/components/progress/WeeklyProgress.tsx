import { weeklyCounts } from "../../features/progress";
export default function WeeklyProgress({
  timestamps,
}: {
  timestamps: number[];
}) {
  return (
    <div>
      {weeklyCounts(timestamps).map((day) => (
        <div className="mastery-row" key={day.date}>
          <span>{day.date}</span>
          <strong>{day.count}</strong>
        </div>
      ))}
    </div>
  );
}

const dayKey = (time: number) => {
  const d = new Date(time);
  return [d.getFullYear(), d.getMonth() + 1, d.getDate()].join("-");
};
export function learningStreak(timestamps: number[], now = Date.now()) {
  const days = new Set(timestamps.map(dayKey));
  const day = new Date(now);
  let count = 0;
  if (!days.has(dayKey(+day))) day.setDate(day.getDate() - 1);
  while (days.has(dayKey(+day))) {
    count++;
    day.setDate(day.getDate() - 1);
  }
  return count;
}
export function weeklyCounts(timestamps: number[], now = Date.now()) {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - 6 + i);
    const date = dayKey(+d);
    return { date, count: timestamps.filter((t) => dayKey(t) === date).length };
  });
}

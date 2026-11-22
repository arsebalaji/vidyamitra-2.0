import { useEffect, useState } from "react";
export default function StorageUsage() {
  const [usage, setUsage] = useState<number | null>(null);
  useEffect(() => {
    navigator.storage
      ?.estimate()
      .then((s) => setUsage(s.usage ?? 0))
      .catch(() => {});
  }, []);
  return (
    <span>
      {usage === null
        ? "Storage estimate unavailable"
        : (usage / 1024 / 1024).toFixed(2) + " MB used on this origin"}
    </span>
  );
}

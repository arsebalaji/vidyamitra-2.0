import { useState } from "react";
import { setSetting } from "../../store/settingsStore";
export default function EasyLearningMode() {
  const [enabled, setEnabled] = useState(
    localStorage.getItem("large") === "true",
  );
  return (
    <label className="check-label">
      <input
        type="checkbox"
        checked={enabled}
        onChange={(e) => {
          setEnabled(e.target.checked);
          setSetting("large", e.target.checked);
          setSetting("motion", e.target.checked);
        }}
      />
      Easy reading · సులభంగా చదవండి
    </label>
  );
}

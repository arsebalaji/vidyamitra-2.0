import { useState } from "react";
import { setSetting } from "../../store/settingsStore";
import { useWords } from "../../app/providers";
export default function FontSizeControl() {
  const t = useWords(),
    [value, setValue] = useState(localStorage.getItem("large") === "true");
  return (
    <label className="check-label">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => {
          setValue(e.target.checked);
          setSetting("large", e.target.checked);
        }}
      />
      {t("large")}
    </label>
  );
}

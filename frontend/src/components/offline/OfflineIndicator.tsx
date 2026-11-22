import { useOnlineStatus } from "../../hooks/useOnlineStatus";
import { useWords } from "../../app/providers";
export default function OfflineIndicator() {
  const online = useOnlineStatus(),
    t = useWords();
  return (
    <span className={"connection " + (online ? "" : "off")} role="status">
      {t(online ? "network" : "disconnected")}
    </span>
  );
}

import type { ReactNode } from "react";
import MitraMascot from "./MitraMascot";
export default function MascotMessage({ children }: { children: ReactNode }) {
  return (
    <div className="mitra-message">
      <MitraMascot size={54} />
      <div>{children}</div>
    </div>
  );
}

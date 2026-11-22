import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";
export default function PageTitle({
  title,
  sub,
  children,
}: {
  title: string;
  sub?: string;
  children?: ReactNode;
}) {
  return (
    <div className="page-title">
      <div>
        <span className="eyebrow">
          <Sparkles size={13} /> VIDYAMITRA · LEARN WITH JOY
        </span>
        <h1>{title}</h1>
        {sub && <p>{sub}</p>}
      </div>
      {children}
    </div>
  );
}

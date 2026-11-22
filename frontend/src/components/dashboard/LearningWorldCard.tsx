import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
export default function LearningWorldCard({
  title,
  subtitle,
  icon,
  to,
  tone = "blue",
}: {
  title: string;
  subtitle: string;
  icon: string;
  to: string;
  tone?: string;
}) {
  return (
    <Link to={to} className={"world-card " + tone}>
      <span className="world-icon" aria-hidden="true">
        {icon}
      </span>
      <div>
        <strong>{title}</strong>
        <small>{subtitle}</small>
      </div>
      <ArrowUpRight size={18} />
    </Link>
  );
}

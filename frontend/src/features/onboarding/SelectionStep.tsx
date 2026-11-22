import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
export default function SelectionStep({
  title,
  value,
  next,
}: {
  title: string;
  value: string;
  next: string;
}) {
  return (
    <section className="card welcome">
      <h1>{title}</h1>
      <p>Available MVP curriculum · అందుబాటులో ఉన్న పాఠ్యప్రణాళిక</p>
      <div className="card selected">
        <CheckCircle2 />
        <h2>{value}</h2>
      </div>
      <Link className="button space-top" to={next}>
        Continue · కొనసాగించండి
      </Link>
    </section>
  );
}

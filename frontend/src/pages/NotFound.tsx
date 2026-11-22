import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <section className="card">
      <h1>404</h1>
      <Link className="button" to="/">
        Home · మొదలు
      </Link>
    </section>
  );
}

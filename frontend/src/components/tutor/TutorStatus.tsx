import { useWords } from "../../app/providers";
export default function TutorStatus({
  source,
}: {
  source: "offline" | "gemini";
}) {
  const t = useWords();
  return (
    <span className="badge">
      {source === "offline" ? t("local") : "Gemini · AI"}
    </span>
  );
}

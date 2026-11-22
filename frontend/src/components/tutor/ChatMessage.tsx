export default function ChatMessage({
  text,
  role,
}: {
  text: string;
  role: "user" | "assistant";
}) {
  return (
    <div className={role === "user" ? "user-message" : "answer-message"}>
      <p style={{ whiteSpace: "pre-wrap" }}>{text}</p>
    </div>
  );
}

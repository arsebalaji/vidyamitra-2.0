import { useApp } from "../../app/providers";
export default function SyncStatus() {
  const { lang } = useApp();
  return (
    <span>
      {lang === "te"
        ? "ఈ పరికరంలో మాత్రమే. క్లౌడ్ సమకాలీకరణ లేదు."
        : "Saved locally. Cloud sync is not enabled."}
    </span>
  );
}

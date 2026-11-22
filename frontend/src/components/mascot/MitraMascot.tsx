export default function MitraMascot({
  size = 100,
  mood = "happy",
}: {
  size?: number;
  mood?: "happy" | "thinking" | "celebrate" | "sad";
}) {
  return (
    <img
      src={"/mascots/mitra-" + mood + ".svg"}
      alt="Mitra"
      width={size}
      height={size}
    />
  );
}

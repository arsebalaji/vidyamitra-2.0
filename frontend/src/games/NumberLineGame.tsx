import PracticePuzzle from "./PracticePuzzle";
export default function NumberLineGame() {
  return (
    <PracticePuzzle
      title="Number line"
      prompt="Which number is halfway between 0 and 1?"
      answer="1/2"
      explanation="(0 + 1) ÷ 2 = 1/2"
    />
  );
}

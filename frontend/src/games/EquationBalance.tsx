import PracticePuzzle from "./PracticePuzzle";
export default function EquationBalance() {
  return (
    <PracticePuzzle
      title="Balance the equation"
      prompt="x + 3 = 8. Find x."
      answer="5"
      explanation="Subtract 3 from both sides: x = 8 − 3 = 5"
    />
  );
}

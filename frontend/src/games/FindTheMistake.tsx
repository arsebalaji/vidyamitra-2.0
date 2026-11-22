import PracticePuzzle from "./PracticePuzzle";
export default function FindTheMistake() {
  return (
    <PracticePuzzle
      title="Find the mistake"
      prompt="A learner says 1/3 + 1/3 = 2/6. Write the correct sum."
      answer="2/3"
      explanation="Keep the denominator: (1 + 1)/3 = 2/3"
    />
  );
}

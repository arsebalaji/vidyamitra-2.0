export default function EquationSteps({ a, b }: { a: number; b: number }) {
  return (
    <ol>
      <li>
        x + {a} = {b}
      </li>
      <li>
        x = {b} − {a}
      </li>
      <li>x = {b - a}</li>
    </ol>
  );
}

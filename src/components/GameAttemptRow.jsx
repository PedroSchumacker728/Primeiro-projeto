import GameLetterCell from "./GameLetterCell";
import { TAMANHO_PALAVRA } from "@/lib/game.mjs";
export default function GameAttemptRow({ values, result, letters }) {
  return <section className="attempt">
    {Array.from({ length: TAMANHO_PALAVRA }, (_, i) => <GameLetterCell key={i}
      letter={values[i]} result={result?.[i]} letters={letters} />)}
  </section>;
}

import { sinalDe } from "@/lib/libras.mjs";
export default function GameLetterCell({ letter, result, letters }) {
  const classes = ["letter", letter && "filled", result, result && "reveal", letters && letter && "modo-letras"]
    .filter(Boolean).join(" ");
  return <span className={classes} data-letter={letter || undefined}>
    {letter ? letters ? letter : <img src={sinalDe(letter)} alt={`Sinal da letra ${letter}`} /> : null}
  </span>;
}

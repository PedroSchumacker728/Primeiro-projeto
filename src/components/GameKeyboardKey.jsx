import { sinalDe } from "@/lib/libras.mjs";
export default function GameKeyboardKey({ letter, color, highlighted, disabled, onChoose }) {
  return <button type="button" data-letter={letter} aria-label={`Sinal da letra ${letter}`}
    className={[color, highlighted && "hinted"].filter(Boolean).join(" ")}
    disabled={disabled} onClick={() => onChoose(letter)}>
    <img src={sinalDe(letter)} alt="" aria-hidden="true" />
  </button>;
}

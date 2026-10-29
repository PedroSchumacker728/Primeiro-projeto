import { sinalDe } from "@/lib/libras.mjs";
export default function TutorialSign({ letter, step }) {
  return <figure className="sinal">
    {letter && <img key={step} className="sinal-troca" id="sinal" src={sinalDe(letter)}
      alt={`Sinal em Libras correspondente à letra ${letter}`} />}
  </figure>;
}

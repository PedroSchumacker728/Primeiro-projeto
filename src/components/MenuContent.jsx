import MenuLinks from "./MenuLinks";
import TeamTable from "./TeamTable";
export default function MenuContent() {
  return <main>
    <h1>GESTO</h1>
    <p className="subtitulo">Aprenda Libras de forma divertida</p>
    <p className="descricao">Assista ao sinal em Libras e descubra as palavras certas neste jogo interativo.</p>
    <MenuLinks />
    <hr className="linha" />
    <section className="integrantes"><h2>♧ Integrantes do grupo:</h2><TeamTable /></section>
  </main>;
}

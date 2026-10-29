import { INTEGRANTES } from "@/data/menu.mjs";
export default function TeamTable() {
  return <section className="quadro-integrantes" id="integrantes">
    <header className="linha-integrante cabecalho-integrantes">
      <span className="nome-integrante">Nome</span><span className="ra-integrante">RA</span>
    </header>
    {INTEGRANTES.map(({ nome, ra }, i) => <article key={ra} className="linha-integrante integrante-entrada"
      style={{ "--delay": `${180 + i * 70}ms` }}>
      <span className="nome-integrante">{nome}</span><span className="ra-integrante">{ra}</span>
    </article>)}
  </section>;
}

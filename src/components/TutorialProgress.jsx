export default function TutorialProgress({ tutorial }) {
  const { step, order, complete } = tutorial.state;
  const atual = order.length ? step + 1 : 0;
  const porcentagem = order.length ? (complete ? 100 : atual / order.length * 100) : 0;
  return <section className="progresso-area" aria-label="Progresso do tutorial">
    <span className="progresso-texto">Progresso do tutorial</span>
    <div className="barra-progresso">
      <div className="barra-preenchida" id="barra" style={{ width: `${porcentagem}%` }} />
    </div>
    <span className="progresso-contador" id="progresso">{atual} / {order.length || 26}</span>
  </section>;
}

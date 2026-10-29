export default function TutorialActions({ tutorial }) {
  const { state, hint, verify } = tutorial;
  return <section className="acoes">
    <button type="button" className="botao-acao botao-dica" id="dica"
      disabled={state.complete} onClick={hint}>💡 Dica</button>
    <button type="button" className="botao-acao botao-verificar" id="verificar"
      disabled={state.complete} onClick={verify}>✓ Verificar</button>
  </section>;
}

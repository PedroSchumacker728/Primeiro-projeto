import { MAX_TENTATIVAS } from "@/lib/game.mjs";
export default function GameStatus({ game }) {
  const { state, hint } = game;
  return <section className="status" aria-label="Informações da partida">
    <article><strong>Pontuação</strong><span id="pontuacao">{state.points}</span></article>
    <article><strong>Tentativas</strong><span id="contador">{state.row}/{MAX_TENTATIVAS}</span></article>
    <button type="button" className="status-hint" id="dica" aria-label="Usar uma dica"
      disabled={state.locked || state.hints <= 0} onClick={hint}>
      <strong>Dica</strong><span id="dicas">{state.hints}</span>
    </button>
  </section>;
}

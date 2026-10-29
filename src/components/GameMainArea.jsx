import GameAttemptRow from "./GameAttemptRow";
export default function GameMainArea({ game }) {
  const { state } = game;
  return <section className="game-top" aria-label="Área principal do jogo">
    <aside className="como-jogar">
      <h2>Como jogar</h2>
      <ol><li>Descubra a palavra usando os sinais.</li>
        <li>Monte sua tentativa usando os sinais abaixo.</li>
        <li>Após enviar, cada casa indica se o gesto está correto, em outra posição ou ausente.</li>
        <li>Você tem 6 tentativas para acertar a palavra.</li></ol>
      <p className="nota-teclado"><strong>Importante: </strong>
        use somente o teclado de sinais do próprio jogo. Não utilize o teclado do dispositivo.</p>
    </aside>
    <section className="board-area">
      <section className={`board ${state.won ? "board-success" : ""} ${state.round ? "round-enter" : ""}`}
        id="board" key={state.round} aria-label="Tabuleiro do jogo">
        <section className="attempts" id="attempts">
          {state.board.map((linha, i) => <GameAttemptRow key={i}
            values={i === state.row && !state.locked ? state.typed : linha.letras}
            result={linha.result} letters={state.letters} />)}
        </section>
      </section>
    </section>
    <span className="game-spacer" aria-hidden="true" />
  </section>;
}

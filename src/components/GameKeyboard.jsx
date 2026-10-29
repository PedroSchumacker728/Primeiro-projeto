import GameKeyboardKey from "./GameKeyboardKey";
import { MAX_TENTATIVAS } from "@/lib/game.mjs";
export default function GameKeyboard({ game }) {
  const { state, add, erase, send } = game;
  return <section className="keyboard-panel" id="keyboardPanel">
    <h2>Selecione os sinais (gestos) para formar sua tentativa</h2>
    <section className="keyboard" id="keyboard" aria-label="Sinais de Libras">
      {state.keyboard.map(letter => <GameKeyboardKey key={letter} letter={letter}
        color={state.colors[letter]} highlighted={state.hintLetter === letter}
        disabled={state.locked} onChoose={add} />)}
    </section>
    <section className="controls">
      <button type="button" className="btn-apagar" id="apagar" disabled={state.locked} onClick={erase}>Apagar</button>
      <span className="tentativas-restantes">Tentativas: <strong id="restantes">{MAX_TENTATIVAS - state.row}</strong></span>
      <button type="button" className="btn-enviar" id="enviar" disabled={state.locked} onClick={send}>Enviar</button>
    </section>
    <p id="mensagem" className={state.messageType ? `mensagem-${state.messageType}` : ""} aria-live="polite">
      {state.message}
    </p>
  </section>;
}

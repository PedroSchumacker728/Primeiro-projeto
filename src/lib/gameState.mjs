import { ABC } from "./libras.mjs";
import { MAX_DICAS, MAX_TENTATIVAS, TAMANHO_PALAVRA, avaliarTentativa, atualizarTeclas, criarTabuleiro } from "./game.mjs";

export const initialGame = {
  word: "", previous: "", row: 0, typed: [], points: 0,
  hints: MAX_DICAS, used: [], locked: false, letters: false,
  board: criarTabuleiro(), keyboard: ABC, colors: {},
  message: "", messageType: "", round: 0, won: false, hintLetter: null,
};

export function gameReducer(state, action) {
  switch (action.type) {
    case "NEW_ROUND":
      return { ...state, word: action.word, previous: action.word,
        row: 0, typed: [], hints: MAX_DICAS, used: [], locked: false,
        board: criarTabuleiro(), keyboard: action.keyboard, colors: {},
        message: "Nova palavra sorteada. Boa sorte!", messageType: "",
        round: state.round + 1, won: false, hintLetter: null };
    case "ADD":
      if (!state.word || state.locked || state.typed.length >= TAMANHO_PALAVRA || !ABC.includes(action.letter)) return state;
      return { ...state, typed: [...state.typed, action.letter], message: "", messageType: "" };
    case "ERASE":
      if (state.locked || !state.typed.length) return state;
      return { ...state, typed: state.typed.slice(0, -1) };
    case "SEND": {
      if (!state.word || state.locked) return state;
      if (state.typed.length < TAMANHO_PALAVRA) return {
        ...state, message: "Selecione 5 sinais antes de enviar.", messageType: "erro" };
      const guess = state.typed.join("");
      const resultado = avaliarTentativa(guess, state.word);
      const acertou = guess === state.word;
      const board = state.board.map((item, i) => i === state.row
        ? { letras: [...state.typed], resultado } : item);
      const proximaLinha = state.row + 1;
      const terminou = acertou || proximaLinha >= MAX_TENTATIVAS;
      return { ...state, board, colors: atualizarTeclas(state.colors, guess, resultado),
        typed: [], row: proximaLinha, locked: terminou, won: acertou,
        points: state.points + (acertou ? 100 : 0),
        message: acertou ? "Muito bem! Palavra correta! Sorteando a próxima..."
          : terminou ? `Fim das tentativas! A palavra era ${state.word}. Sorteando outra...`
          : "Continue tentando!", messageType: acertou ? "sucesso" : "" };
    }
    case "HINT":
      if (state.locked || state.hints <= 0 || !Number.isInteger(action.pos) ||
        action.pos < 0 || action.pos >= TAMANHO_PALAVRA || state.used.includes(action.pos)) return state;
      return { ...state, hints: state.hints - 1, used: [...state.used, action.pos],
        hintLetter: state.word[action.pos],
        message: `Dica: o sinal correspondente à posição ${action.pos + 1} foi destacado no teclado.`,
        messageType: "dica" };
    case "CLEAR_HINT": return { ...state, hintLetter: null };
    case "TOGGLE": return { ...state, letters: action.checked };
    case "BLOCK_PHYSICAL_KEY":
      if (state.locked) return state;
      return { ...state, message: "Use o teclado de sinais do próprio jogo.", messageType: "erro" };
    default: return state;
  }
}


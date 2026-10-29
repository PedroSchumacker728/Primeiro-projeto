export const initialTutorial = {
  order: [], step: 0, upper: true, moving: false, complete: false,
  answer: "", message: "", answerStatus: "", effect: "",
};
export function tutorialReducer(state, action) {
  switch (action.type) {
    case "INIT": return { ...initialTutorial, order: action.order };
    case "FILL":
      if (state.moving || state.complete || !state.order.length) return state;
      return { ...state, answer: state.upper ? action.letter.toUpperCase() : action.letter.toLowerCase(),
        answerStatus: "", message: "", effect: "" };
    case "ERASE":
      if (state.moving || state.complete) return state;
      return { ...state, answer: "", answerStatus: "", effect: "" };
    case "SHIFT": return { ...state, upper: !state.upper,
      message: state.upper ? "Modo minúsculo ativado." : "Modo maiúsculo ativado.", effect: "" };
    case "HINT":
      if (state.moving || state.complete || !state.order.length) return state;
      return { ...state, message: `Dica: a resposta é a letra ${state.order[state.step]}.` };
    case "VERIFY":
      if (state.moving || state.complete || !state.order.length) return state;
      if (!state.answer) return { ...state, message: "Selecione uma letra antes de verificar.",
        answerStatus: "resposta-erro", effect: "tutorial-erro" };
      if (state.answer.toUpperCase() !== state.order[state.step]) return { ...state,
        message: "Resposta incorreta. Tente novamente.", answerStatus: "resposta-erro", effect: "tutorial-erro" };
      return { ...state, answerStatus: "resposta-certa", message: "Muito bem! Próximo sinal...",
        moving: true, effect: "tutorial-acerto" };
    case "ADVANCE": return { ...state, step: state.step + 1, answer: "", message: "",
      answerStatus: "", moving: false, effect: "" };
    case "FINISH": return { ...state, complete: true, moving: false,
      message: "Parabéns! Você concluiu as 26 etapas do tutorial.", effect: "tutorial-concluido" };
    default: return state;
  }
}

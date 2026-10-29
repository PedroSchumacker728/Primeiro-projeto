import TutorialSign from "./TutorialSign";
import TutorialAnswer from "./TutorialAnswer";
import TutorialKeyboard from "./TutorialKeyboard";
import TutorialActions from "./TutorialActions";
export default function TutorialContent({ tutorial }) {
  const { state } = tutorial;
  return <section className="conteudo-tutorial">
    <header className="titulo"><h1>Tutorial</h1><p>Observe o sinal e digite a resposta.</p></header>
    <TutorialSign letter={state.order[state.step]} step={state.step} />
    <form className="form-tutorial" id="formTutorial" autoComplete="off" onSubmit={e => e.preventDefault()}>
      <TutorialAnswer answer={state.answer} status={state.answerStatus} />
      <TutorialKeyboard tutorial={tutorial} />
      <TutorialActions tutorial={tutorial} />
    </form>
    <p id="mensagemTutorial" className="mensagem" aria-live="polite">{state.message}</p>
  </section>;
}

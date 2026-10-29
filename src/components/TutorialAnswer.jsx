export default function TutorialAnswer({ answer, status }) {
  return <fieldset className="resposta">
    <legend className="sr-only">Resposta do tutorial</legend>
    <input id="resposta" type="text" maxLength={1} readOnly
      className={status} value={answer} aria-label="Digite a letra correspondente" />
  </fieldset>;
}

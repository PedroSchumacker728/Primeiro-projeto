const LINHAS = ["QWERTYUIOP", "ASDFGHJKLÇ", "ZXCVBNM"];
export default function TutorialKeyboard({ tutorial }) {
  const { fill, erase, shift, state } = tutorial;
  return <nav className="teclado" id="teclado" aria-label="Teclado de letras">
    {LINHAS.map((linha, i) => <section key={i} className="linha-teclado">
      {i === 2 && <button type="button" className="tecla-especial" data-action="shift"
        aria-label="Maiúsculas" disabled={state.complete} onClick={shift}>⇧</button>}
      {[...linha].map(letra => <button key={letra} type="button" data-key={letra}
        disabled={state.complete} onClick={() => fill(letra)}>{letra}</button>)}
      {i === 2 && <button type="button" className="tecla-especial" data-action="erase"
        aria-label="Apagar resposta" disabled={state.complete} onClick={erase}>⌫</button>}
    </section>)}
  </nav>;
}

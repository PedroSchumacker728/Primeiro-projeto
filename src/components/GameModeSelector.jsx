export default function GameModeSelector({ letters, onToggle }) {
  return <label className="seletor-modo">
    <span className={`modo-label ${!letters ? "ativo" : ""}`} id="labelSinais">Caixas com sinais</span>
    <input id="modoVisual" type="checkbox" aria-label="Alternar visual das caixas entre sinais e letras normais"
      checked={letters} onChange={e => onToggle(e.target.checked)} />
    <span className="checkbox-visual" />
    <span className={`modo-label ${letters ? "ativo" : ""}`} id="labelLetras">Caixas com letras</span>
  </label>;
}

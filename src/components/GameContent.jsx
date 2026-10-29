import GameStatus from "./GameStatus";
import GameKeyboard from "./GameKeyboard";
import GameMainArea from "./GameMainArea";
import GameTitle from "./GameTitle";
import GameModeSelector from "./GameModeSelector";
export default function GameContent({ game }) {
  return <main>
    <GameModeSelector letters={game.state.letters} onToggle={game.toggle} />
    <GameTitle />
    <GameMainArea game={game} />
    <GameKeyboard game={game} />
    <GameStatus game={game} />
    <footer>As casas mudam de cor durante o jogo para indicar o progresso, como no Termo.</footer>
  </main>;
}

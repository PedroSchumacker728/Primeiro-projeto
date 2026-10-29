"use client";
import GameHeader from "@/components/GameHeader";
import GameContent from "@/components/GameContent";
import useGame from "@/hooks/useGame";
import "./Jogar.css";
export default function Page() {
  const game = useGame();
  return <article className="container" id="gameContainer">
    <GameHeader /><GameContent game={game} />
  </article>;
}

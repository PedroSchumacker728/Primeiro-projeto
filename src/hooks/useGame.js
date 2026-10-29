"use client";
import { useCallback, useEffect, useReducer, useRef } from "react";
import { novoTeclado, posicaoDaDica, sortearPalavra } from "@/lib/game.mjs";
import { gameReducer, initialGame } from "@/lib/gameState.mjs";

export default function useGame() {
  const [state, dispatch] = useReducer(gameReducer, initialGame);
  const started = useRef(false);
  const begin = useCallback(anterior => dispatch({
    type: "NEW_ROUND", word: sortearPalavra(anterior), keyboard: novoTeclado(),
  }), []);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    begin("");
  }, [begin]);
  useEffect(() => {
    if (!state.locked) return;
    const timer = setTimeout(() => begin(state.word), 1350);
    return () => clearTimeout(timer);
  }, [state.locked, state.word, begin]);
  useEffect(() => {
    if (!state.hintLetter) return;
    const timer = setTimeout(() => dispatch({ type: "CLEAR_HINT" }), 1700);
    return () => clearTimeout(timer);
  }, [state.hintLetter, state.used.length]);
  useEffect(() => {
    function block(e) {
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      if (/^[A-Za-z]$/.test(e.key) || ["Enter", "Backspace"].includes(e.key)) {
        e.preventDefault();
        dispatch({ type: "BLOCK_PHYSICAL_KEY" });
      }
    }
    document.addEventListener("keydown", block);
    return () => document.removeEventListener("keydown", block);
  }, []);
  const add = letra => dispatch({ type: "ADD", letter: letra });
  const erase = () => dispatch({ type: "ERASE" });
  const send = () => dispatch({ type: "SEND" });
  const hint = () => dispatch({ type: "HINT", pos: posicaoDaDica(state.word, state.used) });
  const toggle = checked => dispatch({ type: "TOGGLE", checked });
  return { state, add, erase, send, hint, toggle };
}

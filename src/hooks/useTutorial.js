"use client";
import { useEffect, useReducer, useRef } from "react";
import { ABC, embaralhar } from "@/lib/libras.mjs";
import { initialTutorial, tutorialReducer } from "@/lib/tutorialState.mjs";

export default function useTutorial() {
  const [state, dispatch] = useReducer(tutorialReducer, initialTutorial);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    dispatch({ type: "INIT", order: embaralhar(ABC) });
  }, []);
  useEffect(() => {
    if (!state.moving) return;
    const last = state.step === state.order.length - 1;
    const timer = setTimeout(() => dispatch({ type: last ? "FINISH" : "ADVANCE" }), last ? 450 : 600);
    return () => clearTimeout(timer);
  }, [state.moving, state.step, state.order.length]);
  useEffect(() => {
    function onKey(e) {
      if (state.complete || state.moving || e.ctrlKey || e.altKey || e.metaKey) return;
      const letra = e.key.toUpperCase();
      if (/^[A-Z]$/.test(letra)) dispatch({ type: "FILL", letter: letra });
      else if (e.key === "Backspace") dispatch({ type: "ERASE" });
      else if (e.key === "Enter") { e.preventDefault(); dispatch({ type: "VERIFY" }); }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [state.complete, state.moving]);
  return { state,
    fill: letter => dispatch({ type: "FILL", letter }),
    erase: () => dispatch({ type: "ERASE" }),
    shift: () => dispatch({ type: "SHIFT" }),
    hint: () => dispatch({ type: "HINT" }),
    verify: () => dispatch({ type: "VERIFY" }),
  };
}

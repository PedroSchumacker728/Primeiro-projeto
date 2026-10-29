import { ABC, embaralhar } from "./libras.mjs";
export const PALAVRAS = ["GESTO", "LIBRA", "SINAL", "AMIGO", "ALUNO", "FALAR", "LIVRO", "VIDEO", "TEXTO", "APOIO", "LUGAR", "AULAS"];
export const MAX_TENTATIVAS = 6;
export const TAMANHO_PALAVRA = 5;
export const MAX_DICAS = 3;

export function sortearPalavra(anterior = "", random = Math.random) {
  const candidatas = PALAVRAS.length > 1 ? PALAVRAS.filter(p => p !== anterior) : PALAVRAS;
  return candidatas[Math.floor(random() * candidatas.length)];
}
export function novoTeclado(random = Math.random) { return embaralhar(ABC, random); }

// Duas passagens para tratar letras repetidas sem contabilizar mais de uma vez.
export function avaliarTentativa(tentativa, palavra) {
  if (tentativa.length !== TAMANHO_PALAVRA || palavra.length !== TAMANHO_PALAVRA)
    throw new Error("Tentativa e palavra precisam de 5 letras.");
  const saida = Array(TAMANHO_PALAVRA).fill("wrong");
  const restantes = [...palavra];
  [...tentativa].forEach((letra, i) => {
    if (letra === palavra[i]) { saida[i] = "correct"; restantes[i] = null; }
  });
  [...tentativa].forEach((letra, i) => {
    if (saida[i] === "correct") return;
    const posicao = restantes.indexOf(letra);
    if (posicao !== -1) { saida[i] = "present"; restantes[posicao] = null; }
  });
  return saida;
}
const prioridade = { wrong: 1, present: 2, correct: 3 };
export function atualizarTeclas(anteriores, tentativa, resultado) {
  const proximas = { ...anteriores };
  [...tentativa].forEach((letra, i) => {
    const cor = resultado[i];
    if ((prioridade[cor] ?? 0) > (prioridade[proximas[letra]] ?? 0)) proximas[letra] = cor;
  });
  return proximas;
}
export function criarTabuleiro() {
  return Array.from({ length: MAX_TENTATIVAS }, () => ({ letras: [], resultado: null }));
}
export function posicaoDaDica(palavra, usadas, random = Math.random) {
  const disponiveis = [...palavra].map((_, i) => i).filter(i => !usadas.includes(i));
  if (!disponiveis.length) return null;
  return disponiveis[Math.floor(random() * disponiveis.length)];
}

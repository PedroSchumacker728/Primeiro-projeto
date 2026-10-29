export const ABC = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
export const sinalDe = letra =>
  `/sinais/sinal_${String(letra.toUpperCase().charCodeAt(0) - 64).padStart(2, "0")}.png`;
export function embaralhar(itens, random = Math.random) {
  const arr = [...itens];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

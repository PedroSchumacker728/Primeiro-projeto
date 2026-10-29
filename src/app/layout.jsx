import "./globals.css";

export const metadata = {
  title: "GESTO — Aprenda Libras",
  description: "Jogo educativo para aprender Libras de forma divertida.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

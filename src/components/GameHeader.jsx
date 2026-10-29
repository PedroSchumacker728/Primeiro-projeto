import Link from "next/link";
export default function GameHeader() {
  return (
    <header className="topo">
      <Link className="atalho-menu" href="/" aria-label="Voltar ao menu">
        GESTO
      </Link>
      <p>
        Aprenda Libras jogando
      </p>
    </header>
  );
}

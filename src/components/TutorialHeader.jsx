import Link from "next/link";
export default function TutorialHeader() {
  return (
    <header className="topo">
      <Link className="atalho-menu" href="/" aria-label="Voltar ao menu">
        GESTO
      </Link>
    </header>
  );
}

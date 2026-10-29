import Link from "next/link";
import { MENU_LINKS } from "@/data/menu.mjs";
export default function MenuLinks() {
  return <nav id="menu">
    {MENU_LINKS.map(({ href, icon, label }, i) =>
      <Link className="menu-entrada" href={href} key={href} style={{ "--delay": `${i * 90}ms` }}>
        <span className="icone" aria-hidden="true">{icon}</span><span>{label}</span>
      </Link>)}
  </nav>;
}

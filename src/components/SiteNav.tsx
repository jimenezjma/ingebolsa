"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { whatsappUrl } from "@/lib/site";
import s from "./SiteNav.module.css";

export function SiteNav({ quoteMessage = "Hola IngeBolsa, quiero cotizar maquinaria." }: { quoteMessage?: string }) {
  const pathname = usePathname();
  return <div className={s.bar}>
    <Link href="/" aria-label="IngeBolsa, inicio" className={s.mark}>
      <Image src="/logo-ingebolsa.png" alt="IngeBolsa" width={579} height={579} priority className={s.logo} />
    </Link>
    <nav className={s.menu} aria-label="Navegación principal">
      {[{ href: "/", label: "Inicio" }, { href: "/movimiento-de-tierras", label: "Movimiento de tierras" }, { href: "/mineria", label: "Minería" }].map(({ href, label }) =>
        <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>{label}</Link>
      )}
    </nav>
    <a className={`button ${s.quote}`} href={whatsappUrl(quoteMessage)} target="_blank" rel="noopener">Cotizar por WhatsApp</a>
  </div>;
}

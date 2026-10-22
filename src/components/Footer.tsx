import Image from "next/image";
import { credits } from "@/lib/credits";
import { site, whatsappUrl } from "@/lib/site";
import s from "./Footer.module.css";

const menu = [
  { href: "/", label: "Inicio" },
  { href: "/movimiento-de-tierras", label: "Movimiento de tierras" },
  { href: "/mineria", label: "Minería" },
  { href: "/#como-comprar", label: "Cómo se compra" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/#pedir", label: "Contacto" },
];

/** `onlyVideo`: en páginas sin las fotos de la portada, acredita solo el video del pie. */
export function Footer({ onlyVideo = false }: { onlyVideo?: boolean }) {
  const list = onlyVideo ? credits.filter((c) => c.title.includes("(video)")) : credits;
  return (
    <footer className={`${s.footer} on-dark`}>
      <figure className={s.photo}>
        <video
          src="/video/excavadora.webm" poster="/video/excavadora-poster.jpg"
          autoPlay muted loop playsInline preload="metadata"
          aria-label="Excavadora cargando tierra en una volqueta"
        />
      </figure>

      <div className={s.side}>
        <Image src="/logo-ingebolsa-negativo.png" alt="IngeBolsa" width={579} height={579} className={s.logo} />
        <nav aria-label="Secciones">
          <ul className={s.menu}>
            {menu.map((m) => (
              <li key={m.href}><a href={m.href}>{m.label}</a></li>
            ))}
          </ul>
        </nav>

        <div className={s.blocks}>
          <div>
            <p className={s.label}>Ventas</p>
            <p><a className="link nums" style={{ whiteSpace: "nowrap" }} href={`tel:${site.phoneE164}`}>{site.phoneDisplay}</a></p>
            <p><a className="link" href={whatsappUrl("Hola IngeBolsa, quiero cotizar maquinaria.")} target="_blank" rel="noopener">WhatsApp</a></p>
          </div>
          <div>
            <p className={s.label}>Dónde</p>
            <p>{site.city}, Colombia. Entregas en todo el país.</p>
          </div>
        </div>

        <p className={s.legal}>
          © {new Date().getFullYear()} IngeBolsa. Las marcas de los equipos pertenecen a sus fabricantes. {onlyVideo ? "Video" : "Fotografías"}:{" "}
          {list.map((c, i) => (
            <span key={c.url}>
              <a href={c.url} target="_blank" rel="noopener">{c.title}</a>, {c.by}, {c.licence}
              {i < list.length - 1 ? "; " : "."}
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}

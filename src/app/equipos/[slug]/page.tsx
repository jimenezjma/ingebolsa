import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { formatCop, formatKg, getMachine, statusLabel } from "@/lib/catalog";
import { whatsappUrl } from "@/lib/site";
import s from "./ficha.module.css";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const m = await getMachine((await params).slug);
  if (!m) return {};
  return { title: `${m.name} ${m.brand} ${m.model} · IngeBolsa`, description: m.summary };
}

export default async function MachinePage({ params }: Props) {
  const m = await getMachine((await params).slug);
  if (!m) notFound();

  const groups = Object.entries(
    m.specs.reduce<Record<string, typeof m.specs>>((acc, sp) => ((acc[sp.group] ??= []).push(sp), acc), {}),
  );
  const quoteMessage = `Hola IngeBolsa, quiero cotizar: ${m.name} ${m.brand} ${m.model}${m.year ? ` (${m.year})` : ""}.`;
  const wa = whatsappUrl(quoteMessage);

  return (
    <>
      <header className={s.head}>
        <SiteNav quoteMessage={quoteMessage} />
        <Link className={`${s.back} link`} href="/movimiento-de-tierras#inventario">Volver al inventario</Link>
        <h1 className={`${s.title} poster lines`}>
          <span className="line"><span data-line>{m.name}</span></span>
        </h1>
        <p className={s.model} data-rise>{m.brand} {m.model}{m.year ? `, ${m.year}` : ""}. {m.category.name}.</p>
      </header>

      <main className={s.main}>
        <section className={s.facts} aria-label="Resumen">
          <p className={s.summary} data-reveal>{m.summary}</p>
          <dl className={s.key}>
            <div data-reveal style={{ "--i": 1 } as React.CSSProperties}><dt>Peso operativo</dt><dd className="nums">{formatKg(m.operatingWeightKg)}</dd></div>
            <div data-reveal style={{ "--i": 2 } as React.CSSProperties}><dt>Potencia</dt><dd className="nums">{m.powerHp ? `${m.powerHp} HP` : "—"}</dd></div>
            <div data-reveal style={{ "--i": 3 } as React.CSSProperties}><dt>Estado</dt><dd>{m.condition === "NUEVA" ? "Nueva" : `Usada${m.hours ? `, ${m.hours.toLocaleString("es-CO")} h` : ""}`}</dd></div>
            <div data-reveal style={{ "--i": 4 } as React.CSSProperties}><dt>Disponibilidad</dt><dd>{statusLabel[m.status] ?? m.status}</dd></div>
            <div data-reveal style={{ "--i": 5 } as React.CSSProperties}><dt>Precio</dt><dd className="nums">{formatCop(m.priceCop)}</dd></div>
            <div data-reveal style={{ "--i": 6 } as React.CSSProperties}><dt>Ubicación</dt><dd>{m.city}</dd></div>
          </dl>
        </section>

        {m.images.length > 0 ? (
          <section className={s.gallery} aria-label="Fotos del equipo">
            {m.images.map((img, i) => (
              <Image key={img.url} src={img.url} alt={img.alt} width={1600} height={1200} data-reveal
                sizes={i === 0 ? "100vw" : "50vw"} className={i === 0 ? s.galleryMain : undefined} />
            ))}
          </section>
        ) : null}

        <section className={s.plate} aria-labelledby="ficha-title">
          <h2 id="ficha-title" className="head">Ficha técnica</h2>
          {groups.map(([group, rows], gi) => (
            <table key={group} className={s.table} data-reveal style={{ "--i": gi } as React.CSSProperties}>
              <caption>{group}</caption>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.label}>
                    <th scope="row">{r.label}</th>
                    <td className="nums">{r.value}{r.unit ? ` ${r.unit}` : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
          <p className={s.note}>Datos del fabricante. Confírmelos con nosotros antes de comprar.</p>
        </section>

        <section className={s.cta}>
          <p className={s.ctaLine}>¿Le sirve esta máquina?</p>
          <div className={s.ctaActions}>
            <a className="button button--yellow" href={wa} target="_blank" rel="noopener">Cotizar por WhatsApp</a>
            <Link className="link" href="/movimiento-de-tierras#pedir">Usar el formulario</Link>
          </div>
        </section>
      </main>
      <Footer onlyVideo />
    </>
  );
}

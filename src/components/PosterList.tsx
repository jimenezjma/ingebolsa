import Image from "next/image";
import s from "./PosterList.module.css";

type Cat = { slug: string; name: string; shortName: string | null; summary: string | null; _count: { machines: number } };

export function PosterList({ categories }: { categories: Cat[] }) {
  return (
    <section className={s.section} aria-labelledby="equipos-title">
      <h2 id="equipos-title" className="sr-only">Equipos</h2>
      <ul className={s.list} id="equipos">
        {categories.map((c, i) => (
          <li key={c.slug} data-reveal style={{ "--i": i } as React.CSSProperties}>
            <a className={s.item} href="#inventario" data-filter={c.slug} title={c.summary ?? undefined}>
              <span className={`${s.word} poster`}>{c.shortName ?? c.name}</span>
              <span className={`${s.detail} nums`}>
                {c._count.machines} {c._count.machines === 1 ? "equipo" : "equipos"}
              </span>
            </a>
          </li>
        ))}
      </ul>

      {/* La señal preventiva del logo como marco de la foto */}
      <figure className={s.sign} data-reveal>
        <Image
          src="/img/obra-metro-calle-72.jpg"
          alt="Cerramiento de obra con cinta de peligro en la calle 72 de Bogotá"
          width={1200} height={1600} sizes="(min-width: 768px) 30vw, 60vw"
        />
      </figure>
    </section>
  );
}

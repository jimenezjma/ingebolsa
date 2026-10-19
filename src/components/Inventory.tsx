"use client";
import { useEffect, useMemo, useState } from "react";
import type { MachineSummary } from "@/lib/catalog";
import { formatKg, statusLabel } from "@/lib/catalog";
import { pickMachine } from "./events";
import s from "./Inventory.module.css";

type Cat = { slug: string; name: string };

export function Inventory({ machines, categories }: { machines: MachineSummary[]; categories: Cat[] }) {
  const [cat, setCat] = useState<string>("todas");

  // Los renglones de la vitrina (a[data-filter]) filtran esta tabla.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLElement>("[data-filter]");
      if (a?.dataset.filter) setCat(a.dataset.filter);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const rows = useMemo(
    () => (cat === "todas" ? machines : machines.filter((m) => m.category.slug === cat)),
    [cat, machines],
  );

  return (
    <section className={s.section} id="inventario" aria-labelledby="inv-title">
      <div className={s.intro}>
        <h2 id="inv-title" className="head" data-reveal>Inventario de hoy</h2>
        <p data-reveal style={{ "--i": 1 } as React.CSSProperties}>
          Cada equipo tiene su ficha técnica. Si no ve el que necesita, lo buscamos: muchas máquinas llegan bajo pedido.
        </p>
      </div>

      <div className={s.filters} role="group" aria-label="Filtrar por tipo" data-reveal style={{ "--i": 2 } as React.CSSProperties}>
        {[{ slug: "todas", name: "Todos" }, ...categories].map((c) => (
          <button key={c.slug} type="button" className={s.chip} aria-pressed={cat === c.slug} onClick={() => setCat(c.slug)}>
            {c.name}
          </button>
        ))}
      </div>

      <div className={s.scroller} data-reveal style={{ "--i": 3 } as React.CSSProperties}>
        <table className={s.table}>
          <thead>
            <tr>
              <th scope="col">Equipo</th>
              <th scope="col">Año</th>
              <th scope="col">Estado</th>
              <th scope="col" className={s.num}>Peso</th>
              <th scope="col" className={s.num}>Potencia</th>
              <th scope="col">Disponibilidad</th>
              <th scope="col"><span className="sr-only">Acciones</span></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((m) => (
              <tr key={m.id}>
                <th scope="row">
                  <a href={`/equipos/${m.slug}`} className={s.name}>{m.name}</a>
                  <span className={s.model}>{m.brand} {m.model}</span>
                </th>
                <td className="nums" data-label="Año">{m.year ?? "—"}</td>
                <td data-label="Estado">
                  {m.condition === "NUEVA" ? "Nueva" : "Usada"}
                  {m.hours ? <span className={`${s.model} nums`}>{m.hours.toLocaleString("es-CO")} h</span> : null}
                </td>
                <td className={`${s.num} nums`} data-label="Peso">{formatKg(m.operatingWeightKg)}</td>
                <td className={`${s.num} nums`} data-label="Potencia">{m.powerHp ? `${m.powerHp} HP` : "—"}</td>
                <td data-label="Disponibilidad">
                  <span className={m.status === "DISPONIBLE" ? s.ok : s.wait}>{statusLabel[m.status] ?? m.status}</span>
                </td>
                <td className={s.actions}>
                  <a href={`/equipos/${m.slug}`} className="link">Ficha</a>
                  <a href="#pedir" className={s.quote} onClick={() => pickMachine(m.slug)}>Cotizar</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

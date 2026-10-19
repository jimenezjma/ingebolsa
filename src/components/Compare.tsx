"use client";
import { useState } from "react";
import type { MachineSummary } from "@/lib/catalog";
import s from "./Compare.module.css";

type Metric = "peso" | "potencia";

function figure(m: MachineSummary | undefined, metric: Metric) {
  if (!m) return { n: "—", u: "" };
  if (metric === "potencia") return { n: m.powerHp ? String(m.powerHp) : "—", u: "HP" };
  const kg = m.operatingWeightKg ?? 0;
  return kg >= 1000
    ? { n: (kg / 1000).toLocaleString("es-CO", { maximumFractionDigits: 1 }), u: "t" }
    : { n: String(kg), u: "kg" };
}

export function Compare({ machines }: { machines: MachineSummary[] }) {
  const [a, setA] = useState(machines[0]?.slug ?? "");
  const [b, setB] = useState(machines[1]?.slug ?? "");
  const [metric, setMetric] = useState<Metric>("peso");
  const ma = machines.find((m) => m.slug === a);
  const mb = machines.find((m) => m.slug === b);

  const Pick = ({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) => (
    <label className={s.pick}>
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {machines.map((m) => (
          <option key={m.slug} value={m.slug}>{m.name} · {m.brand} {m.model}</option>
        ))}
      </select>
    </label>
  );

  return (
    <section className={s.section} id="comparar" aria-labelledby="cmp-title">
      <div className={s.top}>
        <h2 id="cmp-title" className={s.title} data-reveal>Compare antes de pedir</h2>
        <div className={s.side} data-reveal style={{ "--i": 1 } as React.CSSProperties}>
          <p>
            Elija dos equipos del inventario y vea la diferencia en grande. El peso define la cama baja que necesita
            para moverla; la potencia, cuánto rinde en su obra.
          </p>
          <div className={s.toggle} role="group" aria-label="Cifra a comparar">
            <button type="button" aria-pressed={metric === "peso"} onClick={() => setMetric("peso")}>Peso operativo</button>
            <button type="button" aria-pressed={metric === "potencia"} onClick={() => setMetric("potencia")}>Potencia</button>
          </div>
        </div>
      </div>

      <div className={s.specimens}>
        {[{ m: ma, v: a, set: setA, label: "Primer equipo" }, { m: mb, v: b, set: setB, label: "Segundo equipo" }].map(
          ({ m, v, set, label }, i) => {
            const f = figure(m, metric);
            return (
              <div key={i} className={s.specimen} data-reveal style={{ "--i": i + 2 } as React.CSSProperties}>
                <Pick value={v} onChange={set} label={label} />
                <output className={`${s.figure} nums`} aria-live="polite" key={`${v}-${metric}`}>
                  {f.n}<span className={s.unit}>{f.u}</span>
                </output>
              </div>
            );
          },
        )}
      </div>
    </section>
  );
}

import Link from "next/link";
import s from "./Lines.module.css";
export function BusinessLines() {
  return <section aria-label="Nuestras líneas de maquinaria" className={s.lines}>
    <Link href="/movimiento-de-tierras" className={s.earth}>
      <h2 className={`${s.lineTitle} poster`} data-reveal>Movimiento<br />de tierras</h2>
      <p data-reveal>Excavadoras, retros, minicargadores, rodillos y plantas eléctricas. Explore el inventario y compare equipos.</p>
      <span className={s.lineAction} data-reveal>Ver equipos <span aria-hidden="true">↗</span></span>
    </Link>
    <Link href="/mineria" className={`${s.mining} on-dark`}>
      <h2 className={`${s.lineTitle} poster`} data-reveal>Minería</h2>
      <p data-reveal>Trituración, transporte, clasificación y lavado de material. Encuentre la familia de equipos que necesita.</p>
      <span className={s.lineAction} data-reveal>Explorar minería <span aria-hidden="true">↗</span></span>
    </Link>
  </section>;
}

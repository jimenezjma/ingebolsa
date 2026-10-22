import Link from "next/link";
import s from "./Lines.module.css";
export function LegacyCatalogLinks() {
  return <div>{[
    { id: "equipos", label: "Ver categorías de movimiento de tierras" },
    { id: "inventario", label: "Ver inventario de movimiento de tierras" },
    { id: "comparar", label: "Comparar equipos de movimiento de tierras" },
  ].map(({ id, label }) => <div key={id} id={id} className={s.legacy}><p>El catálogo de movimiento de tierras tiene su propia página.</p><Link className="link" href={`/movimiento-de-tierras#${id}`}>{label}</Link></div>)}</div>;
}

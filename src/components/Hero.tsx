import { SiteNav } from "./SiteNav";
import { site } from "@/lib/site";
import s from "./Hero.module.css";

// Dos copias del titular, cada una recortada a su campo: amarillo arriba, negro abajo.
// La costura cae a mitad de la segunda línea, como el borde de la señal de obra.
function Headline({ hidden }: { hidden?: boolean }) {
  return (
    <p className={`${s.headline} poster lines`} aria-hidden={hidden || undefined}>
      <span className="line"><span data-line style={{ "--i": 0 } as React.CSSProperties}>Máquinas</span></span>
      <span className="line"><span data-line style={{ "--i": 1 } as React.CSSProperties}>a la obra</span></span>
    </p>
  );
}

export function Hero() {
  return (
    <header className={s.hero}>
      <SiteNav />

      <h1 className="sr-only">IngeBolsa: maquinaria para movimiento de tierras y minería</h1>
      <div className={s.top}><div className={s.frame}><Headline /></div></div>
      <div className={s.bottom} aria-hidden="true"><div className={s.frame}><Headline hidden /></div></div>

      <p className={s.support} data-rise>
        Maquinaria para movimiento de tierras y minería. Explore nuestras dos líneas y encuentre el equipo para su proyecto.
        Llame o escriba al <a className="link nums" style={{ whiteSpace: "nowrap" }} href={`tel:${site.phoneE164}`}>{site.phoneDisplay}</a>.
      </p>
    </header>
  );
}

import Image from "next/image";
import { site, whatsappUrl } from "@/lib/site";
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
      <div className={s.bar}>
        <a href="#top" className={s.mark} aria-label="IngeBolsa, inicio">
          <Image src="/logo-ingebolsa.png" alt="IngeBolsa" width={579} height={579} priority className={s.logo} />
        </a>
        <a className="button" href={whatsappUrl("Hola IngeBolsa, quiero cotizar maquinaria.")} target="_blank" rel="noopener">
          Cotizar por WhatsApp
        </a>
      </div>

      <h1 className="sr-only">IngeBolsa: máquinas a la obra</h1>
      <div className={s.top}><div className={s.frame}><Headline /></div></div>
      <div className={s.bottom} aria-hidden="true"><div className={s.frame}><Headline hidden /></div></div>

      <p className={s.support} data-rise>
        Excavadoras, retros, minicargadores, rodillos y plantas eléctricas, nuevas y usadas, con ficha técnica completa.
        Llame o escriba al <a className="link nums" style={{ whiteSpace: "nowrap" }} href={`tel:${site.phoneE164}`}>{site.phoneDisplay}</a>.
      </p>
    </header>
  );
}

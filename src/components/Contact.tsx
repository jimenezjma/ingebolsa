import Image from "next/image";
import { site, whatsappUrl } from "@/lib/site";
import { RequestForm } from "./RequestForm";
import s from "./Contact.module.css";

const strip = [
  { src: "/img/obra-metro-calle-72.jpg", r: "3 / 4" },
  { src: "/img/drilling-rig-and-a-digger-at-a.jpg", r: "1 / 1" },
  { src: "/img/obras-del-metro-bogotano.jpg", r: "3 / 2" },
  { src: "/img/marion-steam-shovel-excavating-at-pompoota-flat.jpg", r: "3 / 4" },
  { src: "/img/carretera-en-el-departamento-de-cordoba-colombia.jpg", r: "1 / 1" },
  { src: "/img/construction-site.jpg", r: "3 / 2" },
];

export function Contact({ machines }: { machines: { slug: string; label: string }[] }) {
  const items = [...strip, ...strip]; // dos vueltas para que la cinta no tenga costura
  return (
    <section className={s.section} id="pedir" aria-labelledby="pedir-title">
      <div className={s.strip} aria-hidden="true">
        <div className={s.track}>
          {items.map((p, i) => (
            <Image key={i} src={p.src} alt="" width={400} height={300} sizes="220px" style={{ aspectRatio: p.r }} />
          ))}
        </div>
      </div>

      <div className={s.inner}>
        <h2 id="pedir-title" className={s.title} data-reveal>Pida su máquina</h2>
        <div data-reveal style={{ "--i": 1 } as React.CSSProperties}>
          <RequestForm machines={machines} />
        </div>
        <p className={s.direct} data-reveal style={{ "--i": 2 } as React.CSSProperties}>
          ¿Prefiere hablar? Llame o escriba al{" "}
          <a className="link nums" href={whatsappUrl("Hola IngeBolsa, quiero cotizar maquinaria.")} target="_blank" rel="noopener">
            {site.phoneDisplay}
          </a>
          .
        </p>
      </div>
    </section>
  );
}

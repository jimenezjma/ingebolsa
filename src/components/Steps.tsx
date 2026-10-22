"use client";
import Image from "next/image";
import { useState } from "react";
import s from "./Steps.module.css";

const steps = [
  {
    name: "Pregunte",
    text: "Cuéntenos qué obra tiene, qué terreno y en qué ciudad. Escríbanos por WhatsApp para empezar.",
    img: { src: "/img/obras-del-metro-bogotano.jpg", alt: "Grúas y cerramiento de las obras del Metro de Bogotá" },
  },
  {
    name: "Ficha y precio",
    text: "Le enviamos la ficha técnica, fotos del equipo real y el precio puesto en su ciudad.",
    img: { src: "/img/construction-site.jpg", alt: "Estructura de hierro en construcción con obreros en los andamios, fotografía de 1880" },
  },
  {
    name: "Véala trabajar",
    text: "Inspección en patio o video del equipo encendido, con el horómetro a la vista.",
    img: { src: "/img/drilling-rig-and-a-digger-at-a.jpg", alt: "Perforadora y excavadora trabajando entre rocas en una obra" },
  },
  {
    name: "Papeles",
    text: "Factura, documentos de importación o de registro del equipo, y garantía cuando la máquina es nueva.",
    img: { src: "/img/marion-steam-shovel-excavating-at-pompoota-flat.jpg", alt: "Pala de vapor Marion excavando junto a carretas de caballos, fotografía antigua" },
  },
  {
    name: "En su obra",
    text: "Coordinamos la cama baja y entregamos la máquina en el sitio, lista para trabajar.",
    img: { src: "/img/carretera-en-el-departamento-de-cordoba-colombia.jpg", alt: "Carretera entre árboles en el departamento de Córdoba, Colombia" },
  },
];

export function Steps() {
  const [open, setOpen] = useState(0);
  return (
    <section className={s.section} id="como-comprar" aria-labelledby="steps-title">
      <div className={s.intro}>
        <h2 id="steps-title" className="head" data-reveal>Cómo se compra</h2>
        <p data-reveal style={{ "--i": 1 } as React.CSSProperties}>
          Cinco pasos entre su mensaje y la máquina descargada en la obra. Usted sabe en todo momento en cuál va.
        </p>
      </div>

      <ol className={s.row} data-reveal style={{ "--i": 2 } as React.CSSProperties}>
        {steps.map((st, i) => (
          <li key={st.name} className={s.panel} data-open={open === i} data-tone={i}>
            <button type="button" className={s.tab} aria-expanded={open === i} onClick={() => setOpen(i)}>
              <span className={s.sliverName}>{st.name}</span>
            </button>
            <div className={s.body} hidden={open !== i}>
              <h3 className={s.name}>{st.name}</h3>
              <p className={s.text}>{st.text}</p>
              {st.img ? (
                <Image className={s.img} src={st.img.src} alt={st.img.alt} width={900} height={1000} sizes="(min-width: 768px) 28vw, 100vw" />
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

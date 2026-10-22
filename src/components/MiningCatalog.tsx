import Image from "next/image";
import Link from "next/link";
import { miningCategories } from "@/lib/mining";
import { whatsappUrl } from "@/lib/site";
import s from "./Lines.module.css";
export function MiningCatalog() {
  return <section id="catalogos" aria-labelledby="catalogos-title">
    <div className={s.catalogIntro}>
      <h2 className="head" id="catalogos-title" data-reveal>Equipos para su planta</h2>
      <div data-reveal>
        <p>Consulte por familia de equipos. Solicite el catálogo y revise con nosotros las opciones para su proceso. Las imágenes son referencias generadas, no modelos específicos.</p>
        <Link className="link" href="/mineria/cuestionario">¿Necesita una recomendación? Responda el cuestionario ↗</Link>
      </div>
    </div>
    <ul className={s.catalog}>
      {miningCategories.map((category) => <li key={category.slug} id={category.slug} className={s.catalogRow}>
        {category.image && <Image className={s.categoryImage} src={category.image.src} alt={category.image.alt} width={640} height={480} sizes="(min-width: 768px) 280px, calc(100vw - 32px)" data-reveal />}
        <div className={s.catalogDetail}>
          <h3 data-reveal>{category.name}</h3>
          <p data-reveal>{category.summary}</p>
          <div className={s.catalogActions} data-reveal>
            {category.catalogPdf ? <>
              <a className="button" href={category.catalogPdf} download>Descargar catálogo PDF<span className="sr-only">: {category.name}</span></a>
              <a className="link" href={whatsappUrl(`Hola IngeBolsa, necesito asesoría sobre ${category.name.toLowerCase()}.`)} target="_blank" rel="noopener">Consultar al asesor<span className="sr-only">: {category.name}</span></a>
            </> : <a className="link" href={whatsappUrl(`Hola IngeBolsa, quisiera solicitar el catálogo de ${category.name.toLowerCase()}.`)} target="_blank" rel="noopener">Solicitar catálogo por WhatsApp<span className="sr-only">: {category.name}</span> <span aria-hidden="true">↗</span></a>}
          </div>
        </div>
      </li>)}
    </ul>
  </section>;
}

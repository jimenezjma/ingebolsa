import { site, whatsappUrl } from "@/lib/site";
import s from "./Lines.module.css";
export function DirectContact({ mining = false }: { mining?: boolean }) {
  return <section className={s.contact} id="pedir" aria-labelledby="contact-title">
    <h2 id="contact-title" className="head" data-reveal>Hablemos de su proyecto</h2>
    <div>
      <p data-reveal>{mining ? "Cuéntenos qué material procesa y qué equipo busca. Nuestro asesor le ayuda a revisar las opciones." : "¿Busca maquinaria para movimiento de tierras o minería? Cuéntenos qué necesita y en qué ciudad."}</p>
      <div className={s.contactActions} data-reveal>
        <a className="button" href={whatsappUrl(mining ? "Hola IngeBolsa, necesito asesoría sobre maquinaria para minería." : "Hola IngeBolsa, quiero consultar maquinaria para mi proyecto.")} target="_blank" rel="noopener">Hablar por WhatsApp</a>
        <a className="link nums" href={`tel:${site.phoneE164}`}>{site.phoneDisplay}</a>
      </div>
    </div>
  </section>;
}

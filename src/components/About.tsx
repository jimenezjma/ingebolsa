import Image from "next/image";
import s from "./About.module.css";

// Texto de muestra: confirmar con IngeBolsa antes de publicar.
export function About() {
  return (
    <section className={s.section} id="nosotros" aria-label="Quiénes somos">
      <p className={s.story} data-reveal>
        IngeBolsa nació de una idea sencilla: <b>una bolsa de maquinaria</b> donde quien construye encuentra el equipo
        que necesita sin recorrer patios. <b>Inge</b>, por ingeniería: revisamos cada máquina como la revisaría el
        residente de la obra, con <b>la ficha técnica completa</b> y el estado real a la vista.
      </p>
      <Image className={s.logo} src="/logo-ingebolsa.png" alt="IngeBolsa" width={579} height={579} sizes="(max-width: 767px) 220px, 20vw" data-reveal />
      <p className={s.story} data-reveal>
        <b>Bolsa</b>, porque reunimos equipos nuevos de fábrica y usados seleccionados, y conseguimos <b>bajo pedido</b> lo que no está en el
        patio. Vendemos a constructores, contratistas de vías, municipios, fincas y empresas de alquiler en{" "}
        <b>toda Colombia</b>. El rombo amarillo de nuestro logo es la señal que se pone en la vía cuando hay{" "}
        <b>máquinas trabajando</b>, y es lo que queremos ver en cada obra que atendemos.
      </p>
    </section>
  );
}

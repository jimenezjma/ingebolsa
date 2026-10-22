import type { Metadata } from "next";
import { CategoryHeader } from "@/components/CategoryHeader";
import { DirectContact } from "@/components/DirectContact";
import { Footer } from "@/components/Footer";
import { MiningCatalog } from "@/components/MiningCatalog";
import Link from "next/link";
import s from "@/components/Lines.module.css";
export const metadata: Metadata = { title: "Maquinaria para minería · IngeBolsa", description: "Trituradoras de mandíbulas, impacto y cono, cintas transportadoras, alimentadores, cribas y lavadoras de arena. Consulte los catálogos por familia." };
export default function MiningPage() {
  return <>
    <CategoryHeader title="Minería" description="Maquinaria para triturar, transportar, clasificar y lavar material. Explore las familias de equipos para su planta." href="#catalogos" action="Explorar equipos" />
    <main id="top">
      <MiningCatalog />
      <section className={s.miningBrief} aria-labelledby="mining-brief-title">
        <h2 id="mining-brief-title" className="head" data-reveal>Cuéntenos qué necesita triturar</h2>
        <div data-reveal>
          <p>Responda unas preguntas sobre el material, la producción y la instalación para preparar una recomendación.</p>
          <Link href="/mineria/cuestionario" className="button button--yellow">Responder cuestionario <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
      <DirectContact mining />
    </main>
    <Footer onlyVideo />
  </>;
}

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { MiningInquiryForm } from "@/components/MiningInquiryForm";
import { SiteNav } from "@/components/SiteNav";
import s from "@/components/MiningInquiryForm.module.css";

export const metadata: Metadata = {
  title: "Cuestionario de minería · IngeBolsa",
  description: "Describa el material y la producción que necesita para consultar maquinaria de trituración con IngeBolsa.",
};

export const dynamic = "force-dynamic";

export default function MiningInquiryPage() {
  const emailReady = Boolean(process.env.RESEND_API_KEY && process.env.MINING_INQUIRY_TO && process.env.MINING_INQUIRY_FROM);
  return <>
    <header className={s.header}>
      <SiteNav />
      <div className={s.intro}>
        <h1 className="poster" data-reveal>Su planta minera</h1>
        <p data-reveal>Cuéntenos qué material necesita procesar y qué resultado espera. Si aún no conoce algún dato, puede dejarlo en blanco.</p>
        <Link href="/mineria" className={s.back}>← Volver a minería</Link>
      </div>
    </header>
    <main>
      <figure className={s.references}>
        {[
          ["trituradoras-de-mandibulas", "Trituradora de mandíbulas"],
          ["cintas-transportadoras", "Cinta transportadora"],
          ["cribas", "Criba"],
          ["lavadoras-de-arena", "Lavadora de arena"],
        ].map(([slug, alt]) => <Image key={slug} src={`/img/mineria/${slug}.webp`} alt={`Imagen referencial: ${alt.toLowerCase()}`} width={640} height={480} sizes="(min-width: 768px) 25vw, 50vw" data-reveal />)}
        <figcaption className="sr-only">Representaciones referenciales de familias de maquinaria para minería.</figcaption>
      </figure>
      <MiningInquiryForm emailReady={emailReady} />
    </main>
    <Footer onlyVideo />
  </>;
}

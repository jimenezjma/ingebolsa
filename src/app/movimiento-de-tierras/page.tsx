import type { Metadata } from "next";
import { CategoryHeader } from "@/components/CategoryHeader";
import { Compare } from "@/components/Compare";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Inventory } from "@/components/Inventory";
import { PosterList } from "@/components/PosterList";
import { getCategories, getMachines } from "@/lib/catalog";
export const revalidate = 300;
export const metadata: Metadata = { title: "Movimiento de tierras · IngeBolsa", description: "Explore el inventario de excavadoras, retros, minicargadores, rodillos y plantas eléctricas. Compare equipos y solicite una cotización." };
export default async function EarthMovingPage() {
  const [categories, machines] = await Promise.all([getCategories(), getMachines()]);
  const options = machines.map((m) => ({ slug: m.slug, label: `${m.name} · ${m.brand} ${m.model}` }));
  return <>
    <CategoryHeader title="Movimiento de tierras" description="Excavadoras, retros, minicargadores, rodillos y plantas eléctricas. Consulte fichas técnicas y compare los equipos del inventario." href="#inventario" action="Ver inventario" />
    <main id="top">
      <PosterList categories={categories} />
      <Inventory machines={machines} categories={categories.map(({ slug, name }) => ({ slug, name }))} />
      <Compare machines={machines} /><Contact machines={options} />
    </main>
    <Footer />
  </>;
}

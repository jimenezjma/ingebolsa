import { About } from "@/components/About";
import { Compare } from "@/components/Compare";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Inventory } from "@/components/Inventory";
import { PosterList } from "@/components/PosterList";
import { Steps } from "@/components/Steps";
import { getCategories, getMachines } from "@/lib/catalog";

// El inventario cambia desde la base de datos: se regenera cada 5 minutos.
export const revalidate = 300;

export default async function Home() {
  const [categories, machines] = await Promise.all([getCategories(), getMachines()]);
  const options = machines.map((m) => ({ slug: m.slug, label: `${m.name} · ${m.brand} ${m.model}` }));

  return (
    <>
      <Hero />
      <main id="top">
        <PosterList categories={categories} />
        <Inventory machines={machines} categories={categories.map(({ slug, name }) => ({ slug, name }))} />
        <Compare machines={machines} />
        <Steps />
        <About />
        <Contact machines={options} />
      </main>
      <Footer />
    </>
  );
}

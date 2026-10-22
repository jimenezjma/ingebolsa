import { About } from "@/components/About";
import { BusinessLines } from "@/components/BusinessLines";
import { DirectContact } from "@/components/DirectContact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Steps } from "@/components/Steps";
import { LegacyCatalogLinks } from "@/components/LegacyCatalogLinks";
export default function Home() {
  return <>
    <Hero />
    <main id="top"><About /><BusinessLines /><LegacyCatalogLinks /><Steps /><DirectContact /></main>
    <Footer />
  </>;
}

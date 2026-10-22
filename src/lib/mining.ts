export type MiningCategory = {
  slug: string;
  name: string;
  summary: string;
  image?: { src: string; alt: string };
  catalogPdf?: string;
};

// Añadir PDF en /catalogos/mineria/ cuando los entregue el cliente.
// Las imágenes son referencias generadas; sustituir por fotos reales cuando existan.
// Descripciones propuestas, pendientes de aprobación.
export const miningCategories: MiningCategory[] = [
  { slug: "trituradoras-de-mandibulas", name: "Trituradoras de mandíbulas", summary: "Equipos para la trituración inicial del material. Consulte las opciones para su operación.", image: { src: "/img/mineria/trituradoras-de-mandibulas.webp", alt: "Ilustración de referencia: trituradoras de mandíbulas en grafito y amarillo" } },
  { slug: "trituradoras-de-impacto", name: "Trituradoras de impacto", summary: "Alternativas de trituración por impacto. Consulte la aplicación según el material que procesa.", image: { src: "/img/mineria/trituradoras-de-impacto.webp", alt: "Ilustración de referencia: trituradoras de impacto en grafito y amarillo" } },
  { slug: "trituradoras-de-cono", name: "Trituradoras de cono", summary: "Equipos para etapas de reducción del material. Revise las opciones con nuestro asesor.", image: { src: "/img/mineria/trituradoras-de-cono.webp", alt: "Ilustración de referencia: trituradoras de cono en grafito y amarillo" } },
  { slug: "cintas-transportadoras", name: "Cintas transportadoras", summary: "Transporte de material entre las distintas etapas de su planta.", image: { src: "/img/mineria/cintas-transportadoras.webp", alt: "Ilustración de referencia: cintas transportadoras en grafito y amarillo" } },
  { slug: "alimentadores", name: "Alimentadores", summary: "Alimentación de material hacia los equipos de procesamiento de su planta.", image: { src: "/img/mineria/alimentadores.webp", alt: "Ilustración de referencia: alimentadores en grafito y amarillo" } },
  { slug: "cribas", name: "Cribas", summary: "Clasificación de material por tamaño para las necesidades de su proceso.", image: { src: "/img/mineria/cribas.webp", alt: "Ilustración de referencia: cribas en grafito y amarillo" } },
  { slug: "lavadoras-de-arena", name: "Lavadoras de arena", summary: "Equipos para el lavado de arena dentro del proceso de su planta.", image: { src: "/img/mineria/lavadoras-de-arena.webp", alt: "Ilustración de referencia: lavadoras de arena en grafito y amarillo" } },
];

// Datos de MUESTRA para ver la web con densidad real.
// Modelos, cifras y fichas son aproximados: reemplazar por el inventario real antes de publicar.
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

type SpecRow = [group: string, label: string, value: string, unit?: string];

const categories = [
  { slug: "excavadoras", shortName: "Excavadoras", name: "Excavadoras", summary: "De 1,7 a 22 toneladas", order: 1 },
  { slug: "retrocargadoras", shortName: "Retros", name: "Retrocargadoras", summary: "Pala adelante, balde atrás", order: 2 },
  { slug: "minicargadores", shortName: "Minicargadores", name: "Minicargadores", summary: "Para obra urbana y patios", order: 3 },
  { slug: "cargadores", shortName: "Cargadores", name: "Cargadores", summary: "Material a granel y canteras", order: 4 },
  { slug: "compactacion", shortName: "Rodillos", name: "Compactación", summary: "Vibrocompactadores y canguros", order: 5 },
  { slug: "plantas-electricas", shortName: "Plantas", name: "Plantas eléctricas", summary: "Diésel, de 20 a 200 kVA", order: 6 },
];

const machines: {
  slug: string; name: string; brand: string; model: string; year: number; condition: string;
  status?: string; hours?: number; priceCop?: bigint; summary: string; category: string;
  powerHp: number; operatingWeightKg: number; featured?: boolean; specs: SpecRow[];
}[] = [
  {
    slug: "excavadora-sany-sy215c", name: "Excavadora 21 t", brand: "SANY", model: "SY215C", year: 2024,
    condition: "NUEVA", category: "excavadoras", powerHp: 148, operatingWeightKg: 21900, featured: true,
    summary: "Para movimiento de tierra y cargue de volquetas en obra mediana.",
    specs: [
      ["Motor", "Motor", "Cummins QSB6.7"], ["Motor", "Potencia neta", "148", "HP"],
      ["Capacidades", "Balde", "1,1", "m³"], ["Capacidades", "Profundidad de excavación", "6,6", "m"],
      ["Capacidades", "Fuerza de excavación del balde", "138", "kN"], ["Dimensiones", "Peso operativo", "21 900", "kg"],
      ["Dimensiones", "Ancho de zapata", "600", "mm"], ["Capacidades", "Tanque de combustible", "400", "L"],
    ],
  },
  {
    slug: "excavadora-lonking-cdm6065", name: "Excavadora 6,5 t", brand: "Lonking", model: "CDM6065", year: 2024,
    condition: "NUEVA", category: "excavadoras", powerHp: 61, operatingWeightKg: 6500, featured: true,
    summary: "Cabe en una cama baja pequeña y trabaja en vías terciarias y redes.",
    specs: [
      ["Motor", "Motor", "Yanmar 4TNV98"], ["Motor", "Potencia neta", "61", "HP"],
      ["Capacidades", "Balde", "0,23", "m³"], ["Capacidades", "Profundidad de excavación", "3,9", "m"],
      ["Dimensiones", "Peso operativo", "6 500", "kg"], ["Dimensiones", "Ancho total", "1 920", "mm"],
    ],
  },
  {
    slug: "miniexcavadora-xcmg-xe17u", name: "Miniexcavadora 1,7 t", brand: "XCMG", model: "XE17U", year: 2025,
    condition: "NUEVA", category: "excavadoras", powerHp: 15, operatingWeightKg: 1750,
    summary: "Entra por una puerta de garaje. Zanjas, jardines y demolición interior.",
    specs: [
      ["Motor", "Motor", "Kubota D722"], ["Motor", "Potencia neta", "15", "HP"],
      ["Capacidades", "Balde", "0,04", "m³"], ["Capacidades", "Profundidad de excavación", "2,3", "m"],
      ["Dimensiones", "Peso operativo", "1 750", "kg"], ["Dimensiones", "Ancho con orugas retraídas", "980", "mm"],
    ],
  },
  {
    slug: "retrocargadora-jcb-3cx-2019", name: "Retrocargadora", brand: "JCB", model: "3CX", year: 2019,
    condition: "USADA", hours: 6200, category: "retrocargadoras", powerHp: 92, operatingWeightKg: 8070, featured: true,
    summary: "Revisada en taller, con llantas al 70 %. Lista para trabajar.",
    specs: [
      ["Motor", "Motor", "JCB Ecomax 4.4"], ["Motor", "Potencia neta", "92", "HP"],
      ["Capacidades", "Balde frontal", "1,0", "m³"], ["Capacidades", "Profundidad de excavación", "5,46", "m"],
      ["Dimensiones", "Peso operativo", "8 070", "kg"], ["Estado", "Horómetro", "6 200", "h"],
    ],
  },
  {
    slug: "minicargador-bobcat-s570", name: "Minicargador", brand: "Bobcat", model: "S570", year: 2022,
    condition: "USADA", hours: 2100, category: "minicargadores", powerHp: 66, operatingWeightKg: 2890,
    summary: "Con balde y horquillas. Acepta martillo y barredora.",
    specs: [
      ["Motor", "Potencia neta", "66", "HP"], ["Capacidades", "Carga operativa nominal", "900", "kg"],
      ["Dimensiones", "Peso operativo", "2 890", "kg"], ["Estado", "Horómetro", "2 100", "h"],
    ],
  },
  {
    slug: "cargador-lonking-cdm853", name: "Cargador 5 t", brand: "Lonking", model: "CDM853", year: 2024,
    condition: "NUEVA", category: "cargadores", powerHp: 220, operatingWeightKg: 17000,
    summary: "Balde de 3 m³ para canteras, plantas de asfalto y patios de acopio.",
    specs: [
      ["Motor", "Motor", "Weichai WD10"], ["Motor", "Potencia neta", "220", "HP"],
      ["Capacidades", "Balde", "3,0", "m³"], ["Capacidades", "Carga nominal", "5 000", "kg"],
      ["Dimensiones", "Peso operativo", "17 000", "kg"],
    ],
  },
  {
    slug: "vibrocompactador-dynapac-ca250d", name: "Vibrocompactador 10 t", brand: "Dynapac", model: "CA250D", year: 2018,
    condition: "USADA", hours: 7400, status: "RESERVADA", category: "compactacion", powerHp: 110, operatingWeightKg: 10200,
    summary: "Rodillo liso para base y subbase en vías.",
    specs: [
      ["Motor", "Potencia", "110", "HP"], ["Capacidades", "Fuerza centrífuga", "246 / 147", "kN"],
      ["Dimensiones", "Ancho de tambor", "2 130", "mm"], ["Dimensiones", "Peso operativo", "10 200", "kg"],
      ["Estado", "Horómetro", "7 400", "h"],
    ],
  },
  {
    slug: "planta-electrica-cummins-100kva", name: "Planta eléctrica 100 kVA", brand: "Cummins", model: "C100D6", year: 2025,
    condition: "NUEVA", category: "plantas-electricas", powerHp: 145, operatingWeightKg: 1450,
    summary: "Cabinada e insonorizada, con transferencia automática.",
    specs: [
      ["Motor", "Motor", "Cummins 6BT5.9-G2"], ["Generación", "Potencia prime", "100", "kVA"],
      ["Generación", "Voltaje", "220 / 440", "V"], ["Capacidades", "Autonomía al 75 %", "11", "h"],
      ["Dimensiones", "Peso", "1 450", "kg"],
    ],
  },
];

async function main() {
  await db.quoteRequest.deleteMany();
  await db.spec.deleteMany();
  await db.machineImage.deleteMany();
  await db.machine.deleteMany();
  await db.category.deleteMany();

  const bySlug: Record<string, string> = {};
  for (const c of categories) bySlug[c.slug] = (await db.category.create({ data: c })).id;

  for (const m of machines) {
    const { specs, category, ...data } = m;
    await db.machine.create({
      data: {
        ...data,
        categoryId: bySlug[category],
        specs: { create: specs.map(([group, label, value, unit], order) => ({ group, label, value, unit, order })) },
      },
    });
  }
  console.log(`Seed: ${categories.length} categorías, ${machines.length} equipos.`);
}

main().finally(() => db.$disconnect());

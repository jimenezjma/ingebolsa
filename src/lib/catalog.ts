import { db } from "./db";

export type MachineSpec = { group: string; label: string; value: string; unit: string | null };

export type MachineSummary = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  model: string;
  year: number | null;
  condition: string;
  status: string;
  hours: number | null;
  priceCop: number | null;
  city: string;
  summary: string;
  powerHp: number | null;
  operatingWeightKg: number | null;
  category: { slug: string; name: string };
};

export type MachineDetail = MachineSummary & {
  description: string | null;
  specs: MachineSpec[];
  images: { url: string; alt: string }[];
};

const summarySelect = {
  id: true, slug: true, name: true, brand: true, model: true, year: true, condition: true,
  status: true, hours: true, priceCop: true, city: true, summary: true, powerHp: true,
  operatingWeightKg: true, category: { select: { slug: true, name: true } },
} as const;

// BigInt no viaja a componentes cliente; los precios en COP caben en Number.
function toPlain<T extends { priceCop: bigint | null }>(m: T) {
  return { ...m, priceCop: m.priceCop === null ? null : Number(m.priceCop) };
}

export async function getCategories() {
  return db.category.findMany({
    orderBy: { order: "asc" },
    select: {
      slug: true, name: true, shortName: true, summary: true,
      _count: { select: { machines: { where: { published: true } } } },
    },
  });
}

export async function getMachines(): Promise<MachineSummary[]> {
  const rows = await db.machine.findMany({
    where: { published: true },
    orderBy: [{ category: { order: "asc" } }, { operatingWeightKg: "desc" }],
    select: summarySelect,
  });
  return rows.map(toPlain);
}

export async function getMachine(slug: string): Promise<MachineDetail | null> {
  const row = await db.machine.findFirst({
    where: { slug, published: true },
    select: {
      ...summarySelect,
      description: true,
      specs: { orderBy: { order: "asc" }, select: { group: true, label: true, value: true, unit: true } },
      images: { orderBy: { order: "asc" }, select: { url: true, alt: true } },
    },
  });
  return row ? toPlain(row) : null;
}

export const statusLabel: Record<string, string> = {
  DISPONIBLE: "Disponible",
  RESERVADA: "Reservada",
  VENDIDA: "Vendida",
  BAJO_PEDIDO: "Bajo pedido",
};

export function formatKg(kg: number | null) {
  if (kg === null) return "—";
  return kg >= 10000 ? `${(kg / 1000).toLocaleString("es-CO", { maximumFractionDigits: 1 })} t` : `${kg.toLocaleString("es-CO")} kg`;
}

export function formatCop(v: number | null) {
  return v === null ? "Precio a consultar" : v.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });
}

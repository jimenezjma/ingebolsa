import { z } from "zod";

const answer = z.string().trim().max(500);

export const miningInquirySchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(30),
  email: z.union([z.string().trim().email().max(160), z.literal("")]),
  stoneType: answer,
  silicaPercent: answer,
  maxStoneSize: answer,
  finalProducts: z.string().trim().max(1200),
  finesPercent: answer,
  capacity: answer,
  shapeSpecs: answer,
  mobility: answer,
  powerSource: answer,
  electricalDetails: answer,
  purpose: answer,
  application: answer,
  stackingConveyors: answer,
  startDate: answer,
  website: z.string().max(160).optional(),
});

export type MiningInquiry = z.infer<typeof miningInquirySchema>;

export const miningQuestions: { key: keyof MiningInquiry; label: string }[] = [
  { key: "stoneType", label: "¿Qué tipo de piedra desea triturar?" },
  { key: "silicaPercent", label: "¿Cuál es el porcentaje de sílice?" },
  { key: "maxStoneSize", label: "¿Cuál es la medida de la piedra más grande que alimentará la trituradora?" },
  { key: "finalProducts", label: "¿Cuántos productos finales necesita producir? Indique cantidad y tamaño de cada uno." },
  { key: "finesPercent", label: "¿Qué porcentaje aproximado de finos tiene el material a triturar?" },
  { key: "capacity", label: "¿Qué tonelaje por hora o cuántos metros cúbicos por hora necesita producir?" },
  { key: "shapeSpecs", label: "¿Necesita cumplir especificaciones de forma del producto final?" },
  { key: "mobility", label: "¿Prefiere un equipo portátil o estacionario?" },
  { key: "powerSource", label: "¿Prefiere diésel o eléctrico?" },
  { key: "electricalDetails", label: "Si es eléctrico, indique fases, ciclos y voltios." },
  { key: "purpose", label: "¿El equipo es para vender el material o para uso propio?" },
  { key: "application", label: "¿Cuál será la aplicación del producto final?" },
  { key: "stackingConveyors", label: "¿Necesita bandas transportadoras de apilamiento?" },
  { key: "startDate", label: "¿Cuándo desea empezar a triturar?" },
];

export function miningInquiryText(data: MiningInquiry) {
  return [
    "Nueva consulta de maquinaria para minería",
    "",
    `Nombre: ${data.name}`,
    `Teléfono o WhatsApp: ${data.phone}`,
    `Correo: ${data.email || "No indicado"}`,
    "",
    ...miningQuestions.flatMap(({ key, label }) => [
      label,
      data[key] || "No indicado",
      "",
    ]),
  ].join("\n");
}

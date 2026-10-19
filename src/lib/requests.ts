import { z } from "zod";

export const quoteRequestSchema = z.object({
  name: z.string({ required_error: "Escriba su nombre" }).trim().min(2, "Escriba su nombre").max(120),
  phone: z.string({ required_error: "Escriba un teléfono o WhatsApp" }).trim().min(7, "Escriba un teléfono o WhatsApp").max(30),
  email: z.string().trim().email("Correo no válido").max(160).optional().or(z.literal("")),
  city: z.string().trim().max(80).optional().or(z.literal("")),
  kind: z.enum(["COMPRA", "ALQUILER", "REPUESTOS", "OTRO"]).default("COMPRA"),
  machineSlug: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string({ required_error: "Cuéntenos qué necesita" }).trim().min(5, "Cuéntenos qué necesita").max(2000),
  // Trampa para bots: debe llegar vacío.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;

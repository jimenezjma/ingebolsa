import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { quoteRequestSchema } from "@/lib/requests";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = quoteRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }
  const { website, machineSlug, email, city, ...data } = parsed.data;
  if (website) return NextResponse.json({ ok: true }); // bot: se descarta en silencio

  const machine = machineSlug
    ? await db.machine.findUnique({ where: { slug: machineSlug }, select: { id: true } })
    : null;

  const saved = await db.quoteRequest.create({
    data: { ...data, email: email || null, city: city || null, machineId: machine?.id ?? null },
    select: { id: true },
  });

  // Fase 2: notificar por correo / WhatsApp Business al equipo comercial.
  return NextResponse.json({ ok: true, id: saved.id }, { status: 201 });
}

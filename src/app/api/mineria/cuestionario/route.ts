import { NextResponse } from "next/server";
import { miningInquirySchema, miningInquiryText } from "@/lib/mining-inquiry";

export async function POST(req: Request) {
  if (!process.env.RESEND_API_KEY || !process.env.MINING_INQUIRY_TO || !process.env.MINING_INQUIRY_FROM) {
    return NextResponse.json({ ok: false, message: "El envío por correo aún no está configurado." }, { status: 503 });
  }

  if (Number(req.headers.get("content-length")) > 12_000) {
    return NextResponse.json({ ok: false, message: "La solicitud es demasiado extensa." }, { status: 413 });
  }

  const raw = await req.json().catch(() => null);
  if (raw && typeof raw === "object" && raw.website) return NextResponse.json({ ok: true });
  const parsed = miningInquirySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: "Revise sus datos de contacto y las respuestas." }, { status: 400 });
  }

  const { email, name } = parsed.data;
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.MINING_INQUIRY_FROM,
        to: [process.env.MINING_INQUIRY_TO],
        subject: `Cuestionario de minería · ${name.replace(/[\r\n]/g, " ")}`,
        text: miningInquiryText(parsed.data),
        ...(email ? { reply_to: email } : {}),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error("No se pudo entregar el cuestionario de minería", response.status);
      return NextResponse.json({ ok: false, message: "No pudimos enviar el cuestionario. Inténtelo de nuevo." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error al enviar el cuestionario de minería", error);
    return NextResponse.json({ ok: false, message: "No pudimos enviar el cuestionario. Inténtelo de nuevo." }, { status: 502 });
  }
}

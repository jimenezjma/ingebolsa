"use client";
import { useEffect, useState } from "react";
import { whatsappUrl } from "@/lib/site";
import { PICK_EVENT } from "./events";
import s from "./Contact.module.css";

type Opt = { slug: string; label: string };
type State =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent"; wa: string }
  | { kind: "error"; errors: Record<string, string[]> };

export function RequestForm({ machines }: { machines: Opt[] }) {
  const [machine, setMachine] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });

  // "Cotizar" en el inventario elige el equipo aquí.
  useEffect(() => {
    const onPick = (e: Event) => setMachine((e as CustomEvent<string>).detail);
    window.addEventListener(PICK_EVENT, onPick);
    return () => window.removeEventListener(PICK_EVENT, onPick);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setState({ kind: "sending" });
    const res = await fetch("/api/solicitudes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch(() => null);
    const json = await res?.json().catch(() => null);
    if (!res || !res.ok) {
      setState({ kind: "error", errors: json?.errors ?? { form: ["No pudimos enviar. Escríbanos por WhatsApp."] } });
      return;
    }
    const label = machines.find((m) => m.slug === data.machineSlug)?.label;
    const wa = whatsappUrl(
      `Hola IngeBolsa, soy ${data.name}. Acabo de enviar una solicitud desde la web` +
        (label ? ` por ${label}` : "") +
        `. ${data.message}`,
    );
    form.reset();
    setMachine("");
    setState({ kind: "sent", wa });
  }

  const err = (k: string) => (state.kind === "error" ? state.errors[k]?.[0] : undefined);

  if (state.kind === "sent") {
    return (
      <div className={s.sent} role="status">
        <p className={s.sentTitle}>Recibimos su solicitud.</p>
        <p>Le escribimos o llamamos al número que dejó. Si quiere adelantar la conversación, siga por WhatsApp.</p>
        <div className={s.sentActions}>
          <a className="button" href={state.wa} target="_blank" rel="noopener">Seguir por WhatsApp</a>
          <button type="button" className="link" onClick={() => setState({ kind: "idle" })}>Enviar otra solicitud</button>
        </div>
      </div>
    );
  }

  return (
    <form className={s.form} onSubmit={onSubmit} noValidate>
      <label className={s.cell}>
        <span className="sr-only">Nombre</span>
        <input name="name" placeholder="Nombre" autoComplete="name" required aria-invalid={!!err("name")} />
      </label>
      <label className={s.cell}>
        <span className="sr-only">Teléfono o WhatsApp</span>
        <input name="phone" placeholder="Teléfono o WhatsApp" type="tel" autoComplete="tel" required aria-invalid={!!err("phone")} />
      </label>
      <label className={s.cell}>
        <span className="sr-only">Ciudad de la obra</span>
        <input name="city" placeholder="Ciudad de la obra" autoComplete="address-level2" />
      </label>

      <label className={s.cell}>
        <span className="sr-only">Equipo</span>
        <select name="machineSlug" value={machine} onChange={(e) => setMachine(e.target.value)}>
          <option value="">Equipo: aún no sé</option>
          {machines.map((m) => (
            <option key={m.slug} value={m.slug}>{m.label}</option>
          ))}
        </select>
      </label>
      <label className={s.cell}>
        <span className="sr-only">Tipo de solicitud</span>
        <select name="kind" defaultValue="COMPRA">
          <option value="COMPRA">Quiero comprar</option>
          <option value="ALQUILER">Quiero alquilar</option>
          <option value="REPUESTOS">Repuestos</option>
          <option value="OTRO">Otra consulta</option>
        </select>
      </label>
      <label className={s.cell}>
        <span className="sr-only">Correo (opcional)</span>
        <input name="email" placeholder="Correo (opcional)" type="email" autoComplete="email" aria-invalid={!!err("email")} />
      </label>

      <label className={`${s.cell} ${s.message}`}>
        <span className="sr-only">Qué necesita</span>
        <textarea name="message" placeholder="¿Qué obra tiene y qué máquina necesita?" rows={3} required aria-invalid={!!err("message")} />
      </label>
      <input name="website" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" />
      <button type="submit" className={`${s.cell} ${s.submit}`} disabled={state.kind === "sending"}>
        {state.kind === "sending" ? "Enviando…" : "Pedir cotización"}
      </button>

      <p className={s.fine} aria-live="polite">
        {state.kind === "error"
          ? Object.values(state.errors).flat()[0]
          : "Usamos sus datos solo para responder esta solicitud."}
      </p>
    </form>
  );
}

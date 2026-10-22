"use client";

import { useState } from "react";
import { whatsappUrl } from "@/lib/site";
import s from "./MiningInquiryForm.module.css";

type Status = "idle" | "sending" | "sent" | "error";

function Field({ name, label, hint, large = false }: { name: string; label: string; hint?: string; large?: boolean }) {
  return <label className={s.field} data-reveal>
    <span className={s.label}>{label}</span>
    {hint && <span className={s.hint}>{hint}</span>}
    {large ? <textarea name={name} rows={3} /> : <input name={name} type="text" />}
  </label>;
}

function Choice({ name, label, options }: { name: string; label: string; options: string[] }) {
  return <label className={s.field} data-reveal>
    <span className={s.label}>{label}</span>
    <select name={name} defaultValue="">
      <option value="">Seleccione una opción</option>
      {options.map((option) => <option value={option} key={option}>{option}</option>)}
    </select>
  </label>;
}

export function MiningInquiryForm({ emailReady }: { emailReady: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setStatus("sending");
    setError("");
    const data = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/mineria/cuestionario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.message || "No pudimos enviar el cuestionario.");
      form.reset();
      setStatus("sent");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "No pudimos enviar el cuestionario.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return <section className={s.success} role="status">
      <h2 className="head">Cuestionario enviado</h2>
      <p>Recibimos sus respuestas. El equipo de IngeBolsa podrá contactarle con los datos que indicó.</p>
      <button className="button" type="button" onClick={() => setStatus("idle")}>Enviar otro cuestionario</button>
    </section>;
  }

  return <form className={s.form} onSubmit={onSubmit}>
    <div className={s.formIntro} data-reveal>
      <h2 className="head">Datos de contacto</h2>
      <div>
        <p>Así podremos responder a su consulta. Las preguntas técnicas se pueden dejar en blanco si todavía no tiene el dato.</p>
        {!emailReady && <p className={s.notice}>Vista previa: el envío por correo estará disponible cuando IngeBolsa confirme la dirección de destino.</p>}
      </div>
    </div>
    <div className={s.fields}>
      <label className={s.field} data-reveal><span className={s.label}>Nombre <span aria-hidden="true">*</span></span><input name="name" autoComplete="name" required minLength={2} maxLength={120} /></label>
      <label className={s.field} data-reveal><span className={s.label}>Teléfono o WhatsApp <span aria-hidden="true">*</span></span><input name="phone" type="tel" autoComplete="tel" required minLength={7} maxLength={30} /></label>
      <label className={s.field} data-reveal><span className={s.label}>Correo electrónico</span><input name="email" type="email" autoComplete="email" maxLength={160} /></label>
    </div>

    <fieldset className={s.group}>
      <legend>El material</legend>
      <div className={s.fields}>
        <Field name="stoneType" label="¿Qué tipo de piedra desea triturar?" />
        <Field name="silicaPercent" label="¿Cuál es el porcentaje de sílice?" hint="Si lo conoce, indique un porcentaje aproximado." />
        <Field name="maxStoneSize" label="¿Cuál es la medida de la piedra más grande que alimentará la trituradora?" hint="Incluya la unidad: mm, cm o pulgadas." />
      </div>
    </fieldset>

    <fieldset className={s.group}>
      <legend>La producción</legend>
      <div className={s.fields}>
        <Field name="finalProducts" label="¿Cuántos productos finales necesita producir? Indique cantidad y tamaño de cada uno." hint="Por ejemplo: dos productos, 0–5 mm y 5–20 mm." large />
        <Field name="finesPercent" label="¿Qué porcentaje aproximado de finos tiene el material a triturar?" />
        <Field name="capacity" label="¿Qué tonelaje por hora o cuántos metros cúbicos por hora necesita producir?" hint="Indique t/h o m³/h." />
        <Field name="shapeSpecs" label="¿Necesita cumplir especificaciones de forma del producto final?" large />
      </div>
    </fieldset>

    <fieldset className={s.group}>
      <legend>El equipo y los tiempos</legend>
      <div className={s.fields}>
        <Choice name="mobility" label="¿Prefiere un equipo portátil o estacionario?" options={["Portátil", "Estacionario", "Aún no lo sé"]} />
        <Choice name="powerSource" label="¿Prefiere diésel o eléctrico?" options={["Diésel", "Eléctrico", "Aún no lo sé"]} />
        <Field name="electricalDetails" label="Si es eléctrico, indique fases, ciclos y voltios." />
        <Choice name="purpose" label="¿El equipo es para vender el material o para uso propio?" options={["Vender el material", "Uso propio", "Ambos", "Aún no lo sé"]} />
        <Field name="application" label="¿Cuál será la aplicación del producto final?" />
        <Choice name="stackingConveyors" label="¿Necesita bandas transportadoras de apilamiento?" options={["Sí", "No", "Aún no lo sé"]} />
        <Field name="startDate" label="¿Cuándo desea empezar a triturar?" hint="Puede indicar una fecha o un plazo aproximado." />
      </div>
    </fieldset>

    <input name="website" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" />
    <div className={s.submitArea}>
      {emailReady ? <>
        <button className="button" type="submit" disabled={status === "sending"}>{status === "sending" ? "Enviando…" : "Enviar cuestionario"}</button>
        <p>Usaremos sus datos solo para responder esta consulta.</p>
      </> : <>
        <p className={s.pending}>Envío por correo pendiente de configuración.</p>
        <button className="button" type="submit" disabled>Enviar cuestionario</button>
        <a className="link" href={whatsappUrl("Hola IngeBolsa, quiero consultar sobre equipos para trituración.")} target="_blank" rel="noopener">Consultar mientras tanto por WhatsApp</a>
      </>}
      {status === "error" && <p className={s.error} role="alert">{error}</p>}
    </div>
  </form>;
}

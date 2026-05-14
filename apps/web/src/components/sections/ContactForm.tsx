"use client";

import * as React from "react";
import { Send, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@rdv/utils";
import { submitContactForm } from "@/app/actions/forms";

const SUBJECTS = [
  { value: "general",    label: "Consulta general" },
  { value: "oracion",    label: "Petición de oración" },
  { value: "bautismo",   label: "Quiero bautizarme" },
  { value: "consejeria", label: "Solicitar consejería" },
  { value: "grupos",     label: "Grupos celulares" },
  { value: "nuevo",      label: "Soy nuevo creyente" },
];

export function ContactForm({ defaultSubject }: { defaultSubject?: string }) {
  const [subject, setSubject] = React.useState(defaultSubject ?? "general");
  const [status, setStatus]   = React.useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError]     = React.useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      const fd = new FormData(e.currentTarget);
      fd.set("subject", subject);
      await submitContactForm(fd);
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error. Intenta de nuevo.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <CheckCircle size={40} strokeWidth={1.5} className="text-gold" aria-hidden />
        <h3 className="font-display font-700 text-text-primary text-[1.25rem]">
          ¡Mensaje recibido!
        </h3>
        <p className="font-body text-[0.9375rem] text-text-secondary max-w-[38ch]">
          Alguien del equipo se pondrá en contacto contigo en las próximas 24–48 horas.
        </p>
        <button
          onClick={() => { setStatus("idle"); setError(null); }}
          className="text-label text-gold hover:text-gold-muted transition-colors mt-2"
        >
          Enviar otro mensaje →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <input type="text" name="_hp_name" className="hidden" tabIndex={-1} aria-hidden />

      <div className="grid sm:grid-cols-2 gap-5">
        <Input label="Nombre" name="name" placeholder="Tu nombre" required disabled={status === "sending"} />
        <Input label="Correo electrónico" name="email" type="email" placeholder="tu@correo.com" required disabled={status === "sending"} />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Input label="Teléfono" name="phone" type="tel" placeholder="+507 6000-0000" hint="Opcional" disabled={status === "sending"} />

        <div className="flex flex-col gap-1.5">
          <label htmlFor="subject" className="text-label text-text-secondary">Asunto</label>
          <select
            id="subject"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            disabled={status === "sending"}
            className={cn(
              "w-full h-11 px-4 font-body text-[0.9375rem] text-text-primary",
              "bg-bg-raised border border-border rounded-xl appearance-none",
              "focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30",
              "disabled:opacity-50 transition-colors duration-150"
            )}
          >
            {SUBJECTS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      <Textarea
        label="Mensaje"
        name="message"
        placeholder="¿En qué podemos ayudarte?"
        required
        disabled={status === "sending"}
        className="min-h-[140px]"
      />

      {error && <p className="font-body text-[0.875rem] text-red-400" role="alert">{error}</p>}

      <Button type="submit" size="lg" disabled={status === "sending"} className="self-start gap-2">
        {status === "sending" ? "Enviando…" : (
          <><Send size={15} strokeWidth={2} aria-hidden /> Enviar mensaje</>
        )}
      </Button>
    </form>
  );
}

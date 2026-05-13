"use client";

import * as React from "react";
import { Send, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@rdv/utils";

const SUBJECTS = [
  { value: "general",   label: "Consulta general" },
  { value: "oracion",   label: "Petición de oración" },
  { value: "bautismo",  label: "Quiero bautizarme" },
  { value: "consejeria",label: "Solicitar consejería" },
  { value: "grupos",    label: "Grupos celulares" },
  { value: "nuevo",     label: "Soy nuevo creyente" },
];

export function ContactForm({ defaultSubject }: { defaultSubject?: string }) {
  const [subject, setSubject] = React.useState(defaultSubject ?? "general");
  const [status, setStatus] = React.useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    // TODO: connect to Payload CMS API or email service (Resend / SendGrid)
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
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
          onClick={() => setStatus("idle")}
          className="text-label text-gold hover:text-gold-muted transition-colors mt-2"
        >
          Enviar otro mensaje →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Input label="Nombre" placeholder="Tu nombre" required />
        <Input label="Correo electrónico" type="email" placeholder="tu@correo.com" required />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Input label="Teléfono" type="tel" placeholder="+507 6000-0000" hint="Opcional" />

        <div className="flex flex-col gap-1.5">
          <label htmlFor="subject" className="text-label text-text-secondary">
            Asunto
          </label>
          <select
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={cn(
              "w-full h-11 px-4",
              "font-body text-[0.9375rem] text-text-primary",
              "bg-bg-raised border border-border rounded-xl",
              "focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30",
              "transition-colors duration-150"
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
        placeholder="¿En qué podemos ayudarte?"
        required
        className="min-h-[140px]"
      />

      <Button
        type="submit"
        size="lg"
        disabled={status === "sending"}
        className="self-start gap-2"
      >
        {status === "sending" ? "Enviando…" : (
          <>
            <Send size={15} strokeWidth={2} aria-hidden />
            Enviar mensaje
          </>
        )}
      </Button>
    </form>
  );
}

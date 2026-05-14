"use client";

import * as React from "react";
import { cn } from "@rdv/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitMinistryInterest } from "@/app/actions/forms";

interface Ministry {
  id: string;
  name: string;
}

interface MinistryInterestFormProps {
  ministries: Ministry[];
  defaultMinistryId?: string;
  className?: string;
}

type FormState = "idle" | "submitting" | "success" | "error";

export function MinistryInterestForm({ ministries, defaultMinistryId, className }: MinistryInterestFormProps) {
  const [state, setState] = React.useState<FormState>("idle");
  const [error, setError] = React.useState<string | null>(null);
  const [ministryId, setMinistryId] = React.useState(defaultMinistryId ?? ministries[0]?.id ?? "");

  const selectedMinistry = ministries.find((m) => m.id === ministryId);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("submitting");
    setError(null);
    try {
      const fd = new FormData(e.currentTarget);
      fd.set("ministryId", ministryId);
      await submitMinistryInterest(fd);
      setState("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error. Intenta de nuevo.");
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <div className={cn("flex flex-col items-center gap-4 py-12 text-center", className)}>
        <div className="w-12 h-12 rounded-full bg-bg-raised border border-border-gold flex items-center justify-center">
          <span className="text-gold text-xl" aria-hidden>✓</span>
        </div>
        <h3 className="font-display font-700 text-text-primary text-[1.1875rem]">
          ¡Mensaje recibido!
        </h3>
        <p className="font-body text-[0.9375rem] text-text-secondary max-w-[40ch]">
          Alguien del equipo{selectedMinistry ? ` de ${selectedMinistry.name}` : ""} se pondrá en contacto contigo pronto.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-5", className)}
      noValidate
    >
      <input type="text" name="_hp_name" className="hidden" tabIndex={-1} aria-hidden />

      {ministries.length > 1 && (
        <div className="flex flex-col gap-1.5">
          <label htmlFor="ministry-select" className="text-label text-text-secondary">Ministerio</label>
          <select
            id="ministry-select"
            name="ministryId"
            value={ministryId}
            onChange={(e) => setMinistryId(e.target.value)}
            disabled={state === "submitting"}
            required
            className={cn(
              "w-full h-11 px-4 font-body text-[0.9375rem] text-text-primary",
              "bg-bg-raised border border-border rounded-xl appearance-none",
              "focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30",
              "disabled:opacity-50 transition-colors duration-150"
            )}
          >
            {ministries.map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        <Input
          label="Nombre completo"
          name="name"
          placeholder="Tu nombre"
          required
          disabled={state === "submitting"}
        />
        <Input
          label="Teléfono"
          name="phone"
          type="tel"
          placeholder="+507 6000-0000"
          hint="Opcional"
          disabled={state === "submitting"}
        />
      </div>

      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="tu@email.com"
        required
        disabled={state === "submitting"}
      />

      <Textarea
        label="¿Cómo podemos ayudarte?"
        name="message"
        placeholder={`Cuéntanos un poco sobre ti y por qué te interesa${selectedMinistry ? ` ${selectedMinistry.name}` : ""}...`}
        rows={4}
        disabled={state === "submitting"}
      />

      {state === "error" && (
        <p className="font-body text-[0.875rem] text-red-400" role="alert">
          {error ?? "Ocurrió un error. Por favor intenta nuevamente."}
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={state === "submitting"}
        className="self-start"
      >
        {state === "submitting" ? "Enviando..." : "Enviar mensaje"}
      </Button>
    </form>
  );
}

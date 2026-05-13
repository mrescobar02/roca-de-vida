"use client";

import * as React from "react";
import { cn } from "@rdv/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface MinistryInterestFormProps {
  ministryName: string;
  ministrySlug: string;
  className?: string;
}

type FormState = "idle" | "submitting" | "success" | "error";

export function MinistryInterestForm({ ministryName, className }: MinistryInterestFormProps) {
  const [state, setState] = React.useState<FormState>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("submitting");

    // TODO (Etapa 7): POST /api/forms/ministry-interest con los campos del form
    // Por ahora simulamos un delay y éxito
    await new Promise((r) => setTimeout(r, 1200));
    setState("success");
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
          Alguien del equipo de {ministryName} se pondrá en contacto contigo pronto.
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
      {/* Honeypot — oculto para humanos, spam trap */}
      <input type="text" name="_hp_name" className="hidden" tabIndex={-1} aria-hidden />

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
        placeholder={`Cuéntanos un poco sobre ti y por qué te interesa ${ministryName}...`}
        rows={4}
        disabled={state === "submitting"}
      />

      {state === "error" && (
        <p className="font-body text-[0.875rem] text-red-400" role="alert">
          Ocurrió un error. Por favor intenta nuevamente.
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

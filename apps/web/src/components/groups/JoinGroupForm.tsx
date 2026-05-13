"use client";

import * as React from "react";
import { cn } from "@rdv/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface JoinGroupFormProps {
  groupName: string;
  groupSlug: string;
  className?: string;
}

type FormState = "idle" | "submitting" | "success" | "error";

export function JoinGroupForm({ groupName, className }: JoinGroupFormProps) {
  const [state, setState] = React.useState<FormState>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("submitting");

    // TODO (Etapa 7): POST /api/forms/cell-group-request con los campos del form
    await new Promise((r) => setTimeout(r, 1200));
    setState("success");
  };

  if (state === "success") {
    return (
      <div className={cn("flex flex-col items-center gap-4 py-10 text-center", className)}>
        <div className="w-12 h-12 rounded-full bg-bg-raised border border-border-gold flex items-center justify-center">
          <span className="text-gold text-xl" aria-hidden>✓</span>
        </div>
        <h3 className="font-display font-700 text-text-primary text-[1.1875rem]">
          ¡Solicitud enviada!
        </h3>
        <p className="font-body text-[0.9375rem] text-text-secondary max-w-[40ch]">
          El líder de {groupName} se pondrá en contacto contigo en los próximos días.
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
          required
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
        label="Mensaje (opcional)"
        name="message"
        placeholder="¿Algo que quieras que el líder sepa antes de contactarte?"
        rows={3}
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
        {state === "submitting" ? "Enviando..." : "Quiero unirme"}
      </Button>
    </form>
  );
}

"use client";

import * as React from "react";
import { cn } from "@rdv/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitCellGroupRequest } from "@/app/actions/forms";

interface Group {
  id: string;
  name: string;
  district?: string;
}

interface JoinGroupFormProps {
  groups: Group[];
  defaultGroupId?: string;
  className?: string;
}

type FormState = "idle" | "submitting" | "success" | "error";

export function JoinGroupForm({ groups, defaultGroupId, className }: JoinGroupFormProps) {
  const [state, setState] = React.useState<FormState>("idle");
  const [error, setError] = React.useState<string | null>(null);
  const [groupId, setGroupId] = React.useState(defaultGroupId ?? groups[0]?.id ?? "");

  const selectedGroup = groups.find((g) => g.id === groupId);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("submitting");
    setError(null);
    try {
      const fd = new FormData(e.currentTarget);
      fd.set("cellGroupId", groupId);
      fd.set("district", selectedGroup?.district ?? "");
      await submitCellGroupRequest(fd);
      setState("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error. Intenta de nuevo.");
      setState("error");
    }
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
          El líder{selectedGroup ? ` de ${selectedGroup.name}` : ""} se pondrá en contacto contigo en los próximos días.
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

      {groups.length > 1 && (
        <div className="flex flex-col gap-1.5">
          <label htmlFor="group-select" className="text-label text-text-secondary">Grupo celular</label>
          <select
            id="group-select"
            name="cellGroupId"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            disabled={state === "submitting"}
            required
            className={cn(
              "w-full h-11 px-4 font-body text-[0.9375rem] text-text-primary",
              "bg-bg-raised border border-border rounded-xl appearance-none",
              "focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30",
              "disabled:opacity-50 transition-colors duration-150"
            )}
          >
            {groups.map((g) => (
              <option key={g.id} value={g.id}>{g.name}</option>
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
        {state === "submitting" ? "Enviando..." : "Quiero unirme"}
      </Button>
    </form>
  );
}

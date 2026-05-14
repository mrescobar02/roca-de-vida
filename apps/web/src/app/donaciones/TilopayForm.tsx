"use client";

import * as React from "react";
import { CreditCard, Loader2, Repeat, Zap, ChevronLeft } from "lucide-react";
import { cn } from "@rdv/utils";
import { Input } from "@/components/ui/input";
import { initTilopayDonation } from "./actions";

const PRESETS = [10, 25, 50, 100, 200];

type Frequency = "monthly" | "weekly" | "yearly";
type Step = "amount" | "contact";

const FREQUENCIES: { value: Frequency; label: string; sublabel: string }[] = [
  { value: "weekly",  label: "Semanal",  sublabel: "cada semana" },
  { value: "monthly", label: "Mensual",  sublabel: "cada mes"    },
  { value: "yearly",  label: "Anual",    sublabel: "cada año"    },
];

export function TilopayForm() {
  const [step, setStep]           = React.useState<Step>("amount");
  const [recurring, setRecurring] = React.useState(false);
  const [frequency, setFrequency] = React.useState<Frequency>("monthly");
  const [selected, setSelected]   = React.useState<number | "custom">(25);
  const [customValue, setCustomValue] = React.useState("");
  const [pending, setPending]     = React.useState(false);
  const [error, setError]         = React.useState<string | null>(null);

  const displayAmount = selected === "custom" ? Number(customValue) || 0 : selected;
  const freqLabel = FREQUENCIES.find((f) => f.value === frequency)?.sublabel ?? "";

  const handleAmountNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (displayAmount < 1) return;
    setError(null);
    setStep("contact");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    fd.set("amount",      String(selected !== "custom" ? selected : 0));
    fd.set("customAmount", String(selected === "custom" ? customValue : 0));
    fd.set("recurring",   recurring ? "true" : "false");
    fd.set("frequency",   recurring ? frequency : "");
    try {
      await initTilopayDonation(fd);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al procesar. Intenta de nuevo.");
      setPending(false);
    }
  };

  // ── Paso 1: monto + tipo ───────────────────────────────────────────────────
  if (step === "amount") {
    return (
      <form onSubmit={handleAmountNext} className="flex flex-col gap-5">
        {/* Toggle única / recurrente */}
        <div className="flex rounded-xl border border-border overflow-hidden">
          <button
            type="button"
            onClick={() => setRecurring(false)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2.5 text-[0.875rem] font-display font-700 transition-colors",
              !recurring ? "bg-gold text-bg-base" : "bg-bg-raised text-text-secondary hover:text-text-primary"
            )}
          >
            <Zap size={14} strokeWidth={2} aria-hidden /> Única vez
          </button>
          <button
            type="button"
            onClick={() => setRecurring(true)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2.5 text-[0.875rem] font-display font-700 transition-colors border-l border-border",
              recurring ? "bg-gold text-bg-base" : "bg-bg-raised text-text-secondary hover:text-text-primary"
            )}
          >
            <Repeat size={14} strokeWidth={2} aria-hidden /> Recurrente
          </button>
        </div>

        {/* Frecuencia */}
        {recurring && (
          <div className="flex flex-col gap-2">
            <p className="text-label text-text-muted text-[0.6875rem]">Frecuencia de donación</p>
            <div className="flex gap-2">
              {FREQUENCIES.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setFrequency(f.value)}
                  className={cn(
                    "flex-1 flex flex-col items-center py-2.5 rounded-xl border text-center transition-colors",
                    frequency === f.value
                      ? "border-gold bg-gold/5 text-gold"
                      : "border-border text-text-secondary hover:border-border-gold hover:text-text-primary"
                  )}
                >
                  <span className="font-display font-700 text-[0.875rem]">{f.label}</span>
                  <span className="text-[0.6875rem] text-text-muted mt-0.5">{f.sublabel}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Presets */}
        <div className="flex flex-col gap-2">
          <p className="text-label text-text-muted text-[0.6875rem]">
            {recurring ? `Monto (USD) · ${freqLabel}` : "Selecciona o ingresa un monto (USD)"}
          </p>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => { setSelected(amount); setCustomValue(""); }}
                className={cn(
                  "px-4 py-2 rounded-full border font-display font-700 text-[0.875rem] transition-colors",
                  selected === amount
                    ? "bg-gold text-bg-base border-gold"
                    : "border-border text-text-secondary hover:border-border-gold hover:text-gold"
                )}
              >
                B/. {amount}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setSelected("custom")}
              className={cn(
                "px-4 py-2 rounded-full border font-display font-700 text-[0.875rem] transition-colors",
                selected === "custom"
                  ? "bg-gold text-bg-base border-gold"
                  : "border-border text-text-secondary hover:border-border-gold hover:text-gold"
              )}
            >
              Otro monto
            </button>
          </div>

          {selected === "custom" && (
            <div className="relative mt-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-display font-700 text-text-muted text-[0.9375rem]">
                B/.
              </span>
              <input
                type="number" min="1" step="0.01" placeholder="0.00"
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                className={cn(
                  "w-full h-11 pl-12 pr-4 font-body text-[0.9375rem] text-text-primary placeholder:text-text-muted",
                  "bg-bg-raised border border-border rounded-xl",
                  "focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors"
                )}
                aria-label="Monto personalizado"
                autoFocus
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={displayAmount < 1}
          className={cn(
            "flex items-center justify-center gap-2.5 w-full py-3.5 rounded-full",
            "font-display font-700 text-[0.9375rem] tracking-[0.04em]",
            "bg-gold text-bg-base hover:bg-gold-muted transition-all duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {displayAmount >= 1
            ? `Continuar · B/. ${displayAmount.toFixed(2)}${recurring ? ` ${freqLabel}` : ""}`
            : "Selecciona un monto"}
        </button>
      </form>
    );
  }

  // ── Paso 2: datos de contacto ──────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Resumen del monto seleccionado */}
      <div className="flex items-center justify-between py-3 px-4 bg-bg-raised rounded-xl border border-border">
        <div className="flex flex-col">
          <span className="text-label text-text-muted text-[0.625rem]">
            {recurring ? `Donación ${freqLabel}` : "Donación única"}
          </span>
          <span className="font-display font-700 text-gold text-[1.125rem]">
            B/. {displayAmount.toFixed(2)}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setStep("amount")}
          className="flex items-center gap-1 text-label text-text-muted hover:text-text-primary transition-colors text-[0.8125rem]"
        >
          <ChevronLeft size={14} strokeWidth={1.75} aria-hidden /> Cambiar
        </button>
      </div>

      <Input
        label="Nombre y apellido"
        name="name"
        placeholder="¿Cómo te llamas?"
        required
        autoComplete="name"
        disabled={pending}
      />
      <Input
        label="Correo electrónico"
        name="email"
        type="email"
        placeholder="tu@correo.com"
        required
        autoComplete="email"
        disabled={pending}
        hint={
          recurring
            ? "Te enviaremos el link para gestionar o cancelar tu suscripción."
            : "Te enviaremos la confirmación de tu donación."
        }
      />

      {error && (
        <p className="text-[0.8125rem] text-red-400 text-center">{error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className={cn(
          "flex items-center justify-center gap-2.5 w-full py-3.5 rounded-full mt-1",
          "font-display font-700 text-[0.9375rem] tracking-[0.04em]",
          "bg-gold text-bg-base hover:bg-gold-muted transition-all duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        {pending ? (
          <Loader2 size={18} strokeWidth={2} className="animate-spin" aria-hidden />
        ) : recurring ? (
          <Repeat size={18} strokeWidth={1.75} aria-hidden />
        ) : (
          <CreditCard size={18} strokeWidth={1.75} aria-hidden />
        )}
        {pending ? "Redirigiendo..." : "Ir a pagar de forma segura"}
      </button>

      <p className="text-label text-text-muted text-[0.625rem] text-center leading-relaxed">
        {recurring
          ? `Se cargará B/. ${displayAmount.toFixed(2)} ${freqLabel} de forma automática. Puedes cancelar en cualquier momento.`
          : "Pago seguro procesado por Tilopay. Tu información está protegida."}
      </p>
    </form>
  );
}

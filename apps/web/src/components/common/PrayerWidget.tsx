"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart } from "lucide-react";
import { cn } from "@rdv/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type FormState = "idle" | "submitting" | "success";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function PrayerWidget() {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState<FormState>("idle");

  // Cerrar con Escape
  React.useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleOpen = () => {
    setState("idle");
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("submitting");
    // TODO (Etapa 7): POST /api/forms/prayer-request
    await new Promise((r) => setTimeout(r, 1200));
    setState("success");
  };

  return (
    <>
      {/* ── Botón flotante ──────────────────────────────────────── */}
      <motion.button
        onClick={handleOpen}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5, ease: EASE }}
        aria-label="Pedir oración"
        className={cn(
          "fixed bottom-6 right-6 z-40",
          "flex items-center gap-2.5 px-4 py-3 rounded-full shadow-lg shadow-black/40",
          "bg-gold text-bg-base",
          "font-display font-700 text-[0.875rem] tracking-[0.03em]",
          "hover:bg-gold-muted transition-colors duration-200",
          "focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
        )}
      >
        <Heart size={16} strokeWidth={2} aria-hidden />
        <span className="hidden sm:inline">Pedir oración</span>
      </motion.button>

      {/* ── Modal ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="prayer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.25 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden
            />

            {/* Panel */}
            <motion.div
              key="prayer-panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby="prayer-modal-title"
              initial={{ opacity: 0, y: "100%", scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: EASE } }}
              exit={{ opacity: 0, y: "100%", transition: { duration: 0.3, ease: "easeIn" } }}
              className={cn(
                "fixed bottom-0 left-0 right-0 z-50",
                "sm:inset-auto sm:bottom-6 sm:right-6 sm:left-auto sm:w-full sm:max-w-md",
                "bg-bg-surface border border-border",
                "rounded-t-3xl sm:rounded-3xl",
                "shadow-2xl shadow-black/60",
                "flex flex-col"
              )}
            >
              {/* Header del modal */}
              <div className="flex items-start justify-between p-6 pb-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gold/10 border border-border-gold flex items-center justify-center">
                      <Heart size={14} strokeWidth={2} className="text-gold" aria-hidden />
                    </div>
                    <h2 id="prayer-modal-title" className="font-display font-700 text-text-primary text-[1.1875rem]">
                      Pide tu oración
                    </h2>
                  </div>
                  <p className="font-body text-[0.875rem] text-text-secondary leading-snug mt-1 max-w-[32ch]">
                    Nos importa lo que estás viviendo. Oraremos por ti.
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-text-muted hover:text-text-primary transition-colors p-1 -mr-1 shrink-0"
                  aria-label="Cerrar"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              {/* Línea decorativa */}
              <div className="h-[1px] bg-gradient-to-r from-gold/40 via-gold/20 to-transparent mx-6" aria-hidden />

              {/* Contenido */}
              <div className="p-6 pt-5">
                {state === "success" ? (
                  <SuccessState onClose={() => setOpen(false)} />
                ) : (
                  <PrayerForm state={state} onSubmit={handleSubmit} />
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Formulario ────────────────────────────────────────────────────────────────

function PrayerForm({
  state,
  onSubmit,
}: {
  state: FormState;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      <input type="text" name="_hp_name" className="hidden" tabIndex={-1} aria-hidden />

      <Input
        label="Tu nombre"
        name="name"
        placeholder="¿Cómo te llamas?"
        required
        disabled={state === "submitting"}
      />

      <Textarea
        label="Tu petición de oración"
        name="request"
        placeholder="Cuéntanos cómo podemos orar por ti..."
        rows={4}
        required
        disabled={state === "submitting"}
      />

      <p className="text-label text-text-muted text-[0.625rem] leading-relaxed">
        Tu petición es confidencial. Solo el equipo pastoral tendrá acceso a ella.
      </p>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={state === "submitting"}
        className="w-full"
      >
        {state === "submitting" ? "Enviando..." : "Enviar petición"}
      </Button>
    </form>
  );
}

// ── Estado de éxito ───────────────────────────────────────────────────────────

function SuccessState({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center gap-5 py-4 text-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 15 } }}
        className="w-14 h-14 rounded-full bg-gold/10 border border-border-gold flex items-center justify-center"
      >
        <Heart size={22} strokeWidth={2} className="text-gold" aria-hidden />
      </motion.div>

      <div className="flex flex-col gap-2">
        <h3 className="font-display font-700 text-text-primary text-[1.125rem]">
          Recibimos tu oración
        </h3>
        <p className="font-body text-[0.9375rem] text-text-secondary leading-relaxed max-w-[30ch] mx-auto">
          Nuestro equipo pastoral orará por ti. No estás solo.
        </p>
        <p className="font-body text-[0.8125rem] text-text-muted italic mt-1">
          "El Señor está cerca de los quebrantados de corazón."
          <br />
          <span className="text-gold not-italic text-label">Salmos 34:18</span>
        </p>
      </div>

      <Button variant="outline" onClick={onClose} className="mt-1">
        Cerrar
      </Button>
    </div>
  );
}

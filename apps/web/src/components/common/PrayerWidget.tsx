"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ChevronDown, Search } from "lucide-react";
import { cn } from "@rdv/utils";
import { allCountries } from "country-telephone-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitPrayerRequest } from "@/app/actions/forms";

type FormState = "idle" | "submitting" | "success";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ── Lista de países ────────────────────────────────────────────────────────────
// priority === 0 es la entrada principal por país (evita duplicados como US/CA con +1).
// Solo limpiamos paréntesis con texto nativo no-ASCII (ej. árabe, chino) pero
// conservamos aclaraciones en ASCII como "(DRC)" o "(Kinshasa)".
const COUNTRIES: { name: string; iso2: string; dialCode: string }[] = allCountries
  .filter((c) => c.priority === 0)
  .map((c) => ({
    name: c.name.replace(/\s*\([^)]*[^\x00-\x7F][^)]*\)\s*/g, "").trim(),
    iso2: c.iso2,
    dialCode: `+${c.dialCode}`,
  }))
  .sort((a, b) => a.name.localeCompare(b.name, "es"));

// ── Combobox de países ────────────────────────────────────────────────────────

interface CountryComboboxProps {
  value: string;
  onChange: (country: { name: string; iso2: string; dialCode: string } | null) => void;
  disabled?: boolean;
}

function CountryCombobox({ value, onChange, disabled }: CountryComboboxProps) {
  const [query, setQuery] = React.useState(value);
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const filtered = query.trim()
    ? COUNTRIES.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase())
      )
    : COUNTRIES;

  // Cerrar al hacer clic fuera
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        // Si el texto no coincide con ningún país, limpiar selección
        const match = COUNTRIES.find((c) => c.name === query);
        if (!match) {
          setQuery("");
          onChange(null);
        }
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [query, onChange]);

  const select = (country: { name: string; iso2: string; dialCode: string }) => {
    setQuery(country.name);
    onChange(country);
    setOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onChange(null);
    setOpen(true);
  };

  return (
    <div ref={containerRef} className="flex flex-col gap-1.5">
      <label htmlFor="country-input" className="text-label text-text-secondary">
        País <span className="text-text-muted font-normal">(opcional)</span>
      </label>
      <div className="relative">
        <Search
          size={15}
          strokeWidth={1.5}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
          aria-hidden
        />
        <input
          ref={inputRef}
          id="country-input"
          name="country"
          type="text"
          autoComplete="off"
          value={query}
          placeholder="Busca tu país..."
          disabled={disabled}
          onChange={handleInputChange}
          onFocus={() => setOpen(true)}
          className={cn(
            "w-full h-11 pl-9 pr-10",
            "font-body text-[0.9375rem] text-text-primary placeholder:text-text-muted",
            "bg-bg-raised border border-border rounded-xl",
            "focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30",
            "disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
          )}
          aria-expanded={open}
          aria-autocomplete="list"
          aria-controls="country-listbox"
        />
        <ChevronDown
          size={15}
          strokeWidth={1.5}
          className={cn(
            "absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none transition-transform duration-200",
            open && "rotate-180"
          )}
          aria-hidden
        />

        <AnimatePresence>
          {open && filtered.length > 0 && (
            <motion.ul
              id="country-listbox"
              role="listbox"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.15 }}
              className={cn(
                "absolute z-50 left-0 right-0 top-full mt-1",
                "max-h-52 overflow-y-auto",
                "bg-bg-surface border border-border rounded-xl",
                "shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
              )}
            >
              {filtered.map((country) => (
                <li
                  key={country.iso2}
                  role="option"
                  aria-selected={query === country.name}
                  onMouseDown={() => select(country)}
                  className={cn(
                    "flex items-center justify-between px-4 py-2.5 cursor-pointer",
                    "font-body text-[0.875rem] transition-colors duration-100",
                    query === country.name
                      ? "text-gold bg-gold/5"
                      : "text-text-secondary hover:text-text-primary hover:bg-bg-raised"
                  )}
                >
                  <span>{country.name}</span>
                  <span className="text-text-muted text-[0.8125rem] tabular-nums">
                    {country.dialCode}
                  </span>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Widget principal ──────────────────────────────────────────────────────────

export function PrayerWidget() {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState<FormState>("idle");

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
    try {
      await submitPrayerRequest(new FormData(e.currentTarget));
      setState("success");
    } catch {
      setState("idle");
    }
  };

  return (
    <>
      <motion.button
        onClick={handleOpen}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5, ease: EASE }}
        aria-label="Pedir oración"
        style={{ bottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
        className={cn(
          "fixed right-6 z-40",
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

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="prayer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.25 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden
            />

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

              <div className="h-[1px] bg-gradient-to-r from-gold/40 via-gold/20 to-transparent mx-6" aria-hidden />

              <div className="p-6 pt-5 overflow-y-auto">
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
  const [phoneCode, setPhoneCode] = React.useState("");
  const [selectedCountry, setSelectedCountry] = React.useState<{ name: string; iso2: string; dialCode: string } | null>(null);

  const handleCountryChange = (country: { name: string; iso2: string; dialCode: string } | null) => {
    setSelectedCountry(country);
    if (country) setPhoneCode(country.dialCode);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      <input type="text" name="_hp_name" className="hidden" tabIndex={-1} aria-hidden />
      {/* País oculto para el submit */}
      <input type="hidden" name="country" value={selectedCountry?.name ?? ""} />

      <Input
        label="Nombre y apellido"
        name="name"
        placeholder="¿Cómo te llamas?"
        required
        disabled={state === "submitting"}
      />

      <CountryCombobox
        value={selectedCountry?.name ?? ""}
        onChange={handleCountryChange}
        disabled={state === "submitting"}
      />

      {/* Teléfono — código auto-llenado al elegir país */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="phone" className="text-label text-text-secondary">
          Teléfono <span className="text-text-muted font-normal">(opcional)</span>
        </label>
        <div className="flex gap-2">
          <input
            id="phone-code"
            name="phoneCode"
            type="text"
            value={phoneCode}
            onChange={(e) => setPhoneCode(e.target.value)}
            placeholder="+507"
            disabled={state === "submitting"}
            className={cn(
              "w-[5.5rem] h-11 px-3 shrink-0",
              "font-body text-[0.9375rem] text-text-primary placeholder:text-text-muted",
              "bg-bg-raised border border-border rounded-xl",
              "focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30",
              "disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
            )}
            aria-label="Código de país"
          />
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="6000-0000"
            disabled={state === "submitting"}
            className={cn(
              "flex-1 h-11 px-4",
              "font-body text-[0.9375rem] text-text-primary placeholder:text-text-muted",
              "bg-bg-raised border border-border rounded-xl",
              "focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30",
              "disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
            )}
            aria-label="Número de teléfono"
          />
        </div>
      </div>

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

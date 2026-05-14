"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2, XCircle } from "lucide-react";
import { cn } from "@rdv/utils";
import { cancelDonation } from "./actions";

interface CancelButtonProps {
  donationId: string;
  token: string;
}

export function CancelButton({ donationId, token }: CancelButtonProps) {
  const router = useRouter();
  const [confirming, setConfirming] = React.useState(false);
  const [pending, setPending]       = React.useState(false);
  const [error, setError]           = React.useState<string | null>(null);

  const handleCancel = async () => {
    setPending(true);
    setError(null);
    try {
      await cancelDonation(donationId, token);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al cancelar. Intenta de nuevo.");
      setPending(false);
      setConfirming(false);
    }
  };

  if (!confirming) {
    return (
      <button
        onClick={() => setConfirming(true)}
        className={cn(
          "flex items-center justify-center gap-2 w-full py-3 rounded-full border border-red-700",
          "font-display font-700 text-[0.875rem] text-red-400",
          "hover:bg-red-900/20 transition-colors"
        )}
      >
        <XCircle size={16} strokeWidth={1.75} aria-hidden />
        Cancelar suscripción
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="font-body text-[0.875rem] text-text-secondary text-center">
        ¿Estás seguro? Esta acción no se puede deshacer.
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => setConfirming(false)}
          disabled={pending}
          className={cn(
            "flex-1 py-2.5 rounded-full border border-border",
            "font-display font-700 text-[0.875rem] text-text-secondary",
            "hover:border-border-gold hover:text-text-primary transition-colors",
            "disabled:opacity-50"
          )}
        >
          Mantener
        </button>
        <button
          onClick={handleCancel}
          disabled={pending}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full",
            "font-display font-700 text-[0.875rem]",
            "bg-red-700 text-white hover:bg-red-600 transition-colors",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {pending ? (
            <Loader2 size={15} strokeWidth={2} className="animate-spin" aria-hidden />
          ) : (
            <XCircle size={15} strokeWidth={1.75} aria-hidden />
          )}
          {pending ? "Cancelando..." : "Sí, cancelar"}
        </button>
      </div>
      {error && (
        <p className="text-[0.8125rem] text-red-400 text-center">{error}</p>
      )}
    </div>
  );
}

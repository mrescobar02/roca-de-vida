import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};
import { Heart, AlertTriangle, CheckCircle } from "lucide-react";
import { Container } from "@/components/common/Container";
import { CancelButton } from "./CancelButton";

const CMS_URL     = process.env.NEXT_PUBLIC_CMS_URL!;
const PAYLOAD_KEY = process.env.PAYLOAD_API_KEY!;

const FREQ_LABELS: Record<string, string> = {
  weekly: "semanal", monthly: "mensual", yearly: "anual",
};

async function getDonationByToken(token: string) {
  const res = await fetch(
    `${CMS_URL}/api/donations?where[cancellationToken][equals]=${encodeURIComponent(token)}&limit=1&depth=0`,
    {
      headers: { Authorization: `API-Key ${PAYLOAD_KEY}` },
      cache: "no-store",
    }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data?.docs?.[0] ?? null;
}

type PageProps = { searchParams: Promise<{ token?: string }> };

export default async function GestionarPage({ searchParams }: PageProps) {
  const { token } = await searchParams;

  if (!token) notFound();

  const donation = await getDonationByToken(token);
  if (!donation) notFound();

  const isCancelled  = donation.status === "cancelled";
  const isRecurring  = donation.type   === "recurring";
  const freqLabel    = FREQ_LABELS[donation.frequency] ?? "";

  return (
    <Container size="narrow" className="pt-40 pb-24 flex flex-col gap-8">

      {/* Header */}
      <div className="flex flex-col items-center text-center gap-3">
        <div className="w-14 h-14 rounded-full bg-gold/10 border border-border-gold flex items-center justify-center">
          <Heart size={22} strokeWidth={1.5} className="text-gold" aria-hidden />
        </div>
        <h1 className="font-display font-700 text-text-primary text-[1.75rem]">
          Gestionar donación
        </h1>
      </div>

      {/* Card con detalle */}
      <div className="bg-bg-surface border border-border rounded-2xl p-6 flex flex-col gap-5">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
          <div className="flex flex-col gap-0.5">
            <dt className="text-label text-text-muted text-[0.625rem]">Donante</dt>
            <dd className="font-body text-[0.9375rem] text-text-primary font-medium">
              {donation.name || donation.email}
            </dd>
          </div>
          <div className="flex flex-col gap-0.5">
            <dt className="text-label text-text-muted text-[0.625rem]">Monto</dt>
            <dd className="font-display font-700 text-gold text-[1.125rem]">
              B/. {Number(donation.amount).toFixed(2)}
              {isRecurring && freqLabel && (
                <span className="font-body font-normal text-text-muted text-[0.8125rem] ml-1">
                  · {freqLabel}
                </span>
              )}
            </dd>
          </div>
          <div className="flex flex-col gap-0.5">
            <dt className="text-label text-text-muted text-[0.625rem]">Tipo</dt>
            <dd className="font-body text-[0.9375rem] text-text-primary">
              {isRecurring ? "Recurrente" : "Única vez"}
            </dd>
          </div>
          <div className="flex flex-col gap-0.5">
            <dt className="text-label text-text-muted text-[0.625rem]">Estado</dt>
            <dd className="font-body text-[0.9375rem] text-text-primary">
              {isCancelled ? (
                <span className="text-red-400">Cancelada</span>
              ) : donation.status === "active" ? (
                <span className="text-emerald-400">Activa</span>
              ) : (
                donation.status
              )}
            </dd>
          </div>
        </dl>

        {/* Estado: ya cancelada */}
        {isCancelled && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-bg-raised border border-border">
            <CheckCircle size={18} strokeWidth={1.5} className="text-emerald-400 shrink-0 mt-0.5" aria-hidden />
            <div className="flex flex-col gap-0.5">
              <p className="font-display font-700 text-text-primary text-[0.9375rem]">
                Esta donación ya fue cancelada
              </p>
              <p className="font-body text-[0.875rem] text-text-muted">
                No se realizarán más cargos. Gracias por haber apoyado a Roca de Vida.
              </p>
            </div>
          </div>
        )}

        {/* Estado: activa → mostrar opción de cancelar */}
        {!isCancelled && isRecurring && (
          <div className="flex flex-col gap-4 pt-2 border-t border-border">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-bg-raised border border-border">
              <AlertTriangle size={18} strokeWidth={1.5} className="text-gold shrink-0 mt-0.5" aria-hidden />
              <p className="font-body text-[0.875rem] text-text-secondary leading-relaxed">
                Al cancelar, no se realizarán más cargos a partir del próximo ciclo.
                Los pagos ya procesados no son reembolsables.
              </p>
            </div>
            <CancelButton donationId={donation.id} token={token} />
          </div>
        )}

        {/* Pago único completado */}
        {!isCancelled && !isRecurring && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-bg-raised border border-border">
            <CheckCircle size={18} strokeWidth={1.5} className="text-emerald-400 shrink-0 mt-0.5" aria-hidden />
            <p className="font-body text-[0.875rem] text-text-secondary">
              Este fue un pago único. No hay suscripción activa que gestionar.
            </p>
          </div>
        )}
      </div>

      {/* Fallback: contacto */}
      <p className="text-center font-body text-[0.875rem] text-text-muted leading-relaxed">
        ¿Necesitas ayuda? Escríbenos a{" "}
        <a href="mailto:donaciones@rocadevidapanama.com" className="text-gold hover:underline">
          donaciones@rocadevidapanama.com
        </a>
      </p>

      <div className="text-center">
        <Link href="/" className="font-body text-[0.9375rem] text-text-muted hover:text-text-primary transition-colors">
          ← Volver al inicio
        </Link>
      </div>
    </Container>
  );
}

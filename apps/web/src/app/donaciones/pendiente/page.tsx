import Link from "next/link";
import { Clock, Heart } from "lucide-react";
import { Container } from "@/components/common/Container";

export default async function DonacionPendientePage({
  searchParams,
}: {
  searchParams: Promise<{ monto?: string }>;
}) {
  const { monto } = await searchParams;

  return (
    <Container size="narrow" className="pt-40 pb-24 flex flex-col items-center text-center gap-6">
      <div className="w-16 h-16 rounded-full bg-gold/10 border border-border-gold flex items-center justify-center">
        <Clock size={26} strokeWidth={1.5} className="text-gold" aria-hidden />
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="font-display font-700 text-text-primary text-[1.75rem]">
          Integración en proceso
        </h1>
        {monto && (
          <p className="font-body text-[1rem] text-text-secondary">
            Monto seleccionado: <span className="text-gold font-medium">B/. {Number(monto).toFixed(2)}</span>
          </p>
        )}
        <p className="font-body text-[1rem] text-text-secondary leading-relaxed max-w-[40ch] mx-auto">
          El pago con tarjeta estará disponible pronto. Por ahora puedes donar por Yappy o transferencia bancaria.
        </p>
      </div>
      <div className="flex items-center gap-3 flex-wrap justify-center">
        <Link
          href="/donaciones"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold text-bg-base font-display font-700 text-[0.875rem] hover:bg-gold-muted transition-colors"
        >
          <Heart size={15} strokeWidth={2} aria-hidden />
          Ver otros métodos
        </Link>
        <Link
          href="/"
          className="font-body text-[0.9375rem] text-text-muted hover:text-text-primary transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </Container>
  );
}

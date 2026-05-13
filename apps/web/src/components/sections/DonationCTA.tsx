import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/Container";
import { AnimateIn } from "@/components/common/AnimateIn";

export interface DonationCTAProps {
  heading?: string;
  subheading?: string;
  scripture?: string;
  scriptureRef?: string;
}

export function DonationCTA({
  heading = "Tu generosidad transforma vidas",
  subheading = "Cada donación es una semilla que da fruto en nuestra ciudad. Cuando das, participas en algo que va más allá de un edificio — participas en cambiar destinos eternos.",
  scripture = "Cada uno dé como propuso en su corazón: no con tristeza, ni por necesidad, porque Dios ama al dador alegre.",
  scriptureRef = "2 Corintios 9:7",
}: DonationCTAProps) {
  return (
    <section className="relative overflow-hidden bg-bg-surface">
      {/* Gradiente decorativo */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,204,77,0.12) 0%, transparent 70%)",
        }}
        aria-hidden
      />
      {/* Línea dorada top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" aria-hidden />

      <Container section size="narrow" className="relative z-10 flex flex-col items-center gap-8 text-center">

        <AnimateIn>
          <div className="flex items-center gap-3 justify-center">
            <div className="gold-line" aria-hidden />
            <p className="text-label text-gold">Donaciones</p>
            <div className="gold-line" aria-hidden />
          </div>
        </AnimateIn>

        <AnimateIn variant="fadeUp" delay={0.1}>
          <h2 className="text-h1 text-text-primary leading-tight">
            {heading}
          </h2>
        </AnimateIn>

        <AnimateIn variant="fadeUp" delay={0.2}>
          <p className="font-body text-[1rem] text-text-secondary leading-relaxed max-w-[52ch]">
            {subheading}
          </p>
        </AnimateIn>

        {/* Verso */}
        <AnimateIn variant="fadeUp" delay={0.3}>
          <figure className="border-l-2 border-gold/50 pl-5 text-left max-w-[44ch]">
            <blockquote className="font-body text-[0.9375rem] text-text-secondary italic leading-relaxed">
              "{scripture}"
            </blockquote>
            <figcaption className="text-label text-gold mt-2 text-[0.6875rem]">
              {scriptureRef}
            </figcaption>
          </figure>
        </AnimateIn>

        <AnimateIn variant="fadeUp" delay={0.4}>
          <Button variant="primary" size="lg" asChild>
            <Link href="/donaciones">Donar ahora</Link>
          </Button>
        </AnimateIn>

      </Container>
    </section>
  );
}

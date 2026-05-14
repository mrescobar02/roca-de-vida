import Link from "next/link";
import Image from "next/image";
import { Button, ButtonArrow } from "@/components/ui/button";
import { Container } from "@/components/common/Container";
import { AnimateIn } from "@/components/common/AnimateIn";

export interface WelcomeSectionProps {
  overline?: string;
  heading: string;
  body: string;
  image: { url: string; alt: string };
  ctaLabel?: string;
  ctaHref?: string;
  pillars?: { label: string }[];
}

const DEFAULT_PILLARS = [
  { label: "Comunidad auténtica" },
  { label: "Crecimiento espiritual" },
  { label: "Impacto en la ciudad" },
];

export function WelcomeSection({
  overline = "Bienvenidos",
  heading = "Un lugar donde todos encuentran su hogar",
  body = "En Roca de Vida Panamá creemos que cada persona tiene un propósito único. Nos reunimos cada semana para adorar, crecer en la Palabra y construir comunidad genuina. No importa de dónde vienes — aquí hay un lugar para ti.",
  image,
  ctaLabel = "Conoce nuestra historia",
  ctaHref = "/nosotros",
  pillars = DEFAULT_PILLARS,
}: WelcomeSectionProps) {
  return (
    <section className="bg-bg-base overflow-hidden">
      <Container section className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Imagen — debajo del texto en mobile, izquierda en desktop */}
        <AnimateIn variant="fadeRight" amount={0.2} className="order-2 md:order-1">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-bg-raised">
            <Image
              src={image.url}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top"
            />
            {/* Marco decorativo desplazado */}
            <div
              className="absolute -bottom-4 -right-4 w-24 h-24 border border-gold/20 rounded-2xl pointer-events-none"
              aria-hidden
            />
          </div>
        </AnimateIn>

        {/* Texto — primero en mobile, derecha en desktop */}
        <AnimateIn variant="fadeLeft" amount={0.2} className="flex flex-col gap-6 order-1 md:order-2">
          {/* Línea dorada + overline */}
          <div className="flex items-center gap-3">
            <div className="gold-line shrink-0" aria-hidden />
            <p className="text-label text-gold">{overline}</p>
          </div>

          <h2 className="text-h1 text-text-primary leading-tight">
            {heading}
          </h2>

          <p className="font-body text-[1rem] text-text-secondary leading-relaxed">
            {body}
          </p>

          {/* Pilares */}
          <div className="flex flex-col gap-3 mt-2">
            {pillars.map((p) => (
              <div key={p.label} className="flex items-center gap-3">
                <span className="text-gold text-[0.625rem]" aria-hidden>✦</span>
                <span className="font-body text-[0.9375rem] text-text-secondary">{p.label}</span>
              </div>
            ))}
          </div>

          <Button variant="ghost" size="lg" className="group self-start mt-2" asChild>
            <Link href={ctaHref}>
              {ctaLabel} <ButtonArrow />
            </Link>
          </Button>
        </AnimateIn>

      </Container>
    </section>
  );
}

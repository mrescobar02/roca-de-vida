import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScriptureQuote } from "@/components/common/ScriptureQuote";
import { AnimateIn, StaggerContainer, AnimateInItem } from "@/components/common/AnimateIn";
import { cn } from "@rdv/utils";

export const metadata: Metadata = {
  title: "Nuestra Historia | Roca de Vida Panamá",
  description: "Cómo comenzó Roca de Vida Panamá y el camino recorrido hasta hoy.",
};

const MILESTONES = [
  {
    period: "Los comienzos",
    heading: "Una visión, unas pocas familias",
    body: "Roca de Vida Panamá nació de un grupo pequeño de creyentes con una convicción: que Panamá necesitaba una iglesia que predicara la Palabra sin compromisos y que amara a las personas sin reservas. En una sala de hogar, la visión tomó forma.",
  },
  {
    period: "Crecimiento",
    heading: "De una sala a un templo",
    body: "Lo que comenzó en un salón pequeño fue creciendo semana a semana. Familias enteras encontraron un hogar espiritual. Jóvenes descubrieron su propósito. La iglesia no era solo un lugar de reunión — era una familia en expansión.",
  },
  {
    period: "Ministerios",
    heading: "La iglesia se multiplica",
    body: "A medida que la congregación creció, también lo hicieron los ministerios. Hombres, mujeres, jóvenes, niños — cada generación encontró su espacio. Los grupos celulares llevaron la iglesia a cada sector de la ciudad.",
  },
  {
    period: "Hoy",
    heading: "Arraigados, creciendo, enviados",
    body: "Hoy Roca de Vida es una iglesia con múltiples ministerios activos, células por toda la ciudad y un impacto creciente en Panamá. Pero lo más importante sigue siendo lo mismo: la Palabra, la comunidad y el evangelio.",
  },
];

export default function HistoriaPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative bg-bg-base overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 100% 60% at 50% 0%, rgba(198,168,103,0.07) 0%, transparent 65%)" }}
          aria-hidden
        />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" aria-hidden />

        <Container className="pt-36 pb-20 relative z-10">
          <AnimateIn variant="fadeUp" trigger="mount" delay={0.1}>
            <p className="text-label text-gold mb-4">Nosotros</p>
            <h1 className="text-display text-text-primary leading-none max-w-[14ch]">
              Nuestra<br />historia
            </h1>
            <p className="text-lead text-text-secondary mt-6 max-w-[46ch]">
              Todo lo que Dios ha hecho desde el primer día hasta hoy. Una historia de fe, obediencia y gracia.
            </p>
          </AnimateIn>
        </Container>
      </section>

      {/* ── Narrativa ─────────────────────────────────────────────── */}
      <section className="bg-bg-base border-t border-border">
        <Container section className="flex flex-col gap-0">
          <StaggerContainer className="flex flex-col" staggerDelay={0.1}>
            {MILESTONES.map(({ period, heading, body }, i) => (
              <AnimateInItem key={period}>
                <div
                  className={cn(
                    "grid md:grid-cols-[200px_1fr] gap-6 md:gap-12 py-12",
                    i < MILESTONES.length - 1 && "border-b border-border"
                  )}
                >
                  {/* Período */}
                  <div className="flex md:flex-col gap-3 md:gap-2 items-center md:items-start">
                    <div className="w-2 h-2 rounded-full bg-gold shrink-0 mt-1 md:mt-2" aria-hidden />
                    <p className="text-label text-gold text-[0.75rem] tracking-[0.12em] uppercase">
                      {period}
                    </p>
                  </div>

                  {/* Contenido */}
                  <div className="flex flex-col gap-3">
                    <h2 className="text-h2 text-text-primary">{heading}</h2>
                    <p className="font-body text-[1rem] text-text-secondary leading-relaxed max-w-[58ch]">
                      {body}
                    </p>
                  </div>
                </div>
              </AnimateInItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* ── Versículo ─────────────────────────────────────────────── */}
      <section className="bg-bg-surface border-t border-border">
        <Container section size="narrow">
          <AnimateIn variant="scaleIn">
            <ScriptureQuote
              text="Mas el camino de los justos es como la luz de la aurora, que va en aumento hasta que el día es perfecto."
              reference="Proverbios 4:18"
              size="large"
              align="center"
            />
          </AnimateIn>
        </Container>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="bg-bg-base border-t border-border">
        <Container section size="narrow" className="flex flex-col items-center gap-5 text-center">
          <AnimateIn variant="fadeUp">
            <SectionHeading
              label="Sé parte"
              heading="La historia continúa"
              subheading="La historia de Roca de Vida no está terminada — se escribe cada semana con cada vida que Dios toca. Tu capítulo puede empezar este domingo."
              align="center"
            />
          </AnimateIn>
          <AnimateIn variant="fadeUp" delay={0.1}>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 font-display font-700 text-gold hover:text-gold-muted transition-colors"
            >
              Visítanos este domingo <span aria-hidden>→</span>
            </Link>
          </AnimateIn>
        </Container>
      </section>

      {/* ── Nav ───────────────────────────────────────────────────── */}
      <section className="bg-bg-surface border-t border-border">
        <Container className="py-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <Link
              href="/nosotros"
              className="flex items-center gap-2 text-label text-text-muted hover:text-gold transition-colors"
            >
              <span aria-hidden>←</span> Quiénes somos
            </Link>
            <Link
              href="/nosotros/creencias"
              className="flex items-center gap-2 text-label text-gold hover:text-gold-muted transition-colors"
            >
              Lo que creemos <span aria-hidden>→</span>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

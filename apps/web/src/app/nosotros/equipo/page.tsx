import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { AnimateIn, StaggerContainer, AnimateInItem } from "@/components/common/AnimateIn";
import { StaffCard } from "@/components/cards";
import { getStaff, richTextToPlain } from "@/lib/payload/client";

export const metadata: Metadata = {
  title: "Equipo Pastoral | Roca de Vida Panamá",
  description: "Conoce a los pastores y líderes que guían Roca de Vida Panamá.",
};

export const revalidate = 300;

export default async function EquipoPage() {
  const result = await getStaff({ isPastoralTeam: true });
  const pastors = result.docs;

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
              Equipo<br />pastoral
            </h1>
            <p className="text-lead text-text-secondary mt-6 max-w-[46ch]">
              Personas llamadas a servir, comprometidas con la Palabra y con las personas que Dios pone en su camino.
            </p>
          </AnimateIn>
        </Container>
      </section>

      {/* ── Pastores ──────────────────────────────────────────────── */}
      <section className="bg-bg-base border-t border-border">
        <Container section className="flex flex-col gap-10">
          <AnimateIn>
            <SectionHeading
              label="Pastores"
              heading="Quienes nos guían"
            />
          </AnimateIn>

          <StaggerContainer
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            staggerDelay={0.12}
          >
            {pastors.map((pastor) => (
              <AnimateInItem key={pastor.id}>
                <StaffCard
                  name={pastor.name}
                  title={pastor.title}
                  photo={
                    pastor.photo
                      ? { url: pastor.photo.url, alt: pastor.photo.alt ?? pastor.name }
                      : undefined
                  }
                  bio={richTextToPlain(pastor.bio)}
                />
              </AnimateInItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="bg-bg-surface border-t border-border">
        <Container section size="narrow" className="flex flex-col items-center gap-5 text-center">
          <AnimateIn variant="fadeUp">
            <h2 className="text-h2 text-text-primary">¿Sientes el llamado a servir?</h2>
            <p className="font-body text-[1rem] text-text-secondary mt-3 max-w-[44ch] mx-auto">
              Si tienes el deseo de ser parte del equipo o estás en proceso de discernimiento vocacional, queremos acompañarte.
            </p>
          </AnimateIn>
          <AnimateIn variant="fadeUp" delay={0.1}>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 font-display font-700 text-gold hover:text-gold-muted transition-colors"
            >
              Contáctanos <span aria-hidden>→</span>
            </Link>
          </AnimateIn>
        </Container>
      </section>

      {/* ── Nav ───────────────────────────────────────────────────── */}
      <section className="bg-bg-base border-t border-border">
        <Container className="py-8">
          <Link
            href="/nosotros"
            className="flex items-center gap-2 text-label text-text-muted hover:text-gold transition-colors"
          >
            <span aria-hidden>←</span> Quiénes somos
          </Link>
        </Container>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { MinistryCard } from "@/components/cards";
import { StaggerContainer, AnimateInItem, AnimateIn } from "@/components/common/AnimateIn";
import { MINISTRIES_LIST } from "@/lib/mock/ministries";

export const metadata: Metadata = {
  title: "Ministerios | Roca de Vida Panamá",
  description: "Descubre los ministerios de Roca de Vida Panamá. Hay un lugar para cada etapa de vida.",
};

export default function MinistriosPage() {
  return (
    <>
      {/* Page hero */}
      <section className="relative bg-bg-base overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: "radial-gradient(ellipse 100% 60% at 50% 0%, rgba(255,204,77,0.1) 0%, transparent 70%)" }}
          aria-hidden
        />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" aria-hidden />

        <Container className="pt-32 pb-16 relative z-10">
          <AnimateIn variant="fadeUp">
            <SectionHeading
              label="Comunidad"
              heading="Nuestros ministerios"
              subheading="Cada ministerio es un espacio diseñado para que encuentres comunidad, crezcas en la fe y descubras tu propósito. Hay un lugar para ti."
              align="center"
            />
          </AnimateIn>
        </Container>
      </section>

      {/* Grid de ministerios */}
      <section className="bg-bg-base">
        <Container section>
          <StaggerContainer
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
            staggerDelay={0.06}
          >
            {MINISTRIES_LIST.map((ministry) => (
              <AnimateInItem key={ministry.slug}>
                <MinistryCard
                  name={ministry.name}
                  slug={ministry.slug}
                  tagline={ministry.tagline}
                  category={ministry.category}
                  heroImage={ministry.heroImage}
                  aspect="portrait"
                />
              </AnimateInItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* CTA inferior */}
      <section className="bg-bg-surface border-t border-border">
        <Container section size="narrow" className="text-center flex flex-col items-center gap-6">
          <AnimateIn variant="fadeUp">
            <h2 className="text-h2 text-text-primary">
              ¿No sabes cuál es tu lugar?
            </h2>
            <p className="font-body text-[1rem] text-text-secondary mt-4 max-w-[44ch] mx-auto">
              Habla con alguien de nuestro equipo y te ayudamos a encontrar la comunidad perfecta para ti.
            </p>
          </AnimateIn>
          <AnimateIn variant="fadeUp" delay={0.15}>
            <a
              href="/contacto"
              className="inline-flex items-center gap-2 font-display font-700 text-gold hover:text-gold-muted transition-colors"
            >
              Contáctanos <span aria-hidden>→</span>
            </a>
          </AnimateIn>
        </Container>
      </section>
    </>
  );
}

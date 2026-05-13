import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { Container } from "@/components/common/Container";
import { ScriptureQuote } from "@/components/common/ScriptureQuote";
import { SectionHeading } from "@/components/common/SectionHeading";
import { AnimateIn, StaggerContainer, AnimateInItem } from "@/components/common/AnimateIn";
import { StaffCard, EventCard } from "@/components/cards";
import { MinistryInterestForm } from "@/components/sections/MinistryInterestForm";
import { MINISTRIES_DATA, MINISTRY_SLUGS } from "@/lib/mock/ministries";
import { UPCOMING_EVENTS } from "@/lib/mock/events";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  // TODO: Replace with async fetch to Payload CMS
  return MINISTRY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const ministry = MINISTRIES_DATA[slug];
  if (!ministry) return {};
  return {
    title: `${ministry.name} | Roca de Vida Panamá`,
    description: ministry.tagline,
  };
}

export default async function MinistryPage({ params }: PageProps) {
  const { slug } = await params;
  const ministry = MINISTRIES_DATA[slug];
  if (!ministry) notFound();

  const { accent } = ministry;
  const ministryEvents = UPCOMING_EVENTS.filter((e) => e.ministry?.slug === slug).slice(0, 3);

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={ministry.heroImage.url}
            alt={ministry.heroImage.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Overlay base */}
          <div className="absolute inset-0 overlay-hero" aria-hidden />
          {/* Overlay de color de acento del ministerio */}
          <div
            className="absolute inset-0 opacity-40 mix-blend-multiply"
            style={{ backgroundColor: accent }}
            aria-hidden
          />
          {/* Gradiente inferior para legibilidad del texto */}
          <div
            className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-bg-base to-transparent"
            aria-hidden
          />
        </div>

        <Container className="relative z-10 pb-12 pt-40">
          <AnimateIn variant="fadeUp" trigger="mount" delay={0.15}>
            <p className="text-label mb-3" style={{ color: accent === "#ffb347" ? accent : "var(--color-gold)" }}>
              {ministry.category}
            </p>
            <h1 className="text-display text-text-primary leading-none max-w-[14ch]">
              {ministry.name}
            </h1>
            <p className="text-lead text-text-secondary mt-4 max-w-[42ch]">
              {ministry.tagline}
            </p>
          </AnimateIn>

          {ministry.schedule && (
            <AnimateIn variant="fadeUp" trigger="mount" delay={0.3}>
              <div className="flex items-center gap-2 mt-6">
                <Calendar size={14} strokeWidth={1.5} className="text-gold shrink-0" aria-hidden />
                <span className="font-body text-[0.9375rem] text-text-secondary">{ministry.schedule}</span>
              </div>
            </AnimateIn>
          )}
        </Container>
      </section>

      {/* Línea de acento */}
      <div className="h-[3px] w-full" style={{ backgroundColor: accent }} aria-hidden />

      {/* ── Misión & Visión ──────────────────────────────────────── */}
      <section className="bg-bg-surface">
        <Container section className="grid md:grid-cols-2 gap-10 lg:gap-20">
          <AnimateIn variant="fadeRight">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="h-[2px] w-8 shrink-0" style={{ backgroundColor: accent }} aria-hidden />
                <p className="text-label text-gold">Misión</p>
              </div>
              <h2 className="text-h2 text-text-primary">¿Por qué existimos?</h2>
              <p className="font-body text-[1rem] text-text-secondary leading-relaxed">
                {ministry.mission}
              </p>
            </div>
          </AnimateIn>

          <AnimateIn variant="fadeLeft" delay={0.1}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="h-[2px] w-8 shrink-0" style={{ backgroundColor: accent }} aria-hidden />
                <p className="text-label text-gold">Visión</p>
              </div>
              <h2 className="text-h2 text-text-primary">¿Hacia dónde vamos?</h2>
              <p className="font-body text-[1rem] text-text-secondary leading-relaxed">
                {ministry.vision}
              </p>
            </div>
          </AnimateIn>
        </Container>
      </section>

      {/* ── Versículo clave ──────────────────────────────────────── */}
      <section className="bg-bg-base">
        <Container section size="narrow">
          <AnimateIn variant="scaleIn">
            <ScriptureQuote
              text={ministry.keyVerse}
              reference={ministry.keyVerseRef}
              size="large"
              align="center"
            />
          </AnimateIn>
        </Container>
      </section>

      {/* ── Líderes ─────────────────────────────────────────────── */}
      {ministry.leaders.length > 0 && (
        <section className="bg-bg-surface">
          <Container section className="flex flex-col gap-10">
            <AnimateIn>
              <SectionHeading
                label="Equipo"
                heading="Nuestros líderes"
              />
            </AnimateIn>
            <StaggerContainer
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
              staggerDelay={0.1}
            >
              {ministry.leaders.map((leader) => (
                <AnimateInItem key={leader.name}>
                  <StaffCard
                    name={leader.name}
                    title={leader.title}
                    photo={leader.photo}
                    bio={leader.bio}
                  />
                </AnimateInItem>
              ))}
            </StaggerContainer>
          </Container>
        </section>
      )}

      {/* ── Galería placeholder ──────────────────────────────────── */}
      <section className="bg-bg-base">
        <Container section className="flex flex-col gap-8">
          <AnimateIn>
            <SectionHeading
              label="Galería"
              heading="Momentos del ministerio"
            />
          </AnimateIn>
          <AnimateIn variant="fadeUp">
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-bg-raised rounded-2xl border border-border flex items-center justify-center"
                  aria-hidden
                >
                  <span className="text-label text-text-muted text-[0.625rem]">Foto</span>
                </div>
              ))}
            </div>
            <p className="text-label text-text-muted text-[0.75rem] mt-4 text-center">
              Fotografías próximamente
            </p>
          </AnimateIn>
        </Container>
      </section>

      {/* ── Próximos eventos ────────────────────────────────────── */}
      {ministryEvents.length > 0 && (
        <section className="bg-bg-base border-t border-border">
          <Container section className="flex flex-col gap-10">
            <AnimateIn>
              <SectionHeading
                label="Agenda"
                heading="Próximos eventos"
              />
            </AnimateIn>
            <StaggerContainer
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
              staggerDelay={0.1}
            >
              {ministryEvents.map((event) => (
                <AnimateInItem key={event.slug}>
                  <EventCard
                    title={event.title}
                    slug={event.slug}
                    date={event.date}
                    time={event.time}
                    location={event.location}
                    banner={event.banner}
                    ministry={event.ministry}
                  />
                </AnimateInItem>
              ))}
            </StaggerContainer>
            <AnimateIn variant="fadeUp">
              <Link
                href="/eventos"
                className="flex items-center gap-2 text-label text-gold hover:text-gold-muted transition-colors"
              >
                Ver todos los eventos <span aria-hidden>→</span>
              </Link>
            </AnimateIn>
          </Container>
        </section>
      )}

      {/* ── Formulario de interés ────────────────────────────────── */}
      <section className="bg-bg-surface border-t border-border">
        <Container section size="narrow" className="flex flex-col gap-8">
          <AnimateIn>
            <SectionHeading
              label="¿Te interesa?"
              heading={`Quiero ser parte de ${ministry.name}`}
              subheading="Déjanos tus datos y alguien del equipo se pondrá en contacto contigo."
            />
          </AnimateIn>
          <AnimateIn variant="fadeUp" delay={0.1}>
            <MinistryInterestForm
              ministryName={ministry.name}
              ministrySlug={ministry.slug}
            />
          </AnimateIn>
        </Container>
      </section>

      {/* ── Nav a otros ministerios ──────────────────────────────── */}
      <section className="bg-bg-base border-t border-border">
        <Container className="py-8">
          <div className="flex items-center justify-between">
            <Link
              href="/ministerios"
              className="flex items-center gap-2 text-label text-text-muted hover:text-gold transition-colors"
            >
              <span aria-hidden>←</span> Todos los ministerios
            </Link>
            <Link
              href="/grupos"
              className="flex items-center gap-2 text-label text-gold hover:text-gold-muted transition-colors"
            >
              Encontrar un grupo <span aria-hidden>→</span>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

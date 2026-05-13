import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { AnimateIn, StaggerContainer, AnimateInItem } from "@/components/common/AnimateIn";
import { EventCard } from "@/components/cards";
import { MINISTRIES_DATA } from "@/lib/mock/ministries";
import { UPCOMING_EVENTS } from "@/lib/mock/events";

export const metadata: Metadata = {
  title: "Jóvenes | Roca de Vida Panamá",
  description: "Ministerio de Jóvenes de Roca de Vida Panamá — espacios para cada etapa: Prejuvenil, Jóvenes y Jóvenes Adultos.",
};

const YOUTH_SLUGS = ["prejuvenil", "jovenes-teens", "jovenes-adultos"];

const CATEGORIES = [
  {
    slug: "prejuvenil",
    name: "Prejuvenil",
    ageRange: "10 — 14 años",
    description: "Acompañamos a los preadolescentes en la etapa más crítica de su formación, conectándolos con Dios y entre sí antes de entrar a la adolescencia.",
    heroImage: MINISTRIES_DATA.prejuvenil.heroImage,
    accent: "#2d6a4f",
    schedule: MINISTRIES_DATA.prejuvenil.schedule,
  },
  {
    slug: "jovenes-teens",
    name: "Jóvenes",
    ageRange: "15 — 20 años",
    description: "Conectamos a los jóvenes con Dios, con comunidad genuina y con su propósito. Una generación que no se avergüenza del evangelio.",
    heroImage: MINISTRIES_DATA["jovenes-teens"].heroImage,
    accent: "#4a1942",
    schedule: MINISTRIES_DATA["jovenes-teens"].schedule,
  },
  {
    slug: "jovenes-adultos",
    name: "Jóvenes Adultos",
    ageRange: "21 — 29 años",
    description: "Acompañamos a jóvenes adultos en los años más decisivos: vocación, relaciones, fe y propósito. Arraigados en la Palabra.",
    heroImage: MINISTRIES_DATA["jovenes-adultos"].heroImage,
    accent: "#1b4d5a",
    schedule: MINISTRIES_DATA["jovenes-adultos"].schedule,
  },
];

export default function JovenesHubPage() {
  const youthEvents = UPCOMING_EVENTS.filter(
    (e) => e.ministry?.slug && YOUTH_SLUGS.includes(e.ministry.slug)
  ).slice(0, 3);

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative bg-bg-base overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 120% 80% at 60% 40%, #180a18 0%, #0d0d0d 55%, #000 100%)" }}
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{ background: "radial-gradient(ellipse 70% 60% at 40% 90%, rgba(74,25,66,0.6) 0%, transparent 70%)" }}
          aria-hidden
        />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" aria-hidden />

        <Container className="pt-36 pb-20 relative z-10">
          <AnimateIn variant="fadeUp" trigger="mount" delay={0.1}>
            <p className="text-label text-gold mb-4">Ministerios</p>
            <h1 className="text-display text-text-primary leading-none max-w-[14ch]">
              Ministerio<br />de Jóvenes
            </h1>
            <p className="text-lead text-text-secondary mt-6 max-w-[46ch]">
              Un espacio para cada etapa de la juventud. Desde los 10 hasta los 29 años, hay un lugar para ti en Roca de Vida.
            </p>
          </AnimateIn>
        </Container>
      </section>

      {/* ── Categorías ──────────────────────────────────────────── */}
      <section className="bg-bg-base">
        <Container section className="flex flex-col gap-12">
          <AnimateIn>
            <SectionHeading
              label="Etapas"
              heading="Encuentra tu grupo"
              subheading="Cada etapa tiene su propio espacio, líderes y comunidad diseñados específicamente para ella."
            />
          </AnimateIn>

          <StaggerContainer
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            staggerDelay={0.12}
          >
            {CATEGORIES.map((cat) => (
              <AnimateInItem key={cat.slug}>
                <Link
                  href={`/ministerios/${cat.slug}`}
                  className="group relative block h-[440px] overflow-hidden rounded-2xl bg-bg-raised focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
                  aria-label={`${cat.name} — ${cat.ageRange}`}
                >
                  {/* Imagen */}
                  <Image
                    src={cat.heroImage.url}
                    alt={cat.heroImage.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.05]"
                  />

                  {/* Overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/10"
                    aria-hidden
                  />

                  {/* Borde de acento en hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ boxShadow: `inset 0 0 0 2px ${cat.accent}` }}
                    aria-hidden
                  />

                  {/* Contenido */}
                  <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col gap-2.5">
                    {/* Rango de edad */}
                    <span
                      className="inline-flex items-center text-label text-[0.6875rem] px-3 py-1 rounded-full border w-fit tracking-[0.12em]"
                      style={{
                        color: cat.accent,
                        borderColor: `${cat.accent}70`,
                        background: `${cat.accent}25`,
                      }}
                    >
                      {cat.ageRange}
                    </span>

                    <h3 className="font-display font-800 text-text-primary text-[2rem] leading-tight group-hover:text-white transition-colors duration-200">
                      {cat.name}
                    </h3>

                    <p className="font-body text-[0.875rem] text-text-secondary leading-snug line-clamp-2 max-w-[32ch]">
                      {cat.description}
                    </p>

                    {cat.schedule && (
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Calendar size={11} strokeWidth={1.5} className="text-text-muted shrink-0" aria-hidden />
                        <span className="font-body text-[0.75rem] text-text-muted">{cat.schedule}</span>
                      </div>
                    )}

                    <div
                      className="flex items-center gap-1.5 mt-1 text-label text-[0.8125rem]"
                      style={{ color: cat.accent }}
                    >
                      <span>Conocer más</span>
                      <span className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden>→</span>
                    </div>
                  </div>
                </Link>
              </AnimateInItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* ── Próximos eventos ────────────────────────────────────── */}
      {youthEvents.length > 0 && (
        <section className="bg-bg-surface border-t border-border">
          <Container section className="flex flex-col gap-10">
            <AnimateIn>
              <SectionHeading
                label="Agenda"
                heading="Próximos eventos"
                subheading="Actividades, retiros y encuentros del ministerio de jóvenes."
              />
            </AnimateIn>

            <StaggerContainer
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
              staggerDelay={0.1}
            >
              {youthEvents.map((event) => (
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

      {/* ── Nav ─────────────────────────────────────────────────── */}
      <section className="bg-bg-base border-t border-border">
        <Container className="py-8">
          <Link
            href="/ministerios"
            className="flex items-center gap-2 text-label text-text-muted hover:text-gold transition-colors"
          >
            <span aria-hidden>←</span> Todos los ministerios
          </Link>
        </Container>
      </section>
    </>
  );
}

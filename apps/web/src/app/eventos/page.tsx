import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EventCard } from "@/components/cards";
import { AnimateIn, StaggerContainer, AnimateInItem } from "@/components/common/AnimateIn";
import { UPCOMING_EVENTS, PAST_EVENTS } from "@/lib/mock/events";

export const metadata: Metadata = {
  title: "Eventos | Roca de Vida Panamá",
  description: "Próximos eventos y actividades de Roca de Vida Panamá.",
};

export default function EventosPage() {
  const featured = UPCOMING_EVENTS.find((e) => e.isFeatured);
  const rest = UPCOMING_EVENTS.filter((e) => !e.isFeatured);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-bg-base overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,204,77,0.12) 0%, transparent 70%)" }}
          aria-hidden
        />
        <Container className="pt-32 pb-14 relative z-10">
          <AnimateIn variant="fadeUp">
            <SectionHeading
              label="Agenda"
              heading="Próximos eventos"
              subheading="Actividades, retiros, conferencias y más. Siempre hay algo nuevo en Roca de Vida."
            />
          </AnimateIn>
        </Container>
      </section>

      <section className="bg-bg-base">
        <Container section className="flex flex-col gap-14">

          {/* Evento destacado */}
          {featured && (
            <AnimateIn variant="fadeUp" amount={0.15}>
              <div className="flex flex-col gap-3">
                <p className="text-label text-gold">Evento destacado</p>
                <EventCard
                  layout="default"
                  title={featured.title}
                  slug={featured.slug}
                  date={featured.date}
                  time={featured.time}
                  location={featured.location}
                  banner={featured.banner}
                  ministry={featured.ministry}
                  priority
                  className="max-w-lg"
                />
              </div>
            </AnimateIn>
          )}

          {/* Resto de próximos */}
          {rest.length > 0 && (
            <div className="flex flex-col gap-6">
              <AnimateIn>
                <p className="text-label text-text-muted">Todos los eventos próximos</p>
              </AnimateIn>
              <StaggerContainer className="flex flex-col gap-3" staggerDelay={0.08}>
                {rest.map((event) => (
                  <AnimateInItem key={event.slug} variant="fadeRight">
                    <EventCard
                      layout="horizontal"
                      title={event.title}
                      slug={event.slug}
                      date={event.date}
                      endDate={event.endDate}
                      time={event.time}
                      location={event.location}
                      banner={event.banner}
                      ministry={event.ministry}
                    />
                  </AnimateInItem>
                ))}
              </StaggerContainer>
            </div>
          )}

          {/* Eventos pasados */}
          {PAST_EVENTS.length > 0 && (
            <div className="flex flex-col gap-6">
              <AnimateIn>
                <div className="flex items-center gap-4">
                  <p className="text-label text-text-muted">Eventos anteriores</p>
                  <div className="h-[1px] flex-1 bg-border" aria-hidden />
                </div>
              </AnimateIn>
              <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.08}>
                {PAST_EVENTS.map((event) => (
                  <AnimateInItem key={event.slug}>
                    <EventCard
                      title={event.title}
                      slug={event.slug}
                      date={event.date}
                      time={event.time}
                      location={event.location}
                      banner={event.banner}
                      ministry={event.ministry}
                      className="opacity-70 hover:opacity-100 transition-opacity"
                    />
                  </AnimateInItem>
                ))}
              </StaggerContainer>
            </div>
          )}

        </Container>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EventCard } from "@/components/cards";
import { AnimateIn, StaggerContainer, AnimateInItem } from "@/components/common/AnimateIn";
import { getUpcomingEvents, getPastEvents } from "@/lib/payload/client";

export const metadata: Metadata = {
  title: "Eventos | Roca de Vida Panamá",
  description: "Próximos eventos y actividades de Roca de Vida Panamá.",
};

export const revalidate = 60;

export default async function EventosPage() {
  const [upcomingResult, pastResult] = await Promise.all([
    getUpcomingEvents(20),
    getPastEvents(12),
  ]);

  const upcomingEvents = upcomingResult.docs;
  const pastEvents = pastResult.docs;

  const featured = upcomingEvents.find((e) => e.isFeatured) ?? upcomingEvents[0];
  const rest = featured
    ? upcomingEvents.filter((e) => e.id !== featured.id)
    : [];

  function eventBanner(e: typeof upcomingEvents[0]) {
    return { url: e.banner?.url ?? "", alt: e.banner?.alt ?? e.title };
  }
  function eventMinistry(e: typeof upcomingEvents[0]) {
    return e.ministry ? { name: e.ministry.name, slug: e.ministry.slug } : undefined;
  }

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
                  banner={eventBanner(featured)}
                  ministry={eventMinistry(featured)}
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
                      banner={eventBanner(event)}
                      ministry={eventMinistry(event)}
                    />
                  </AnimateInItem>
                ))}
              </StaggerContainer>
            </div>
          )}

          {/* Eventos pasados */}
          {pastEvents.length > 0 && (
            <div className="flex flex-col gap-6">
              <AnimateIn>
                <div className="flex items-center gap-4">
                  <p className="text-label text-text-muted">Eventos anteriores</p>
                  <div className="h-[1px] flex-1 bg-border" aria-hidden />
                </div>
              </AnimateIn>
              <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.08}>
                {pastEvents.map((event) => (
                  <AnimateInItem key={event.slug}>
                    <EventCard
                      title={event.title}
                      slug={event.slug}
                      date={event.date}
                      time={event.time}
                      location={event.location}
                      banner={eventBanner(event)}
                      ministry={eventMinistry(event)}
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

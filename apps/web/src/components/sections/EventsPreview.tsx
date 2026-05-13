import Link from "next/link";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EventCard } from "@/components/cards";
import { AnimateIn, StaggerContainer, AnimateInItem } from "@/components/common/AnimateIn";
import { ButtonArrow } from "@/components/ui/button";

interface Event {
  title: string;
  slug: string;
  date: string;
  endDate?: string;
  time?: string;
  location?: string;
  banner: { url: string; alt: string };
  ministry?: { name: string; slug: string };
}

export interface EventsPreviewProps {
  events: Event[];
}

export function EventsPreview({ events }: EventsPreviewProps) {
  if (!events.length) return null;

  return (
    <section className="bg-bg-surface">
      <Container section className="flex flex-col gap-10">

        <AnimateIn>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <SectionHeading
              label="Próximos eventos"
              heading="No te pierdas nada"
              subheading="Actividades diseñadas para conectar, crecer y servir juntos."
            />
            <Link
              href="/eventos"
              className="flex items-center gap-1.5 text-label text-gold hover:text-gold-muted transition-colors shrink-0 pb-1"
            >
              Ver agenda <ButtonArrow className="inline-block" />
            </Link>
          </div>
        </AnimateIn>

        <StaggerContainer
          className="flex flex-col gap-3"
          staggerDelay={0.08}
        >
          {events.slice(0, 3).map((event) => (
            <AnimateInItem key={event.slug} variant="fadeRight">
              <EventCard
                layout="horizontal"
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

      </Container>
    </section>
  );
}

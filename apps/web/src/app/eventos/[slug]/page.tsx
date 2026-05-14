import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, MapPin, ChevronRight, ExternalLink } from "lucide-react";
import { Container } from "@/components/common/Container";
import { AnimateIn } from "@/components/common/AnimateIn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@rdv/utils";
import {
  getEventBySlug,
  getUpcomingEvents,
  getPastEvents,
  richTextToPlain,
} from "@/lib/payload/client";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const [upcoming, past] = await Promise.all([
    getUpcomingEvents(100),
    getPastEvents(100),
  ]);
  return [...upcoming.docs, ...past.docs].map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getEventBySlug(slug);
  const event = result.docs[0];
  if (!event) return {};
  return {
    title: `${event.title} | Roca de Vida Panamá`,
    description: richTextToPlain(event.description).slice(0, 160),
    openGraph: event.banner ? { images: [{ url: event.banner.url }] } : {},
  };
}

export const revalidate = 60;

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  const result = await getEventBySlug(slug);
  const event = result.docs[0];
  if (!event) notFound();

  const description = richTextToPlain(event.description);
  const isPast = new Date(event.date) < new Date();

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: event.time ? `${event.date}T${to24h(event.time)}-05:00` : event.date,
    ...(event.endDate ? { endDate: event.endDate } : {}),
    description,
    image: event.banner?.url,
    location: {
      "@type": "Place",
      name: event.location ?? "Roca de Vida Panamá",
      address: event.address ?? "Ciudad de Panamá, Panamá",
    },
    organizer: {
      "@type": "Organization",
      name: "Roca de Vida Panamá",
      url: "https://rocadevidapanama.com",
    },
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }} />

      {/* Breadcrumb */}
      <section className="bg-bg-base border-b border-border">
        <Container className="py-4">
          <nav className="flex items-center gap-2 text-label text-text-muted text-[0.75rem]" aria-label="Breadcrumb">
            <Link href="/eventos" className="hover:text-gold transition-colors">Eventos</Link>
            <ChevronRight size={12} aria-hidden />
            <span className="text-text-secondary truncate">{event.title}</span>
          </nav>
        </Container>
      </section>

      {/* Banner hero */}
      {event.banner && (
        <section className="relative bg-bg-base">
          <div className="relative aspect-[21/9] max-h-[480px] overflow-hidden">
            <Image
              src={event.banner.url}
              alt={event.banner.alt ?? event.title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 overlay-hero" aria-hidden />
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg-base to-transparent" aria-hidden />
          </div>
        </section>
      )}

      {/* Contenido */}
      <section className="bg-bg-base">
        <Container section className="grid md:grid-cols-[1fr_320px] gap-10 lg:gap-16 items-start">

          {/* Descripción */}
          <AnimateIn variant="fadeRight" className="flex flex-col gap-6">
            {event.ministry && (
              <Badge variant="gold" className="self-start">{event.ministry.name}</Badge>
            )}
            {isPast && (
              <Badge variant="outline" className="self-start text-text-muted">Evento pasado</Badge>
            )}

            <h1 className="text-h1 text-text-primary leading-tight">{event.title}</h1>

            {description && (
              <p className="font-body text-[1rem] text-text-secondary leading-relaxed">
                {description}
              </p>
            )}

            {event.registrationUrl && !isPast && (
              <Button variant="primary" size="lg" asChild className="self-start">
                <Link href={event.registrationUrl}>
                  Registrarme <span aria-hidden className="ml-1">→</span>
                </Link>
              </Button>
            )}
          </AnimateIn>

          {/* Sidebar — detalles */}
          <AnimateIn variant="fadeLeft" delay={0.1}>
            <div className="sticky top-24 flex flex-col gap-4 p-6 bg-bg-surface border border-border rounded-2xl">
              <p className="text-label text-gold text-[0.6875rem]">Detalles del evento</p>

              {[
                {
                  icon: Calendar,
                  label: "Fecha",
                  value: event.endDate
                    ? `${formatDate(event.date)} — ${formatDate(event.endDate)}`
                    : formatDate(event.date),
                },
                ...(event.time ? [{ icon: Clock, label: "Hora", value: event.time }] : []),
                ...(event.location ? [{ icon: MapPin, label: "Lugar", value: event.location }] : []),
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-3 items-start">
                  <Icon size={15} strokeWidth={1.5} className="text-gold shrink-0 mt-0.5" aria-hidden />
                  <div>
                    <p className="text-label text-text-muted text-[0.625rem] mb-0.5">{label}</p>
                    <p className="font-body text-[0.9375rem] text-text-primary leading-snug">{value}</p>
                  </div>
                </div>
              ))}

              {event.address && (
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(event.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-label text-gold hover:text-gold-muted transition-colors text-[0.8125rem] mt-1"
                >
                  Ver en Google Maps <ExternalLink size={11} aria-hidden />
                </a>
              )}

              {event.ministry && (
                <div className="border-t border-border pt-4 mt-1">
                  <p className="text-label text-text-muted text-[0.625rem] mb-2">Organiza</p>
                  <Link
                    href={`/ministerios/${event.ministry.slug}`}
                    className="font-display font-700 text-text-secondary hover:text-gold transition-colors text-[0.875rem]"
                  >
                    {event.ministry.name} →
                  </Link>
                </div>
              )}
            </div>
          </AnimateIn>

        </Container>
      </section>

      {/* Nav */}
      <section className="bg-bg-base border-t border-border">
        <Container className="py-8">
          <Link href="/eventos" className="flex items-center gap-2 text-label text-text-muted hover:text-gold transition-colors">
            <span aria-hidden>←</span> Todos los eventos
          </Link>
        </Container>
      </section>
    </>
  );
}

function to24h(time: string): string {
  const [hourMin, period] = time.split(" ");
  const [h, m] = hourMin.split(":").map(Number);
  const hours = period === "PM" && h !== 12 ? h + 12 : h;
  return `${String(hours).padStart(2, "0")}:${String(m ?? 0).padStart(2, "0")}:00`;
}

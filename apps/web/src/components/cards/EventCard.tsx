import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock } from "lucide-react";
import { cn, formatDateShort, isUpcoming } from "@rdv/utils";
import { Badge } from "@/components/ui/badge";

export interface EventCardProps {
  title: string;
  slug: string;
  date: string;
  endDate?: string;
  time?: string;
  location?: string;
  banner: { url: string; alt: string };
  ministry?: { name: string; slug: string };
  /** "default" (vertical) | "horizontal" (lista) */
  layout?: "default" | "horizontal";
  className?: string;
  priority?: boolean;
}

export function EventCard({
  title,
  slug,
  date,
  time,
  location,
  banner,
  ministry,
  layout = "default",
  className,
  priority = false,
}: EventCardProps) {
  const upcoming = isUpcoming(date);
  const dateLabel = formatDateShort(date);
  const [day, month] = dateLabel.split(" ");

  if (layout === "horizontal") {
    return (
      <EventCardHorizontal
        title={title} slug={slug} date={date} time={time}
        location={location} banner={banner} ministry={ministry}
        day={day} month={month} upcoming={upcoming} className={className}
      />
    );
  }

  return (
    <Link
      href={`/eventos/${slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl bg-bg-surface",
        "focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2",
        className
      )}
      aria-label={`Evento: ${title}`}
    >
      {/* Banner */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={banner.url}
          alt={banner.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
          priority={priority}
        />
        <div className="absolute inset-0 overlay-card opacity-60 group-hover:opacity-80 transition-opacity duration-300" aria-hidden />

        {/* Badge de fecha — superpuesto arriba izquierda */}
        <div
          className="absolute top-3 left-3 flex flex-col items-center justify-center w-12 h-12 bg-gold rounded-2xl"
          aria-hidden
        >
          <span className="font-display font-900 text-bg-base text-[1.25rem] leading-none">
            {day}
          </span>
          <span className="font-label text-bg-base text-[0.5625rem] leading-none mt-0.5">
            {month}
          </span>
        </div>

        {/* Badge ministerio */}
        {ministry && (
          <div className="absolute top-3 right-3">
            <Badge variant="surface">{ministry.name}</Badge>
          </div>
        )}

        {/* Dot "próximo" */}
        {upcoming && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-dot" aria-hidden />
            <span className="text-label text-gold text-[0.625rem]">Próximo</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 p-4">
        <h3 className="font-display font-700 text-[1.0625rem] text-text-primary group-hover:text-gold transition-colors duration-200 leading-snug line-clamp-2">
          {title}
        </h3>

        <div className="flex flex-col gap-1.5">
          {time && (
            <div className="flex items-center gap-2">
              <Clock size={13} strokeWidth={1.5} className="text-text-muted shrink-0" aria-hidden />
              <span className="font-body text-[0.8125rem] text-text-secondary">{time}</span>
            </div>
          )}
          {location && (
            <div className="flex items-center gap-2">
              <MapPin size={13} strokeWidth={1.5} className="text-text-muted shrink-0" aria-hidden />
              <span className="font-body text-[0.8125rem] text-text-secondary line-clamp-1">{location}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-label text-text-muted group-hover:text-gold transition-colors duration-200">
            Ver detalles
          </span>
          <span className="text-text-muted group-hover:text-gold group-hover:translate-x-1 transition-all duration-200" aria-hidden>
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Variante horizontal ──────────────────────────────────────────────────────

interface HorizontalProps {
  title: string; slug: string; date: string; time?: string;
  location?: string; banner: { url: string; alt: string };
  ministry?: { name: string; slug: string };
  day: string; month: string; upcoming: boolean; className?: string;
}

function EventCardHorizontal({ title, slug, banner, time, location, ministry, day, month, upcoming, className }: HorizontalProps) {
  return (
    <Link
      href={`/eventos/${slug}`}
      className={cn(
        "group flex gap-4 items-start p-4 bg-bg-surface border border-border",
        "hover:border-border-gold rounded-2xl",
        "transition-colors duration-200",
        "focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2",
        className
      )}
    >
      {/* Fecha grande al lado */}
      <div className="flex flex-col items-center justify-center w-14 h-14 bg-gold shrink-0 rounded-2xl">
        <span className="font-display font-900 text-bg-base text-[1.375rem] leading-none">{day}</span>
        <span className="font-label text-bg-base text-[0.5625rem] leading-none mt-0.5">{month}</span>
      </div>

      {/* Miniatura */}
      <div className="relative w-20 shrink-0 aspect-video overflow-hidden rounded-2xl hidden sm:block">
        <Image src={banner.url} alt="" fill sizes="80px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.08]"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          {ministry && <Badge variant="gold" className="text-[0.6rem]">{ministry.name}</Badge>}
          {upcoming && <span className="text-label text-[0.6rem] text-text-muted">Próximo</span>}
        </div>
        <h4 className="font-display font-700 text-[0.9375rem] text-text-primary group-hover:text-gold transition-colors duration-200 line-clamp-1 leading-snug">
          {title}
        </h4>
        <div className="flex items-center gap-3">
          {time && (
            <span className="flex items-center gap-1.5 font-body text-[0.75rem] text-text-secondary">
              <Clock size={11} strokeWidth={1.5} aria-hidden /> {time}
            </span>
          )}
          {location && (
            <span className="flex items-center gap-1.5 font-body text-[0.75rem] text-text-secondary truncate">
              <MapPin size={11} strokeWidth={1.5} aria-hidden /> {location}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

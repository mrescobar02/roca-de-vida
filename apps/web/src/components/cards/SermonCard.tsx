import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";
import { cn, getYoutubeThumbnail, formatDate, truncate } from "@rdv/utils";
import { Badge } from "@/components/ui/badge";

export interface SermonCardProps {
  title: string;
  slug: string;
  youtubeUrl: string;
  pastor: {
    name: string;
  };
  date: string;
  series?: string;
  scripture?: string;
  duration?: string;
  /** Thumbnail personalizado — si no hay, se usa YouTube */
  thumbnail?: { url: string; alt: string };
  /** "default" (apilado) | "horizontal" (para featured) */
  layout?: "default" | "horizontal" | "featured";
  className?: string;
  priority?: boolean;
}

export function SermonCard({
  title,
  slug,
  youtubeUrl,
  pastor,
  date,
  series,
  scripture,
  duration,
  thumbnail,
  layout = "default",
  className,
  priority = false,
}: SermonCardProps) {
  // Thumbnail: custom > YouTube maxres > YouTube hq
  const thumbSrc =
    thumbnail?.url ??
    getYoutubeThumbnail(youtubeUrl, "maxresdefault") ??
    getYoutubeThumbnail(youtubeUrl, "hqdefault") ??
    "/images/sermon-placeholder.jpg";

  const thumbAlt = thumbnail?.alt ?? `Prédica: ${title}`;

  if (layout === "featured") {
    return <SermonCardFeatured
      title={title}
      slug={slug}
      thumbSrc={thumbSrc}
      thumbAlt={thumbAlt}
      pastor={pastor}
      date={date}
      series={series}
      scripture={scripture}
      duration={duration}
      priority={priority}
      className={className}
    />;
  }

  if (layout === "horizontal") {
    return <SermonCardHorizontal
      title={title}
      slug={slug}
      thumbSrc={thumbSrc}
      thumbAlt={thumbAlt}
      pastor={pastor}
      date={date}
      series={series}
      duration={duration}
      className={className}
    />;
  }

  // Default — card vertical apilada
  return (
    <Link
      href={`/media/sermones/${slug}`}
      className={cn(
        "group flex flex-col gap-3",
        "focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2 rounded-2xl",
        className
      )}
      aria-label={`Ver prédica: ${title}`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-bg-raised">
        <Image
          src={thumbSrc}
          alt={thumbAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
          priority={priority}
        />

        {/* Overlay en hover */}
        <div
          className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300"
          aria-hidden
        />

        {/* Play button */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            "opacity-0 group-hover:opacity-100 transition-all duration-300"
          )}
          aria-hidden
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gold/90 shadow-lg">
            <Play size={18} fill="#000" className="ml-0.5 text-bg-base" />
          </div>
        </div>

        {/* Duration badge — esquina inferior derecha */}
        {duration && (
          <span className="absolute bottom-2 right-2 text-label text-[0.625rem] bg-black/80 text-text-secondary px-1.5 py-0.5 rounded-sm">
            {duration}
          </span>
        )}
      </div>

      {/* Metadata */}
      <div className="flex flex-col gap-1.5">
        {series && (
          <Badge variant="gold" className="self-start">{series}</Badge>
        )}

        <h3 className={cn(
          "font-display font-700 text-text-primary leading-snug",
          "text-[1.0625rem] group-hover:text-gold transition-colors duration-200",
          "line-clamp-2"
        )}>
          {title}
        </h3>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-body text-[0.8125rem] text-text-secondary">
            {pastor.name}
          </span>
          <span className="text-text-muted" aria-hidden>·</span>
          <time
            dateTime={date}
            className="font-body text-[0.8125rem] text-text-muted"
          >
            {formatDate(date)}
          </time>
          {scripture && (
            <>
              <span className="text-text-muted" aria-hidden>·</span>
              <span className="text-label text-text-muted">{scripture}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

// ─── Variante: Featured (grande, horizontal en desktop) ───────────────────────

interface FeaturedProps {
  title: string; slug: string; thumbSrc: string; thumbAlt: string;
  pastor: { name: string }; date: string; series?: string;
  scripture?: string; duration?: string; priority?: boolean; className?: string;
}

function SermonCardFeatured({ title, slug, thumbSrc, thumbAlt, pastor, date, series, scripture, duration, priority, className }: FeaturedProps) {
  return (
    <Link
      href={`/media/sermones/${slug}`}
      className={cn(
        "group grid md:grid-cols-[1.4fr_1fr] gap-6 lg:gap-10",
        "focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2 rounded-2xl",
        className
      )}
      aria-label={`Ver prédica destacada: ${title}`}
    >
      {/* Thumbnail grande */}
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-bg-raised">
        <Image
          src={thumbSrc} alt={thumbAlt} fill
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          priority={priority}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" aria-hidden />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden>
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gold/90 shadow-xl">
            <Play size={24} fill="#000" className="ml-1 text-bg-base" />
          </div>
        </div>
        {duration && (
          <span className="absolute bottom-3 right-3 text-label text-[0.625rem] bg-black/80 text-text-secondary px-2 py-1 rounded-sm">
            {duration}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col justify-center gap-4">
        {series && <Badge variant="gold" className="self-start">{series}</Badge>}
        <h3 className="text-h2 text-text-primary group-hover:text-gold transition-colors duration-200 line-clamp-3">
          {title}
        </h3>
        <div className="flex flex-col gap-1">
          <span className="font-body text-[0.9375rem] text-text-secondary">{pastor.name}</span>
          <div className="flex items-center gap-2">
            <time dateTime={date} className="font-body text-[0.875rem] text-text-muted">{formatDate(date)}</time>
            {scripture && <>
              <span className="text-text-muted" aria-hidden>·</span>
              <span className="text-label text-text-muted">{scripture}</span>
            </>}
          </div>
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          <span className="text-label text-gold">Ver prédica</span>
          <span className="text-gold group-hover:translate-x-1 transition-transform duration-200" aria-hidden>→</span>
        </div>
      </div>
    </Link>
  );
}

// ─── Variante: Horizontal (listas compactas) ──────────────────────────────────

interface HorizontalProps {
  title: string; slug: string; thumbSrc: string; thumbAlt: string;
  pastor: { name: string }; date: string; series?: string;
  duration?: string; className?: string;
}

function SermonCardHorizontal({ title, slug, thumbSrc, thumbAlt, pastor, date, series, duration, className }: HorizontalProps) {
  return (
    <Link
      href={`/media/sermones/${slug}`}
      className={cn(
        "group flex gap-4 items-start",
        "focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2 rounded-2xl",
        className
      )}
    >
      <div className="relative w-28 sm:w-36 shrink-0 aspect-video overflow-hidden rounded-2xl bg-bg-raised">
        <Image src={thumbSrc} alt={thumbAlt} fill
          sizes="144px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200" aria-hidden>
          <Play size={14} fill="#fff" className="text-white" />
        </div>
      </div>
      <div className="flex flex-col gap-1 min-w-0">
        {series && <span className="text-label text-gold text-[0.6875rem]">{series}</span>}
        <h4 className="font-display font-700 text-[0.9375rem] text-text-primary group-hover:text-gold transition-colors duration-200 line-clamp-2 leading-snug">
          {truncate(title, 70)}
        </h4>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-body text-[0.75rem] text-text-secondary">{pastor.name}</span>
          <span className="text-text-muted text-[0.75rem]" aria-hidden>·</span>
          <time dateTime={date} className="font-body text-[0.75rem] text-text-muted">{formatDate(date)}</time>
          {duration && <>
            <span className="text-text-muted text-[0.75rem]" aria-hidden>·</span>
            <span className="text-label text-text-muted text-[0.6875rem]">{duration}</span>
          </>}
        </div>
      </div>
    </Link>
  );
}

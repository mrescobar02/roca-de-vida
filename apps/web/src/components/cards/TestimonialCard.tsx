import Image from "next/image";
import { cn } from "@rdv/utils";

export interface TestimonialCardProps {
  quote: string;
  name: string;
  ministry?: string;
  photo?: { url: string; alt: string };
  /** "default" (card con fondo) | "minimal" (sin fondo, solo quote) */
  layout?: "default" | "minimal";
  className?: string;
}

export function TestimonialCard({
  quote,
  name,
  ministry,
  photo,
  layout = "default",
  className,
}: TestimonialCardProps) {
  if (layout === "minimal") {
    return (
      <figure className={cn("flex flex-col gap-4", className)}>
        <blockquote className="font-body text-[1rem] text-text-secondary leading-relaxed italic">
          <span className="font-display font-900 text-gold text-[2rem] leading-none mr-1 align-bottom" aria-hidden>
            "
          </span>
          {quote}
          <span className="font-display font-900 text-gold text-[2rem] leading-none ml-1 align-bottom" aria-hidden>
            "
          </span>
        </blockquote>
        <figcaption className="flex items-center gap-3">
          {photo && (
            <div className="relative w-9 h-9 rounded-full overflow-hidden bg-bg-raised shrink-0">
              <Image src={photo.url} alt={photo.alt} fill sizes="36px" className="object-cover object-top" />
            </div>
          )}
          <div>
            <p className="font-display font-700 text-text-primary text-[0.875rem] leading-tight">{name}</p>
            {ministry && (
              <p className="text-label text-text-muted text-[0.6875rem]">{ministry}</p>
            )}
          </div>
        </figcaption>
      </figure>
    );
  }

  return (
    <figure
      className={cn(
        "flex flex-col gap-5 p-6 bg-bg-surface border border-border rounded-2xl",
        "hover:border-border-gold transition-colors duration-300",
        className
      )}
    >
      {/* Comilla decorativa */}
      <span
        className="font-display font-900 text-gold/20 text-[4rem] leading-none select-none"
        aria-hidden
      >
        "
      </span>

      <blockquote className="font-body text-[0.9375rem] text-text-secondary leading-relaxed -mt-6">
        {quote}
      </blockquote>

      {/* Divider dorado */}
      <div className="w-8 h-[1px] bg-gold/30" aria-hidden />

      <figcaption className="flex items-center gap-3">
        {photo ? (
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-bg-raised shrink-0 ring-1 ring-border">
            <Image src={photo.url} alt={photo.alt} fill sizes="40px" className="object-cover object-top" />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-bg-raised shrink-0 flex items-center justify-center ring-1 ring-border">
            <span className="font-display font-700 text-gold text-[0.875rem] uppercase">
              {name.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <p className="font-display font-700 text-text-primary text-[0.9375rem] leading-tight">{name}</p>
          {ministry && (
            <p className="text-label text-text-muted text-[0.6875rem]">{ministry}</p>
          )}
        </div>
      </figcaption>
    </figure>
  );
}

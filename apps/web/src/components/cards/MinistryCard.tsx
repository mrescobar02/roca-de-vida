import Link from "next/link";
import Image from "next/image";
import { cn } from "@rdv/utils";

// Acentos por slug de ministerio — de DESIGN.md
const MINISTRY_ACCENTS: Record<string, string> = {
  hombres:          "#1e3a5f",
  mujeres:          "#c8956c",
  "roca-kids":      "#ffb347",
  prejuvenil:       "#2d6a4f",
  jovenes:          "#4a1942",
  "jovenes-teens":  "#4a1942",
  "jovenes-adultos":"#1b4d5a",
  bendecidos:       "#3d4f2e",
  metanoia:         "#1a2744",
};

export interface MinistryCardProps {
  name: string;
  slug: string;
  tagline?: string;
  category?: string;
  heroImage: {
    url: string;
    alt: string;
  };
  /** "portrait" (default 3/4) | "square" */
  aspect?: "portrait" | "square";
  className?: string;
  /** Prioridad de carga — true para los primeros cards visibles */
  priority?: boolean;
}

export function MinistryCard({
  name,
  slug,
  tagline,
  category,
  heroImage,
  aspect = "portrait",
  className,
  priority = false,
}: MinistryCardProps) {
  const accent = MINISTRY_ACCENTS[slug] ?? "#c6a867";

  return (
    <Link
      href={`/ministerios/${slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-2xl bg-bg-surface",
        "focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2",
        className
      )}
      aria-label={`Ministerio ${name}`}
    >
      {/* Imagen de fondo */}
      <div
        className={cn(
          "relative overflow-hidden",
          aspect === "portrait" ? "aspect-[3/4]" : "aspect-square"
        )}
      >
        <Image
          src={heroImage.url}
          alt={heroImage.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          priority={priority}
        />

        {/* Overlay base */}
        <div
          className="absolute inset-0 overlay-card transition-opacity duration-300 group-hover:opacity-90"
          aria-hidden
        />

        {/* Borde inferior dorado — aparece en hover */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ backgroundColor: accent }}
          aria-hidden
        />

        {/* Contenido superpuesto */}
        <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col gap-1.5">
          {/* Categoría / label */}
          {category && (
            <span
              className="text-label"
              style={{ color: accent }}
            >
              {category}
            </span>
          )}

          {/* Nombre */}
          <h3
            className={cn(
              "font-display font-700 text-text-primary leading-tight",
              "text-[1.25rem] sm:text-[1.4rem]",
              "transition-transform duration-300 group-hover:-translate-y-0.5"
            )}
          >
            {name}
          </h3>

          {/* Tagline — aparece suavemente en hover */}
          {tagline && (
            <p
              className={cn(
                "font-body text-[0.8125rem] text-text-secondary leading-snug",
                "max-h-0 overflow-hidden opacity-0",
                "transition-all duration-300 group-hover:max-h-10 group-hover:opacity-100"
              )}
            >
              {tagline}
            </p>
          )}

          {/* CTA arrow */}
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-label text-text-muted group-hover:text-gold transition-colors duration-200">
              Conocer más
            </span>
            <span
              className="text-text-muted group-hover:text-gold group-hover:translate-x-1 transition-all duration-200"
              aria-hidden
            >
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

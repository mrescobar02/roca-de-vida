import Image from "next/image";
import { cn } from "@rdv/utils";

export interface StaffCardProps {
  name: string;
  title: string;
  role?: string;
  photo?: { url: string; alt: string };
  ministry?: { name: string };
  bio?: string;
  /** "default" (con bio opcional) | "compact" (solo foto + nombre) */
  layout?: "default" | "compact";
  className?: string;
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

export function StaffCard({
  name,
  title,
  role,
  photo,
  ministry,
  bio,
  layout = "default",
  className,
}: StaffCardProps) {
  if (layout === "compact") {
    return (
      <div className={cn("flex flex-col items-center text-center gap-3", className)}>
        <div className="relative w-20 h-20 rounded-full overflow-hidden bg-bg-raised ring-2 ring-border shrink-0">
          {photo ? (
            <Image
              src={photo.url}
              alt={photo.alt}
              fill
              sizes="80px"
              className="object-cover object-top"
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center font-display font-700 text-gold text-[1rem]">
              {initials(name)}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="font-display font-700 text-text-primary text-[0.9375rem] leading-tight">{name}</p>
          <p className="text-label text-text-muted text-[0.625rem]">{title}</p>
        </div>
      </div>
    );
  }

  return (
    <article className={cn("group flex flex-col gap-4", className)}>
      {/* Foto / avatar */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-bg-raised">
        {photo ? (
          <Image
            src={photo.url}
            alt={photo.alt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display font-700 text-gold/40 text-[3.5rem] select-none">
              {initials(name)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-base/60 via-transparent to-transparent" aria-hidden />
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1">
        {ministry && (
          <span className="text-label text-gold text-[0.6875rem]">{ministry.name}</span>
        )}
        <h3 className="font-display font-700 text-text-primary text-[1.0625rem] leading-tight">{name}</h3>
        <p className="text-label text-text-muted">{title}</p>
        {bio && (
          <p className="font-body text-[0.875rem] text-text-secondary leading-relaxed mt-2 line-clamp-3">{bio}</p>
        )}
      </div>
    </article>
  );
}
